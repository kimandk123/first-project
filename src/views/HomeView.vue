<template>
  <main>
    <div class="container mx-auto mt-20 w-1/2">
      <div class="relative">
        <h1 class="hp ml-64 mt-10">HOME PAGE</h1>
        <div class="py-4 ml-40" @click="handleLogout">
          <button
            class="signup border-solid rounded-xl border-2 border-black indent-1 px-20 w-80 bg-[#3A5B22] text-[#FFFFFF] font-bold">
            Log out
          </button>
        </div>
      </div> 
      <div>
        <ul class="grid grid-cols-3 grid-rows-4 gap-4 mt-10">
          <li class="border-2 rounded-lg border-gray-200 border-solid shadow-lg py-2 px-4" v-for="(product, index) in products" :key="index">
            <div class="img w-full my-1 ">
              <img :src="product.thumbnail">
            </div>
            <div class="my-1">
              {{ product.title }}
            </div>
            <div class="my-1">
              {{ product.description }}
            </div>
            <div class="my-1">
              {{ product.price }} 
            </div>
          </li>
        </ul>
     </div>
    </div>
    <div class="flex items-center mt-10 mx-auto">
      <div
        v-for="(page, index) in totalPage"
        :key="index"
        class="w-10 h-10 mx-4 bg-[#3A5B22] text-white rounded-md text-center"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
    </div>
  </main>
</template>
<script>
  
  import { ACCOUNT_INFO } from '../constants/index';
  import axios from 'axios'
//import TheWelcome from '../components/TheWelcome.vue'
export default {
  data() {
    return{
      limit: 10,
      skip: 0,
      total: 0,
      products: [],
      currentPage: 1,
    }
    
  },
  methods: {
    handleLogout() {
      localStorage.removeItem(ACCOUNT_INFO)
      this.$router.push({ name: 'login' })
    },
    getAllProduct() {
      axios
        .get(`https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip}`)
        .then((response) => {
          console.log("response", response)
          this.products = response.data.products
          this.total = response.data.total
        })
    },
    changePage(page) {
      this.currentPage = page
      this.$router.push({
        name: "home",
        query: {
          page: this.currentPage,
        },
      });
    }
  },
  watch: {
    currentPage: {
      handler() {
        this.skip = (this.currentPage - 1) * this.limit;
        this.getAllProduct();
      },
    },
  },
  mounted() {
      this.currentPage = this.$route.query.page ? Number(this.$route.query.page) : 1
      this.getAllProduct();
  },
}
</script>