<template>
   <div>
    <div>
        <h1 class="text-center mt-8 text-green-600 uppercase">List customer</h1>
    </div>
    <ul class="mt-10">
        <li class="text-left my-3 ml-96" v-for="(customer, index) in listCustomerRender" :key="index">
            {{ customer.id }}. {{ customer.firstName }} {{ customer.lastName }} 
            <el-button @click="deleteCustomer(customer)" type="warning" round>Delete</el-button> 
            <el-button type="danger" round @click="updateCustomer(customer)">Update</el-button>
        </li>
    </ul>
    <div class="mb-20">
        <button class="bg-[#3A5B22]  text-[#FFFFFF] py-3 px-7 rounded-xl mt-10 ml-96 " @click="loadMore">Xem thêm</button>
        <button class="bg-[#3A5B22]  text-[#FFFFFF] py-3 px-7 rounded-xl mt-10 ml-20" @click="dialogVisible = true">Thêm</button> 
    </div>
    <el-dialog
    v-model="dialogVisible"
    title="New customer"
    width="30%"
    :before-close="handleClose">
    <el-form-item label="ID">
      <el-input v-model="id" />
    </el-form-item>
    <el-form-item label="First Name">
      <el-input v-model="firstName" />
    </el-form-item>
    <el-form-item label="Last Name">
      <el-input v-model="lastName" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addCustomer">
          Add
        </el-button>
      </span>
    </template>
    </el-dialog>
    <el-dialog
    v-model="dialogVisibleEdit"
    title="Update customer"
    width="30%"
    :before-close="handleClose">
    <el-form-item label="First Name">
      <el-input v-model="firstName" />
    </el-form-item>
    <el-form-item label="Last Name">
      <el-input v-model="lastName" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onEditCustomer">
          Update
        </el-button>
      </span>
    </template>
    </el-dialog>
   </div>
</template>
<script>
import { ElButton, ElDialog } from 'element-plus'
import { listCustomer } from "../constants/index"
export default {
    data() {
        return{
            listCustomer: [],
            page: 1,
            start: 0,
            end: 50,
            dialogVisible: false,
            id: "",
            firstName: "",
            lastName:"",
            indexSelectedEdit: -1,
            dialogVisibleEdit: false
        }
    },
    computed: {
        listCustomerRender() {
            return this.listCustomer.slice(this.start, this.end * this.page)
        }
    },
    methods: {
        loadMore() {
            this.page = this.page + 1
        },
        deleteCustomer(customer) {
            const index = this.listCustomer.findIndex(
                (item) => item.id == customer.id
            )
            console.log(customer)
            this.listCustomer.splice(index,1)
            localStorage.setItem("list", JSON.stringify(this.listCustomer))
        },
        addCustomer() {
            this.listCustomer.unshift(
                {
                    id: this.id,
                    firstName: this.firstName,
                    lastName: this.lastName,
                }
            )
            localStorage.setItem("list", JSON.stringify(this.listCustomer))
            this.resetForm()
            this.dialogVisible = false
        },
        resetForm() {
            this.id = ''
           this.firstName = ''
           this.lastName = ''
           this.indexSelectedEdit = -1
           
        },
        updateCustomer(customer){
            const index = this.listCustomer.findIndex(
                (item) => item.id == customer.id
            )
            this.indexSelectedEdit = index
            this.firstName = this.listCustomer[index].firstName
            this.lastName = this.listCustomer[index].lastName
            this.dialogVisibleEdit = true
        },
        onEditCustomer() {
            const editCustomer = {
                ...this.listCustomer[this.indexSelectedEdit],
                firstName: this.firstName,
                lastName: this.lastName,
            }
            this.listCustomer[this.indexSelectedEdit] = editCustomer
            localStorage.setItem("list", JSON.stringify(this.listCustomer))
            this.resetForm()
            this.dialogVisibleEdit = false
        }
    },
    mounted() {
        this.listCustomer = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : listCustomer
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>