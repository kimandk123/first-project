<template>
  <el-table :data="users" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="firstName" label="Name" width="180" />
    <el-table-column prop="address.city" label="Address" />
    <el-table-column label="Checkbox"> 
      <template #default="scope">
        <input 
        type="checkbox" 
        :checked="listChecked.includes(scope.row.id)" 
        :value="scope.row.id" 
        @change="handleCheckBox"
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Edit" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handelEdit(scope.row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div>
    <span>Check All</span>
    <input 
      type="checkbox" 
      @change="changeCheckboxAll"
      :checked="listChecked.length === users.length"
    />
  </div>
  <el-pagination
    @current-change="handleCurrentChange"
    v-model:current-page="currentPage"
    :default-page-size="10"
    small
    background
    layout="prev, pager, next"
    :total="total"
    class="mt-4"
  />
  <el-dialog
    v-model="dialogVisibleEdit"
    title="Edit Info"
    width="30%"
    :before-close="handleClose"
  >
  <input type="file" @change="handleChangeAvatar"/>
    <div v-if="newImage">
      <img :src="newImage" alt="">
    </div>
    <el-form-item label="ID">
      <el-input v-model="id" />
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="firstName" />
    </el-form-item>
    <el-form-item label="Address">
      <el-input v-model="address" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">Cancel</el-button>
        <el-button type="primary" @click="onEditCustomer"> Update </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      page: 1,
      start: 0,
      end: 10,
      id: "",
      firstName: "",
      dialogVisible: false,
      address: "",
      limit: 10,
      skip: 0,
      total: 0,
      currentPage: 1,
      indexSelectedEdit: -1,
      dialogVisibleEdit: false,
      newImage: null,
      listChecked: []
    };
  },
  methods: {
    handleCurrentChange(page) {
      console.log({page})
      this.currentPage = page;
      this.$router.push({
        name: "listInfo",
        query: {
          page: this.currentPage,
        },
      });
    },
    getInfo() {
      axios
        .get(
          `https://dummyjson.com/users?limit=${this.limit}&skip=${this.skip}`
        )
        .then((response) => {
          console.log("response", response);
          this.users = response.data.users;
          this.total = response.data.total;
        });
    },
    handelEdit(user) {
      console.log(user);
      this.dialogVisibleEdit = true;
      const index = this.users.findIndex(
                (item) => item.id == user.id
            )
      this.indexSelectedEdit = index
      this.id = user.id
      this.firstName = user.firstName
      this.address = user.address.city
    },
    onEditCustomer() {
      let updateUser = this.users[this.indexSelectedEdit]
      console.log(updateUser)

      updateUser = {
        ...updateUser,
        firstName: this.firstName,
        address: {
          ...updateUser.address,
          city: this.address
        }
      }
      this.users[this.indexSelectedEdit] = updateUser
      this.dialogVisibleEdit = false

    },
    handleChangeAvatar(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();

      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
        console.log("newImage", this.newImage)
      };
      theReader.readAsDataURL(file);
    },
    handleCheckBox(event) {
      const { value, checked } = event.target
      if(checked) {
        this.listChecked.push(Number(value))
      }
      else {
        const index = this.listChecked.findIndex((item) => item == value)
        console.log({index})
        if(index !== -1) {
          this.listChecked.splice(index, 1)
        }
        console.log(this.listChecked)
      }
    },
    changeCheckboxAll(event) {
      const { checked } = event.target

      if(checked) {
        this.listChecked = []
        this.users.forEach(user => this.listChecked.push(Number(user.id)))
      }
      else {
        this.listChecked = []
      }
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.limit);
    },
  },
  watch: {
    currentPage: {
      handler() {
        this.skip = (this.currentPage - 1) * this.limit;
        this.getInfo();
      },
    },
  },
  mounted() {
    this.listInfo = localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : this.listInfo;
    this.currentPage = this.$route.query.page
      ? Number(this.$route.query.page)
      : 1;
    this.getInfo();
  },
};
</script>
