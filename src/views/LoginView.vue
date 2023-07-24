<template>
  <div class="container mx-auto mt-10 max-w-5xl grid grid-cols-2 max-h-full">
    <div class="login-form mr-7 mt-24">
      <h1 class="h1 w-64 h-12 font-medium not-italic text-3xl color-[#000000]] mb-11">
        Get Started Now
      </h1>
      <div class="py-2">
        <label class="mr-5" for="uname"><b>Name</b></label>
        <input class="border-solid border-2 border-[#D9D9D9] rounded-lg indent-1 block box-border w-80" type="text"
          placeholder="Enter your name" name="uname" v-model="username" />
      </div>
      <div class="py-2">
        <label class="mr-5" for="psw"><b>Password</b></label>
        <input class="border-solid border-2 border-[#D9D9D9] rounded-lg indent-1 block box-border w-80" type="password"
          placeholder="Enter Password" name="psw" v-model="password" />
      </div>
      {{ messageError }}
      <div class="py-4" @click="handleLogin">
        <button
          class="signup border-solid rounded-xl border-2 border-black indent-1 px-20 w-80 bg-[#3A5B22]  text-[#FFFFFF] font-bold">
          Sign up
        </button>
      </div>
    </div>
    <div class="img ml-7">
      <img src="../pictures/chris-lee-70l1tDAI6rM-unsplash 1.png" />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {ACCOUNT_INFO} from '../constants/index'
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      messageError: " ",
      messageSuccess: "",
      MIN_USERNAME_LENGTH: 6,
      MIN_PASSWORD_LENGTH: 7,
      userInfo: {
        username: "kminchelle",
        password: "0lelplR",
      },
    };
  },
  computed: {
    isDisableButton() {
      return
      this.username.length > 0 &&
        this.password.length > 0 &&
        this.email.length > 0
        ;
    },
  },
  methods: {
    /*validateEmail: function (email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },*/
    onValidate() {
      if (this.username != this.userInfo.username) {
        this.messageError = "Tên đăng nhập không đúng";
        return false;
      } else if (this.password != this.userInfo.password) {
        this.messageError = "Mật khẩu không đúng";
        return false;
      } else if (this.username && this.username.length < this.MIN_USERNAME_LENGTH) {
        this.messageError =
          `Tên đăng nhập không được ít hơn ${MIN_USERNAME_LENGTH} kí tự`;
        return false;
      } else if (this.password && this.password.length < this.MIN_PASSWORD_LENGTH) {
        this.messageError =
          `Mật khẩu không được ít hơn ${this.MIN_PASSWORD_LENGTH} kí tự`;
        return false;
      }/* else if (!this.validateEmail(this.email)) {
        this.messageError =
          `Vui lòng nhập email đúng định dạng`;
        return false;
      }*/
      console.log(this.messageError);
      this.messageError = "";
      return true;
    },
    handleLogin() {
      console.log("Handle");
      if (!this.onValidate()) {
        return ;
      }
      axios.post("https://dummyjson.com/auth/login", {
          username: "kminchelle",
          password: "0lelplR",
        })
        .then((res) => {
          localStorage.setItem(ACCOUNT_INFO,JSON.stringify(res.data))
          this.$router.push({ name: 'listCustomer' })
        })
        .catch((e) => console.log(e))
      //this.messageSuccess = "Bạn đã đăng nhập thành công";
      //this.$router.push({ name: "home" });
    },
  },     
};
</script>
