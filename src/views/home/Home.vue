<template>
Home View
</template>

<script setup>
import { onMounted, ref } from 'vue'
import productService from '@/services/productService'
const products = ref([])
const loading = ref(false)

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
</script>