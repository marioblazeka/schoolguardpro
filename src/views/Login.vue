<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        <div class="text-center mb-4">
          <div class="logo-wrapper mb-3 mx-auto">
            <img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid project-logo" />
          </div>
          <h2 class="fw-bold project-title mb-1">School Guard Pro</h2>
          <p class="text-muted small">Sustav kontrole i sigurnosti</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-floating mb-3">
            <input id="loginEmail" v-model.trim="email" type="email" class="form-control customs-input" placeholder="name@example.com" autocomplete="email" required />
            <label for="loginEmail">Email adresa</label>
          </div>
          <div class="form-floating mb-4">
            <input id="loginPassword" v-model="password" type="password" class="form-control customs-input" placeholder="Lozinka" autocomplete="current-password" required />
            <label for="loginPassword">Lozinka</label>
          </div>
          <div v-if="errorMessage" class="alert alert-danger py-2 small mb-3" role="alert">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-custom-green w-100 py-2 fw-bold text-white shadow-sm mb-3" :disabled="loading">
            {{ loading ? 'Prijava...' : 'Login' }}
          </button>
        </form>

        <div class="text-center pt-3 border-top">
          <router-link to="/signup" class="d-block small text-decoration-none mb-2 link-green fw-semibold">Create an Account / Registracija</router-link>
          <router-link to="/forgotpassword" class="d-block small text-decoration-none text-muted">Forgot Password?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const ADMIN_EMAIL = 'mblazeka@student.unipu.hr'

export default {
  name: 'LoginView',
  data() { return { email: '', password: '', errorMessage: '', loading: false } },
  methods: {
    async handleLogin() {
      this.errorMessage = ''
      this.loading = true

      try {
        const credential = await signInWithEmailAndPassword(auth, this.email, this.password)
        const isAdmin = credential.user.email === ADMIN_EMAIL

        sessionStorage.setItem('schoolguard_role', isAdmin ? 'admin' : 'user')
        await this.$router.push('/dashboard')
      } catch (error) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          this.errorMessage = 'Neispravna email adresa ili lozinka.'
        } else if (error.code === 'auth/too-many-requests') {
          this.errorMessage = 'Previše pokušaja. Pokušajte ponovno kasnije.'
        } else {
          this.errorMessage = 'Prijava trenutno nije moguća. Pokušajte ponovno.'
        }
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
.btn-custom-green:hover { background-color: #2d8021 !important; border-color: #2d8021 !important; }
.link-green { color: #3ca62d !important; }
.link-green:hover { color: #2d8021 !important; text-decoration: underline !important; }
</style>