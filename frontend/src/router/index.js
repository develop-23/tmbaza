import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

// Public Views
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdsList from '../views/AdsList.vue'
import AdDetail from '../views/AdDetail.vue'
import Categories from '../views/Categories.vue'
import Profile from '../views/Profile.vue'
import MyAds from '../views/MyAds.vue'
import CreateAd from '../views/CreateAd.vue'
import EditAd from '../views/EditAd.vue'

// Admin Views
import AdminLogin from '../views/admin/Login.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminUsers from '../views/admin/Users.vue'
import AdminAds from '../views/admin/Ads.vue'
import AdminCategories from '../views/admin/Categories.vue'
import AdminLocations from '../views/admin/Locations.vue'
import AdminBanners from '../views/admin/Banners.vue'
import AdminBlocks from '../views/admin/Blocks.vue'
import AdminOperators from '../views/admin/Operators.vue'
import AdminSettings from '../views/admin/Settings.vue'

const routes = [
  // Public Routes
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/ads', component: AdsList },
  { path: '/ads/:id', component: AdDetail },
  { path: '/categories', component: Categories },
  
  // User Routes (require auth)
  { 
    path: '/profile', 
    component: Profile, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/my-ads', 
    component: MyAds, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/create-ad', 
    component: CreateAd, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/edit-ad/:id', 
    component: EditAd, 
    meta: { requiresAuth: true } 
  },

  // Admin Routes
  { path: '/admin/login', component: AdminLogin },
  { 
    path: '/admin', 
    redirect: '/admin/dashboard' 
  },
  { 
    path: '/admin/dashboard', 
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/users', 
    component: AdminUsers,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/ads', 
    component: AdminAds,
    meta: { requiresOperator: true }
  },
  { 
    path: '/admin/categories', 
    component: AdminCategories,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/locations', 
    component: AdminLocations,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/banners', 
    component: AdminBanners,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/blocks', 
    component: AdminBlocks,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/operators', 
    component: AdminOperators,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/admin/settings', 
    component: AdminSettings,
    meta: { requiresAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/admin/login')
  } else if (to.meta.requiresOperator && !authStore.isOperator && !authStore.isAdmin) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router