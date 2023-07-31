import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import PowerView from '../views/PowerView.vue'
import SettingsView from '../views/SettingsView.vue'
import SettingsNetworkView from '../views/SettingsNetworkView.vue'
import SettingsNetworkDiscoverView from '../views/SettingsNetworkDiscoverView.vue'
import SettingsMiningPoolView from '../views/SettingsMiningPoolView.vue'
import SettingsLanguageView from '../views/SettingsLanguageView.vue'
import SettingsElectricityRateView from '../views/SettingsElectricityRateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/power',
      name: 'Power',
      component: PowerView
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView
    },
    {
      path: '/settings/network',
      name: 'SettingsNetwork',
      component: SettingsNetworkView
    },
    {
      path: '/settings/network/discover',
      name: 'SettingsNetworkDiscover',
      component: SettingsNetworkDiscoverView
    },
    {
      path: '/settings/mining-pool',
      name: 'SettingsMiningPool',
      component: SettingsMiningPoolView
    },
    {
      path: '/settings/language',
      name: 'SettingsLanguage',
      component: SettingsLanguageView
    },
    {
      path: '/settings/electricity-rate',
      name: 'SettingsElectricityRate',
      component: SettingsElectricityRateView
    }
  ]
})

export default router
