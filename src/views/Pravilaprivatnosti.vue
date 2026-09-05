<template>
  <div class="container d-flex align-items-center justify-content-center legal-page">
    <div class="card shadow-lg border-0 p-4 legal-card text-start">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom"><h3 class="fw-bold m-0 text-dark">Pravila privatnosti</h3><router-link to="/" class="close-link" title="Zatvori">&times;</router-link></div>
        <div class="legal-content text-muted small">
          <p class="fw-bold text-dark">1. Prikupljanje podataka</p><p>School Guard Pro prikuplja osnovne identifikacijske podatke potrebne za sigurnu autentifikaciju.</p>
          <p class="fw-bold text-dark">2. Sigurnost podataka</p><p>Podaci se obrađuju prema sigurnosnim standardima i štite od neovlaštenog pristupa.</p>
          <p class="fw-bold text-dark">3. Kolačići i lokalna pohrana</p><p>Aplikacija koristi nužne tehničke sesije za stabilan rad i održavanje prijave.</p>
        </div>
        <div class="text-center pt-3 mt-4 border-top"><router-link to="/" class="btn btn-custom-green text-white fw-bold px-4">Zatvori i povratak</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>export default { name: 'PravilaPrivatnostiView' }</script>

<style scoped>
.legal-page { min-height: 100vh; padding: 20px; }
.legal-card { width: 100%; max-width: 500px; border-radius: 20px !important; background-color: #ffffff; }
.legal-content { max-height: 350px; overflow-y: auto; padding-right: 5px; }
.close-link { font-size: 1.8rem; color: #6c757d; text-decoration: none; line-height: 1; }
.btn-custom-green { background-color: #3ca62d !important; border-color: #3ca62d !important; border-radius: 8px; }
</style>