<template>
  <div class="unosi-wrapper d-flex align-items-center justify-content-center">
    <div class="mobile-screen p-4 d-flex flex-column text-center position-relative">
      <button type="button" class="btn-back shadow-sm" title="Povratak" @click="$router.push('/dashboard')">
        &#8592;
      </button>

      <div class="top-section pt-3 mb-3">
        <h3 class="fw-bold text-dark m-0 text-uppercase">{{ naslovModula }}</h3>
        <span :class="['badge', isAdmin ? 'bg-danger' : 'bg-dark', 'mt-1']">
          {{ isAdmin ? 'Admin: Sva povijest' : 'Korisnik: Samo danas' }}
        </span>
      </div>

      <div v-if="trenutniModul !== 'pregled'" class="content-card p-3 mb-3 text-start shadow-sm">
        <h6 class="fw-bold text-dark mb-3 border-bottom pb-1">
          Novi unos ({{ danasnjiDatum }})
        </h6>

        <form @submit.prevent="spremiUnos">
          <label for="unosTekst" class="form-label small fw-bold text-muted">
            Opis aktivnosti / zabilješke
          </label>
          <textarea
            id="unosTekst"
            v-model="noviTekst"
            class="form-control text-area-custom mb-3"
            rows="3"
            maxlength="2000"
            placeholder="Unesite detalje ovdje..."
            required
          ></textarea>

          <div v-if="poruka" class="alert py-2 small mb-3" :class="porukaTip" role="status">
            {{ poruka }}
          </div>

          <button type="submit" class="btn btn-custom-green btn-sm w-100 fw-bold text-white py-2" :disabled="spremanje">
            {{ spremanje ? 'SPREMANJE...' : 'SPREMI UNOS' }}
          </button>
        </form>
      </div>

      <div class="content-card p-3 d-flex flex-column flex-grow-1 shadow-sm overflow-hidden text-start">
        <h6 class="fw-bold text-dark mb-2 border-bottom pb-1">Pregled dnevnih unosa</h6>

        <div class="list-container overflow-auto flex-grow-1 pr-1">
          <div v-if="ucitavanje" class="text-center text-muted small py-4">
            Učitavanje unosa...
          </div>

          <div v-else-if="greska" class="alert alert-danger small" role="alert">
            {{ greska }}
          </div>

          <div v-else-if="unosi.length === 0" class="text-center text-muted small py-4">
            Nema zabilježenih unosa za odabrani opseg.
          </div>

          <div v-for="unos in unosi" v-else :key="unos.id" class="unos-item border-bottom py-2">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-light text-dark small-time">{{ unos.vrijeme }}</span>
              <span class="text-muted text-date-small">{{ unos.datum }}</span>
            </div>
            <p class="m-0 text-dark small-text-content">{{ unos.tekst }}</p>
            <small class="text-muted d-block text-author">Unio: {{ unos.autor }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase'
import {
  equalTo,
  off,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set
} from 'firebase/database'

const ADMIN_EMAIL = 'mblazeka@student.unipu.hr'

export default {
  name: 'UnosiView',

  data() {
    return {
      noviTekst: '',
      unosi: [],
      ucitavanje: false,
      spremanje: false,
      greska: '',
      poruka: '',
      listenerRef: null,
      listenerCallback: null
    }
  },

  computed: {
    trenutniModul() {
      return this.$route.query.modul || 'dnevnik'
    },

    naslovModula() {
      const nazivi = {
        dnevnik: 'Dnevnik rada',
        obilazak: 'Evidencija obilaska',
        neispravnosti: 'Prijava neispravnosti',
        pregled: 'Pregled svih unosa'
      }

      return nazivi[this.trenutniModul] || 'Pregled modula'
    },

    danasnjiDatum() {
      return new Date().toLocaleDateString('hr-HR')
    },

    isAdmin() {
      return auth.currentUser && auth.currentUser.email === ADMIN_EMAIL
    },

    porukaTip() {
      return this.poruka.startsWith('Unos') ? 'alert-success' : 'alert-danger'
    }
  },

  created() {
    this.ucitajUnose()
  },

  beforeDestroy() {
    this.ukloniListener()
  },

  watch: {
    '$route.query.modul'() {
      this.ukloniListener()
      this.ucitajUnose()
    }
  },

  methods: {
    ukloniListener() {
      if (this.listenerRef && this.listenerCallback) {
        off(this.listenerRef, 'value', this.listenerCallback)
      }

      this.listenerRef = null
      this.listenerCallback = null
    },

    ucitajUnose() {
      this.ukloniListener()
      this.ucitavanje = true
      this.greska = ''

      const unosiRef = ref(db, 'unosi')
      const unosiUpit = this.trenutniModul === 'pregled'
        ? unosiRef
        : query(unosiRef, orderByChild('modul'), equalTo(this.trenutniModul))

      this.listenerRef = unosiUpit
      this.listenerCallback = snapshot => {
        const podaci = snapshot.val() || {}
        const sviUnosi = Object.entries(podaci).map(([id, unos]) => ({ id, ...unos }))

        this.unosi = sviUnosi
          .filter(unos => this.isAdmin || unos.datum === this.danasnjiDatum)
          .sort((prvi, drugi) => (drugi.timestamp || 0) - (prvi.timestamp || 0))
        this.ucitavanje = false
      }

      onValue(unosiUpit, this.listenerCallback, error => {
        this.greska = 'Unosi se trenutno ne mogu učitati iz Realtime Database.'
        this.ucitavanje = false
        console.error(error)
      })
    },

    async spremiUnos() {
      const tekst = this.noviTekst.trim()
      const korisnik = auth.currentUser

      if (!tekst || !korisnik) {
        this.poruka = 'Za spremanje unosa morate biti prijavljeni.'
        return
      }

      this.spremanje = true
      this.poruka = ''

      try {
        const novaReferenca = push(ref(db, 'unosi'))
        await set(novaReferenca, {
          modul: this.trenutniModul,
          tekst,
          datum: this.danasnjiDatum,
          vrijeme: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
          autor: korisnik.email,
          timestamp: Date.now()
        })

        this.noviTekst = ''
        this.poruka = 'Unos je uspješno spremljen.'
      } catch (error) {
        this.poruka = 'Unos nije moguće spremiti. Provjerite Firebase Rules.'
        console.error(error)
      } finally {
        this.spremanje = false
      }
    }
  }
}
</script>

<style scoped>
.unosi-wrapper { min-height: 100vh; width: 100%; padding: 20px; }
.mobile-screen { width: 100%; max-width: 380px; height: 760px; background: #3ca62d; border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.5); color: #111111; overflow: hidden; }
.btn-back { position: absolute; top: 25px; left: 20px; width: 32px; height: 32px; background: #111111; color: #ffffff; border: 0; border-radius: 8px; z-index: 10; }
.content-card { background: #ffffff; border-radius: 16px; background-image: radial-gradient(#e9ecef 1px, transparent 0); background-size: 16px 16px; }
.text-area-custom { border-radius: 8px; font-size: 0.9rem; }
.text-area-custom:focus { border-color: #3ca62d; box-shadow: 0 0 0 0.2rem rgba(60,166,45,.2); }
.btn-custom-green { background: #3ca62d !important; border-radius: 8px; }
.list-container::-webkit-scrollbar { width: 4px; }
.list-container::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 4px; }
.unos-item { font-size: 0.85rem; }
.small-time, .text-date-small { font-size: 0.75rem; }
.small-text-content { line-height: 1.4; }
.text-author { font-size: 0.7rem; font-style: italic; margin-top: 2px; }
</style>