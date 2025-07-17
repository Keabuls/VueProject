<template>
  <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form v-on:submit.prevent="handleSubmit">
          <div class="h2 text-center text-success">{{ productIdForUpdate? "Update": "Create" }} Product</div>
          <hr />
          <div v-if="errorList.length > 0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul style="list-style-type: none">
              <li v-for="error in errorList" :key="error">
                <i class="bi bi-exclamation-circle"></i> {{ error }}
              </li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input v-model="productObj.name" type="text" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea v-model="productObj.description" type="text" class="form-control"></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input v-model.number="productObj.price" type="number" class="form-control" />
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input v-model.number="productObj.salePrice" type="number" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-seperated)</span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g., modern, classic, luxury"
              v-model="productObj.tags"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input
              v-model="productObj.isBestseller"
              class="form-check-input"
              type="checkbox"
              role="switch"
            />

            <label class="form-check-label" for="bestseller"> Bestseller </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select" v-model="productObj.category" >
              <option v-for="option in PRODUCT_CATEGORIES"  :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input type="file" class="form-control" 
              @change="handleImageUpload"
              :disable="isImageLoading"
              />
            </div>
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading || isImageLoading">
              <span v-if="loading || isImageLoading" class="spinner-border spinner-border-sm me-2"></span>Submit
            </button>
            <router-link :to="{name:APP_ROUTE_NAMES.PRODUCT_LIST}" class="btn btn-secondary m-2 w-25"> Cancel </router-link>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="productObj.image"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { PRODUCT_CATEGORIES } from '@/constants/appConstants'
import { reactive, ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useSwal} from '@/utility/useSwal.js'
import productService from '@/services/productService.js'
import { APP_ROUTE_NAMES } from '@/constants/routeNames.js'
import { uploadtoCloudinary } from '@/utility/cloudinary.js' 

const {showSuccess,showError,showConfirm} = useSwal();


const route = useRoute()
const router = useRouter()
const loading = ref(false)
const isImageLoading = ref(false)

const errorList = reactive([])


const productObj = reactive({
  name: '',
  description: '',
  price: 0,
  salePrice: 0,
  tags: [],
  isBestseller: false,
  category: '',
  image: 'https://placehold.co/600x400',
})

const productIdForUpdate = route.params.id

onMounted(async () => {
  if (!productIdForUpdate) return;
  loading.value = true
  try {
    const product = await productService.getDocById(productIdForUpdate)
    Object.assign(productObj, {...product,tags: product.tags.join(', ')})
  } catch (error) {
    console.log(error)
    showError('Failed to fetch product details')
  } finally {
    loading.value = false
  }

})

async function handleSubmit() {
  try {
    loading.value = true
    errorList.length = 0 //clear the list

    if (productObj.name.length < 3) {
      errorList.push('Name should be at least 3 characters long.')
    }
    if (productObj.price <= 0) {
      errorList.push('Price should be greater than 0.')
    }
    if (productObj.category === '') {
      errorList.push('Please select a category.')
    }
    if (!errorList.length) {
      const productData = {
        ...productObj,
        price: Number(productObj.price),
        salePrice: productObj ? Number(productObj.salePrice) : null,
        tags:productObj.tags.length >0 ? productObj.tags.split(',').map((tag) => tag.trim()):[],
        bestseller: Boolean(productObj.isBestseller),
      }
      if (productIdForUpdate) {
        await productService.updateProduct(productIdForUpdate, productData);
        showSuccess('Successfully Updated')
      }
      else{
        await productService.createProduct(productData);
        showSuccess('Successfully Added')
      }


      router.push({name:APP_ROUTE_NAMES.PRODUCT_LIST})
    } 
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
  console.log(productObj)
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    isImageLoading.value = true;
    const imageUrl = await uploadtoCloudinary(file);
    productObj.image = imageUrl;
  } 
  catch (err) {
    console.log('Image upload failed:', err);
    throw err;
  } 
  finally {

    isImageLoading.value = false;
  }


}


</script>
