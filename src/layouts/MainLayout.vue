<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-cyan-9">
      <q-toolbar>
    <q-btn dense flat round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu"/>
    <q-space></q-space>
    <q-btn flat round>
  <q-avatar>
          <img src="~assets/ff.png"/>
        </q-avatar>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="500"
      content-class="text-white bg-cyan-9"
    >
    <q-scroll-area class="fit">
        <q-list>
          <q-item class="justify-center text-center q-mb-md q-mt-md">
           <div>
              <q-avatar size="100px">
              <img src="~assets/ff.png">
              </q-avatar>

            <div class="text-weight-bold q-mt-md">{{ $q.localStorage.getItem('dataUser') .namaLengkap }}</div>
            <div class="text-black">Administrator</div>
           </div>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dashboardAdmin' }">
            <q-item-section avatar>
            <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
           <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dataDonor' }">
            <q-item-section avatar>
            <q-icon name="style"/>
            </q-item-section>
            <q-item-section>
            <q-item-label>Data Donor</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable active-class="active" :to="{ name: 'inputBarang' }" v-ripple exact>
            <q-item-section avatar>
            <q-icon name="input"/>
            </q-item-section>
            <q-item-section>
            <q-item-label>Input Donor</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable active-class="active" :to="{ name: 'dataUser' }" v-ripple exact>
            <q-item-section avatar>
            <q-icon name="supervisor_account"/>
            </q-item-section>
            <q-item-section>
            <q-item-label>Data User</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const linksData = [
]

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
<style scoped>
.active {
  color: #000000;
  background-color : #fff;
  padding-right: 10px;
}
</style>
