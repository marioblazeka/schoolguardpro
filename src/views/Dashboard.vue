<template>
  <div class="dashboard-wrapper d-flex align-items-center justify-content-center">
    <div class="mobile-screen p-4 d-flex flex-column text-center">
      <button type="button" class="btn-back" title="Povratak" @click="$router.push('/')">&#8592;</button>
      <div class="top-section pt-3 mb-4"><div class="logo-container mb-2 mx-auto"><img src="@/assets/logo.png" alt="School Guard Pro Logo" class="img-fluid dashboard-logo" /></div><h2 class="brand-name fw-bold">School Guard Pro</h2></div>
      <div class="menu-section d-flex flex-column gap-3">
        <button v-for="item in menuItems" :key="item.modul" type="button" class="menu-card shadow-sm d-flex align-items-center p-3 text-start" @click="openModule(item.modul)"><span class="icon-box me-3">{{ item.icon }}</span><span class="fw-bold text-dark">{{ item.label }}</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() { return { menuItems: [{ modul: 'dnevnik', icon: '1', label: 'DNEVNIK RADA' }, { modul: 'obilazak', icon: '2', label: 'EVIDENCIJA OBILASKA' }, { modul: 'neispravnosti', icon: '3', label: 'PRIJAVA NEISPRAVNOSTI' }, { modul: 'pregled', icon: '4', label: 'PREGLED UNOSA' }] } },
  methods: { openModule(modul) { this.$router.push({ name: 'Unosi', query: { modul } }) } }
}
</script>

<style scoped>
.dashboard-wrapper { min-height: 100vh; width: 100%; padding: 20px; }
.mobile-screen { width: 100%; max-width: 380px; height: 760px; background-color: #3ca62d; border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.5); color: #111111; overflow: hidden; }
.btn-back { align-self: flex-start; width: 32px; height: 32px; background: #111111; color: #ffffff; border: 0; border-radius: 8px; }
.logo-container { max-width: 110px; }.dashboard-logo { max-height: 120px; object-fit: contain; }.brand-name { font-size: 1.45rem; }
.menu-card { background: #ffffff; border: 1px solid rgba(0,0,0,.05); border-radius: 12px; cursor: pointer; }.icon-box { width: 28px; font-weight: bold; }
</style>