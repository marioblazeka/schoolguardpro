<template>
  <div class="unosi-wrapper d-flex align-items-center justify-content-center"><div class="mobile-screen p-4 d-flex flex-column text-center"><button type="button" class="btn-back" title="Povratak" @click="$router.push('/dashboard')">&#8592;</button><h3 class="fw-bold text-dark mt-4 mb-3 text-uppercase">{{ naslovModula }}</h3><div class="content-card p-3 text-start shadow-sm"><h6 class="fw-bold text-dark mb-3">Novi unos</h6><textarea v-model="tekst" class="form-control mb-3" rows="4" placeholder="Unesite detalje ovdje..."></textarea><button type="button" class="btn btn-custom-green w-100 fw-bold text-white" @click="spremi">ZAPREMI UNOS</button></div></div></div>
</template>

<script>
export default {
  name: 'UnosiView',
  data() { return { tekst: '' } },
  computed: { naslovModula() { const nazivi = { dnevnik: 'Dnevnik rada', obilazak: 'Evidencija obilaska', neispravnosti: 'Prijava neispravnosti', pregled: 'Pregled unosa' }; return nazivi[this.$route.query.modul] || 'Pregled modula' } },
  methods: { spremi() { if (this.tekst.trim()) this.tekst = '' } }
}
</script>

<style scoped>
.unosi-wrapper { min-height: 100vh; width: 100%; padding: 20px; }.mobile-screen { width: 100%; max-width: 380px; height: 760px; background: #3ca62d; border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.5); overflow: hidden; }.btn-back { align-self: flex-start; width: 32px; height: 32px; background: #111111; color: #ffffff; border: 0; border-radius: 8px; }.content-card { background: #ffffff; border-radius: 16px; }.btn-custom-green { background: #3ca62d !important; border-radius: 8px; }
</style>