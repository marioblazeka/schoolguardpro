<template>
  <div class="container d-flex align-items-center justify-content-center legal-page">
    <div class="card shadow-lg border-0 p-4 legal-card text-start">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom"><h3 class="fw-bold m-0 text-dark">Uvjeti korištenja</h3><router-link to="/" class="close-link" title="Zatvori">&times;</router-link></div>
        <div class="legal-content text-muted small">
          <p class="fw-bold text-dark">1. Prihvaćanje uvjeta</p><p>Korištenjem aplikacije School Guard Pro pristajete na ove uvjete. Ako se ne slažete s bilo kojim dijelom, nemojte koristiti sustav.</p>
          <p class="fw-bold text-dark">2. Prava pristupa</p><p>Sustav je namijenjen ovlaštenim administratorima i osoblju za evidenciju dnevnih aktivnosti.</p>
          <p class="fw-bold text-dark">3. Odgovornost korisnika</p><p>Korisnik je odgovoran za čuvanje povjerljivosti svojih pristupnih podataka i aktivnosti pod svojim računom.</p>
        </div>
        <div class="text-center pt-3 mt-4 border-top"><router-link to="/" class="btn btn-custom-green text-white fw-bold px-4">Zatvori i povratak</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>export default { name: 'UvjetiKoristenjaView' }</script>

<style scoped>
.legal-page { min-height: 100vh; padding: 20px; }
.legal-card { width: 100%; max-width: 500px; border-radius: 20px !important; background-color: #ffffff; }
.legal-content { max-height: 350px; overflow-y: auto; padding-right: 5px; }
.close-link { font-size: 1.8rem; color: #6c757d; text-decoration: none; line-height: 1; }
.btn-custom-green { background-color: #3ca62d !important; border-color: #3ca62d !important; border-radius: 8px; }
</style>