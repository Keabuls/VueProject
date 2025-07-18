<template>
  <div class="mb-5">
    <div
      class="bg-success w-100 position-relative overflow-hidden mb-4 py-5 d-flex align-items-center"
      style="
        background-image: url('');
        background-size: cover;
        background-position: center;
        min-height: 400px;
      "
    >
      <div
        class="position-absolute top-0 start-0 w-100 h-100 bg-success opacity-50"
      ></div>

      <div class="container-fluid position-relative z-1">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 fw-bold text-white mb-4">
              Your One-Stop Stone Shop
              <br class="d-none d-lg-block" />
              Premium Granite & Quartz for Every Style!
            </h1>
            <div
              class="input-group mt-3 mx-auto shadow-lg rounded-4"
              style="max-width: 700px"
            >
              <input
                type="text"
                class="form-control border-0 py-3 px-4 fs-5"
                v-model="searchValue"
                placeholder="Search your favorite product..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="product-list" class="container">
      <h2 class="mb-5 text-center display-6">Discover Our Collection</h2>

      <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-auto">
          <div class="d-flex flex-wrap gap-3">
            <button 
            @click="selectedCategory = category"
            v-for="(category,index) in categoryList" 
            :key="index" 
            class="btn px-4 py-2"
            :class="{
              'btn-success text-white': selectedCategory === category,
              'btn-outline-success': selectedCategory !== category
            }"
            >{{category}}</button>
          </div>
        </div>
        <div class="col-md-auto ms-md-auto">
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sort-down"></i>
              <span class="text-capitalize">{{selectedSortOption}}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li v-for="(sort, index) in SORT_OPTIONS" :key="index">
                <button
                  class="dropdown-item py-2 d-flex align-items-center gap-2"
                  @click="selectedSortOption = sort"
                >
                  <i class="bi"></i>
                  <span class="text-capitalize"> {{ sort }} </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div v-if="filteredProductList.length > 0" class="row g-4 pb-4" >
          <productCard 
          v-for="product in filteredProductList"
          :key="product.id"  
          :product="product">

          </productCard>
        </div>
        <div v-else>
          <h3>No Products Found</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue'
import productService from '@/services/productService.js'
import productCard from '@/components/Product/ProductCard.vue'
import {PRODUCT_CATEGORIES,SORT_OPTIONS,SORT_NAME_A_Z,SORT_NAME_Z_A,SORT_PRICE_HIGH_LOW,SORT_PRICE_LOW_HIGH} from '@/constants/appConstants.js'

const selectedSortOption = ref(SORT_OPTIONS[0])
const selectedCategory = ref('ALL')
const categoryList = ref(["ALL",...PRODUCT_CATEGORIES])

const products = ref([])
const loading = ref(false)

const searchValue = ref('')


onMounted(() =>{
    fetchProducts();
})

const fetchProducts = async () => {
    try{
        loading.value = true;
        products.value = await productService.getAllProducts()
        loading.value = false;
        console.log(products.value)

    }
    catch(err){
        console.log(err)
        loading.value=false;
    }
    finally{    
        loading.value=false;
    }
}

const filteredProductList = computed(() => {
  let tempArr = selectedCategory.value === 'ALL' ? [...products.value] : products.value.filter((item )=> item.category.toUpperCase() === selectedCategory.value.toUpperCase());
  
  
  if(searchValue.value) {
  tempArr = tempArr.filter((item) => {
    return item.name.toUpperCase().includes(searchValue.value.toUpperCase());
  });
}
  
  if (selectedSortOption.value === SORT_NAME_A_Z) {
    tempArr.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSortOption.value === SORT_NAME_Z_A) {
    tempArr.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectedSortOption.value === SORT_PRICE_LOW_HIGH) {
    tempArr.sort((a, b) => a.price - b.price);
  } else if (selectedSortOption.value === SORT_PRICE_HIGH_LOW) {
    tempArr.sort((a, b) => b.price - a.price);
  }

  
  return tempArr;
});





</script>