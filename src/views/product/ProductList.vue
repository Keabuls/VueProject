<template>
  <div class="container py-4">

    <div class="border rounded pb-3 px-2">
      <div
        class="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center p-4"
      >
        <div>
          <h1 class="text-secondary">Products</h1>
          <p class="mb-0 text-muted small">Manage your product listings</p>
        </div>
        <router-link :to="{name:APP_ROUTE_NAMES.PRODUCT_UPSERT}" class="btn btn-success btn-sm gap-2 rounded-1 px-4 py-2">
          <i class="bi bi-plus-square"></i> &nbsp;
          <span>Add Product</span>
        </router-link>
      </div>

      <div class="card-body p-3">
        
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 table-striped">
            <span v-if="loading" class="loader mt-3"></span>
            <thead>
              <tr >
                <th class="ps-3 small text-muted">Product</th>
                <th class="small text-muted">Category</th>
                <th class="small text-muted">Pricing</th>
                <th class="small text-muted">Tags</th>
                <th class="small text-muted">Bestseller</th>
                <th class="pe-3 text-end small text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" >
                <td class="ps-3">
                  <div class="d-flex align-items-center">
                    <img
                      :src="product.image  ||  `https://placehold.co/50x50`"
                      class="rounded object-fit-cover me-2"
                      style="width: 50px; height: 50px"
                    />
                    <div>
                      <div class="fw-semibold small">{{ product.name }}}</div>
                      <small
                        class="text-muted text-truncate d-inline-block"
                        style="max-width: 200px"
                      >
                        {{ product.description }}
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge bg-secondary bg-opacity-10 text-secondary small">
                    {{product.category}}
                  </span>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <span class="fw-semibold small">${{product.price}}</span>
                    <span class="text-danger small"> ${{product.salePrice}} </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="tag in product.tags" :key="product.tag" class="badge bg-info bg-opacity-10 text-info small"> {{tag}} </span>
                  </div>
                </td>
                <td>
                  <span v-if="product.isBestseller" class="badge bg-warning bg-opacity-10 text-warning small">
                    {{ product.isBestseller }}
                  </span>
                  <span v-else class="text-muted text-center">---</span>
                </td>
                <td class="pe-3 text-end">
                  <button 
                  @click="router.push({name:APP_ROUTE_NAMES.PRODUCT_UPDATE, params: {id: product.id}})"
                  class="btn btn-sm btn-outline-secondary m-2">
                    <i class="bi bi-pencil-fill"></i> Edit
                  </button>

                  <button @click="deletE(product.id)" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash3-fill"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import productService from '@/services/productService'
import {useSwal} from '@/utility/useSwal.js'
import { APP_ROUTE_NAMES } from '@/constants/routeNames';
import { useRouter } from 'vue-router';

const router = useRouter()
const {showSuccess,showError,showConfirm} = useSwal();

const products = ref([])
const loading = ref(false)

onMounted(() =>{
    fetchProducts();
})

const deletE = async(id) => {
 try{
    loading.value = false;

    const confirmResult = await showConfirm('Are u sure about deleting?');
    if(confirmResult.isConfirmed){
        await productService.deleteProduct(id);
        await showSuccess('Product deleted successfully');
        fetchProducts()
    }


 }
 catch(err){
    console.log(err);
 }
 finally{
    loading.value = false;
 }
};


const fetchProducts = async () => {
    try{
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        products.value = await productService.getAllProducts()
        loading.value = false;

    }
    catch(err){
        console.log(err)
        loading.value=false;
    }
    finally{    
        loading.value=false;
    }
}
</script>















<style scoped>
.loader {
  width: 360px;
  height: 100px;
  display: block;
  position: relative;
  background-image: linear-gradient(100deg, transparent, rgba(38, 50, 56, 0.5) 50%, transparent 80%), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0);
  background-repeat: no-repeat;
  background-size: 75px 100px,  125px 20px, 260px 20px, 260px 20px;
  background-position: 0% 0, 120px 0, 120px 40px, 120px 80px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background: #FFF;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes animloader {
  0% {
    background-position: 0% 0, 120px 0, 120px 40px, 120px 80px;
  }
  100% {
    background-position: 100% 0, 120px 0, 120px 40px, 120px 80px;
  }
}
</style>
