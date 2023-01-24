import Vue from 'vue'
import VueRouter from 'vue-router'
import InventoryList from '../views/InventoryList.vue'
import InventoryDetail from '../views/InventoryDetail.vue'
import ItemDetail from '../views/ItemDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: InventoryList
  },
  {
    path: '/inventories/:id',
    name: 'Inventaire',
    component: InventoryDetail
  },
  {
    path: '/inventories/:idInventory/items/:id',
    name: 'ItemDetail',
    component: ItemDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router