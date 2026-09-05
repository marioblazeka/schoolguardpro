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
          <button type="submit" class="btn btn-custom-green w-100 py-2 fw-bold text-white shadow-sm mb-3">Login</button>
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
export default {
  name: 'LoginView',
  data() {
    return { email: '', password: '', errorMessage: '' }
  },
  methods: {
    handleLogin() {
      this.errorMessage = 'Firebase prijava bit će dodana u sljedećem koraku.'
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