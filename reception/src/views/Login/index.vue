<!--  -->
<template>
  <div>
    <!--Page Title-->
    <section
      class="page-title"
      style="background-image:url(static/images//background/34.jpg)"
    >
      <div class="auto-container">
        <h1>Login</h1>
        <ul class="page-breadcrumb">
          <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
          <li>login</li>
        </ul>
      </div>
    </section>
    <!--End Page Title-->
    <!--Login Section-->
    <section class="login-section">
      <div class="auto-container">
        <!-- Login Form -->
        <div class="login-form">
          <h2>Login</h2>
          <!--Login Form-->
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules"  auto-complete="on" label-position="left" >
            <div class="form-group">
              <label>Username</label>
              <el-form-item>
                <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
              </el-form-item>
            </div>
            <div class="form-group">
              <label>Password *</label>
              <el-form-item prop="password">
                <el-input
                  key="password"
                  ref="password"
                  v-model="loginForm.password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
            </div>

            <div class="form-group">
              <input
                class="theme-btn"
                type="submit"
                name="submit-form"
                value="Log in"
              />
            </div>
          </el-form>
          <div class="form-group">
              <input
                type="checkbox"
                name="shipping-option"
                id="account-option-1"
              />&nbsp; <label for="account-option-1">Remember me</label>
            </div>
            <div class="form-group pass">
              <router-link tag="a" class="psw" :to="{ name: 'ChangePwd' }">Lost your password？</router-link>
              <router-link tag="a" class="psw" :to="{ name: 'Register' }">No account?</router-link>
            </div>
        </div>
        <!--End Login Form -->
      </div>
    </section>
    <!--End Login Section-->
    <appFooter />
  </div>
</template>

<script>
import appFooter from '@/layout/app-footer'
export default {
  name: 'Login',
  components: { appFooter },
  data () {
    return {
      loginForm: {
        username: '123',
        password: '123'
      },
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin () {
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.login-form .psw {
    position: relative;
    color: #5fcac7;
    font-size: 17px;
    margin-right: 20px;
    -webkit-transition: all 300ms ease;
    -moz-transition: all 300ms ease;
    -ms-transition: all 300ms ease;
    -o-transition: all 300ms ease;
    transition: all 300ms ease;
}
</style>
