<template>
  <div class="container d-flex align-items-center justify-content-center auth-page">
    <div class="card shadow-lg border-0 p-4 auth-card">
      <div class="card-body">
        <div class="text-center mb-4">
          <div class="logo-wrapper mb-3 mx-auto">
            <img
              src="@/assets/logo.png"
              alt="School Guard Pro Logo"
              class="img-fluid project-logo"
            />
          </div>

          <h3 class="fw-bold project-title mb-1">Registracija</h3>
          <p class="text-muted small">
            Stvorite novi School Guard Pro račun
          </p>
        </div>

        <form @submit.prevent="handleSignup">
          <div class="form-floating mb-3">
            <input
              id="signupEmail"
              v-model.trim="email"
              type="email"
              class="form-control customs-input"
              placeholder="name@example.com"
              autocomplete="email"
              required
            />
            <label for="signupEmail">Email adresa</label>
          </div>

          <div class="form-floating mb-3">
            <input
              id="signupPassword"
              v-model="password"
              type="password"
              class="form-control customs-input"
              placeholder="Lozinka"
              minlength="6"
              autocomplete="new-password"
              required
            />
            <label for="signupPassword">Lozinka, najmanje 6 znakova</label>
          </div>

          <div class="form-floating mb-4">
            <input
              id="signupConfirmPassword"
              v-model="confirmPassword"
              type="password"
              class="form-control customs-input"
              placeholder="Potvrda lozinke"
              minlength="6"
              autocomplete="new-password"
              required
            />
            <label for="signupConfirmPassword">Potvrdite lozinku</label>
          </div>

          <div
            v-if="errorMessage"
            class="alert alert-danger py-2 small mb-3"
            role="alert"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="btn btn-custom-green w-100 py-2 fw-bold text-white shadow-sm mb-3"
            :disabled="loading"
          >
            {{ loading ? 'Registracija...' : 'Registriraj se' }}
          </button>
        </form>

        <div class="text-center pt-3 border-top">
          <router-link
            to="/login"
            class="small text-decoration-none link-green fw-semibold"
          >
            Već imate račun? Prijavite se
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupView',

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false
    }
  },

  methods: {
    handleSignup() {
      this.errorMessage = ''

      if (this.password.length < 6) {
        this.errorMessage = 'Lozinka mora sadržavati najmanje 6 znakova.'
        return
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Lozinke se ne podudaraju.'
        return
      }

      this.errorMessage =
        'Firebase registracija bit će dodana u sljedećem koraku.'
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 65px);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  border-radius: 20px !important;
  background-color: #ffffff;
}

.logo-wrapper {
  max-width: 120px;
}

.project-logo {
  max-height: 140px;
  object-fit: contain;
}

.project-title {
  color: #111111;
  font-size: 1.6rem;
}

.customs-input:focus {
  border-color: #3ca62d !important;
  box-shadow: 0 0 0 0.25rem rgba(60, 166, 45, 0.25) !important;
}

.btn-custom-green {
  background-color: #3ca62d !important;
  border-color: #3ca62d !important;
  border-radius: 8px;
}

.btn-custom-green:hover {
  background-color: #2d8021 !important;
  border-color: #2d8021 !important;
}

.link-green {
  color: #3ca62d !important;
}

.link-green:hover {
  color: #2d8021 !important;
  text-decoration: underline !important;
}
</style>