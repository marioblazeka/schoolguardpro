<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        <div class="text-center mb-4">
          <div class="logo-wrapper mb-3 mx-auto"><img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid project-logo" /></div>
          <h3 class="fw-bold project-title mb-1">Zaboravljena lozinka</h3>
          <p class="text-muted small">Unesite email za primitak poveznice za ponovno postavljanje lozinke.</p>
        </div>
        <form @submit.prevent="handleReset">
          <div class="form-floating mb-4">
            <input id="resetEmail" v-model.trim="email" type="email" class="form-control customs-input" placeholder="name@example.com" autocomplete="email" required />
            <label for="resetEmail">Email adresa</label>
          </div>
          <div v-if="message" class="alert py-2 small mb-3" :class="messageType" role="status">{{ message }}</div>
          <button type="submit" class="btn btn-custom-green w-100 py-2 fw-bold text-white shadow-sm mb-3" :disabled="loading">
            {{ loading ? 'Slanje...' : 'Pošalji poveznicu' }}
          </button>
        </form>
        <div class="text-center pt-3 border-top"><router-link to="/login" class="small text-decoration-none link-green fw-semibold">Vratite se na prijavu</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

export default {
  name: 'ForgotPasswordView',
  data() { return { email: '', message: '', messageType: '', loading: false } },
  methods: {
    async handleReset() {
      this.message = ''
      this.loading = true

      try {
        await sendPasswordResetEmail(auth, this.email)
        this.message = 'Poveznica je poslana. Provjerite dolaznu poštu i neželjenu poštu.'
        this.messageType = 'alert-success'
      } catch (error) {
        this.message = error.code === 'auth/invalid-email'
          ? 'Unesite ispravnu email adresu.'
          : 'Nije moguće poslati poveznicu. Provjerite email adresu i Firebase postavke.'
        this.messageType = 'alert-danger'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-page { min-height: calc(100vh - 65px); padding: 20px; }
.auth-card { width: 100%; max-width: 420px; border-radius: 20px !important; background-color: #ffffff; }
.logo-wrapper { max-width: 120px; }
.project-logo { max-height: 140px; object-fit: contain; }
.project-title { color: #111111; font-size: 1.6rem; }
.customs-input:focus { border-color: #3ca62d !important; box-shadow: 0 0 0 0.25rem rgba(60, 166, 45, 0.25) !important; }
.btn-custom-green { background-color: #3ca62d !important; border-color: #3ca62d !important; border-radius: 8px; }
.link-green { color: #3ca62d !important; }
</style>