<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <img src="../../assets/logo.png" class="mx-3" style="width: 50px" alt="logo" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.HOME }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }"
              >Product</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.PRODUCT_UPSERT }"
              >Add Product</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.CONTACT_US }"
              >Contact Us</router-link
            >
          </li>
        </ul>

        <ul class="d-flex navbar-nav">
          <li class="nav-item dropdown">
            <a
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              class="nav-link dropdown-toggle"
            >
              <i class="bi bi-laptop"></i>
            </a>
            <ul class="dropdown-menu">
              <li>
                <button @click="themeStore.setTheme('light')" class="dropdown-item">
                  Light &nbsp <i class="bi bi-brightness-high"> </i>
                </button>
              </li>
              <li>
                <button @click="themeStore.setTheme('dark')" class="dropdown-item">
                  Dark &nbsp
                  <i class="bi bi-moon-fill"></i>
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-link" v-if="authStore.isAuthenticated">
            Welcome, {{ authStore.user?.email }}!
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.SING_IN }"
              >Sign In</router-link
            >
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.SING_UP }"
              >Sign Up</router-link
            >
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <button @click="handleSignOut" class="nav-link">Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/routeNames.js'
import { useThemeStore } from '../../stores/themeStore.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useSwal } from '@/utility/useSwal'
const { showSuccess, showError } = useSwal()
const authStore = useAuthStore()

const themeStore = useThemeStore()
const router = useRouter()

const handleSignOut = async () => {
  try {
    authStore.signOutUser()
    showSuccess('Signed Out Successfully')
    setTimeout(() => {
      router.push({ name: APP_ROUTE_NAMES.HOME })
    }, 2000)
  } catch (error) {
    error.value = error.message
    showError(error.message)
  }
}
</script>
