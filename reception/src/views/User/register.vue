<!--  -->
<template>
  <div>
    <!--Page Title-->
    <section
      class="page-title"
      style="background-image:url(static/images//background/34.jpg)"
    >
      <div class="auto-container">
        <h1>Register</h1>
        <ul class="page-breadcrumb">
          <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
          <li>Register</li>
        </ul>
      </div>
    </section>
    <!--End Page Title-->
    <!--Login Section-->
    <section class="login-section">
      <div class="auto-container">
        <!-- Login Form -->
        <div class="login-form">
          <h2>Register</h2>
          <!--Login Form-->
          <form method="post" action="contact.html">
            <div class="form-group">
              <label>Username or email address *</label>
              <input type="text" name="username" placeholder="" required />
            </div>

            <div class="form-group">
              <label>Password *</label>
              <input type="email" name="email" placeholder="" required />
            </div>

            <div class="form-group">
              <input
                class="theme-btn"
                type="submit"
                name="submit-form"
                value="Register"
              />
              <div class="form-group"></div>
              <div class="form-group">
                <router-link tag="a" class="psw" :to="{ name: 'Login' }">Has account?</router-link>
              </div>
            </div>
          </form>
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
  name: 'Register',
  components: { appFooter },
  data () {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
