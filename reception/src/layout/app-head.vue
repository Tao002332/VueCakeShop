<template>
  <div>
    <!-- Preloader -->
    <!-- <div class="preloader">
      <div class="loader_overlay"></div>
      <div class="loader_cogs">
        <div class="loader_cogs__top">
          <div class="top_part"></div>
          <div class="top_part"></div>
          <div class="top_part"></div>
          <div class="top_hole"></div>
        </div>
        <div class="loader_cogs__left">
          <div class="left_part"></div>
          <div class="left_part"></div>
          <div class="left_part"></div>
          <div class="left_hole"></div>
        </div>
        <div class="loader_cogs__bottom">
          <div class="bottom_part"></div>
          <div class="bottom_part"></div>
          <div class="bottom_part"></div>
          <div class="bottom_hole"></div>
        </div>
      </div>
    </div> -->
    <!-- Main Header-->
    <header class="main-header">
      <!-- Menu Wave -->
      <div class="menu_wave"></div>
      <!-- Main box -->
      <div class="main-box">
        <div class="menu-box">
          <div class="logo">
            <router-link tag="a" :to="{ name: 'Home' }">
              <img src="@static/images/logo.png" alt="" title="" />
            </router-link>
          </div>
          <!--Nav Box-->
          <div class="nav-outer clearfix">
            <!-- Main Menu -->
            <nav class="main-menu navbar-expand-md navbar-light">
              <div
                class="collapse navbar-collapse clearfix"
                id="navbarSupportedContent"
              >
                <ul class="navigation menu-left clearfix">
                  <li>
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                  </li>
                  <li class="dropdown">
                    <a href="#">Portfolio</a>
                  </li>
                </ul>
                <ul class="navigation menu-right clearfix">
                  <li class="dropdown">
                    <router-link :to="{ name: 'Shop' }">Shop</router-link>
                    <ul>
                      <li>
                        <router-link :to="{ name: 'Shop' }">Shop</router-link>
                      </li>
                      <li><a href="shopping-checkout.html">Cart</a></li>
                      <li>
                        <router-link :to="{ name: 'CheckOut' }"
                          >Checkout</router-link
                        >
                      </li>
                      <li>
                        <router-link :to="{ name: 'Login' }"
                          >My account</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li>
                    <router-link :to="{ name: 'Order' }"
                          >Order</router-link
                        >
                  </li>
                </ul>
              </div>
            </nav>
            <!-- Main Menu End-->
            <div class="outer-box clearfix">
              <!-- Shoppping Car -->
              <div class="cart-btn">
                <a href="shopping-checkout.html"
                  ><i class="icon flaticon-commerce"></i
                  ><span class="count">{{ cart.length }}</span></a
                >
                <div class="shopping-cart">
                  <ul class="shopping-cart-items">
                    <li v-if="!cart.length" class="isEmpty">
                        <span >当前购物车空空如也</span>
                    </li>
                    <li v-else  v-for="(item,index) in cart" :key="item.sku_id" class="cart-item">
                      <el-image :src="item.product_img" class="thumb" />
                      <span class="item-name">{{ item.product_title }}</span
                      ><span class="item-quantity" style="font-size: 95%;"
                        >{{ item.num }} x
                        <span
                          :class="
                            item.discount !== 1.0
                              ? 'item-amount line-through'
                              : 'item-amount'
                          "
                          >￥{{ item.origin_price }}</span
                        >
                        <span class="now-price">￥{{ item.price }}</span>
                        <span>
                          <i
                            class="el-icon-caret-top"
                            style="position: absolute;top: -5px;z-index: 999;"
                            @click="updateItemNumber(1, item.sku_id)"
                          ></i>
                          <i
                            class="el-icon-caret-bottom"
                            style="position: absolute;top: 5px;z-index: 999;"
                            @click="updateItemNumber(-1, item.sku_id)"
                          ></i>
                        </span>
                      </span>
                      <router-link
                        tag="a"
                        :to="{ name: 'ShopDetail', query: { spuId: item.id } }"
                        class="product-detail"
                      ></router-link>
                      <button class="remove-item" @click="deleteNumber(index)">
                        <span class="fa fa-times"></span>
                      </button>
                    </li>
                  </ul>
                  <div class="cart-footer">
                    <div class="shopping-cart-total">
                      <strong>Subtotal:</strong>￥ {{ total }}
                    </div>
                    <a href="javascript:;"  class="theme-btn" @click="clearCart">清空购物车</a>
                    <router-link tag="a" class="theme-btn" :to="{ name: 'CheckOut' }">提交订单</router-link>
                  </div>
                </div>
                <!--end shopping-cart -->
              </div>
              <!-- Search Btn -->
              <div class="search-box">
                <span class="search-btn"><i class="fa fa-search"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sticky Header  -->
      <div class="sticky-header">
        <div class="auto-container clearfix">
          <!--Logo-->
          <div class="logo">
            <a href="#" title="Sticky Logo"
              ><img src="@static/images/logo-small.png" alt="Sticky Logo"
            /></a>
          </div>
          <!--Nav Outer-->
          <div class="nav-outer">
            <!-- Main Menu -->
            <nav class="main-menu">
              <!--Keep This Empty / Menu will come through Javascript-->
            </nav>
            <!-- Main Menu End-->
          </div>
        </div>
      </div>
      <!-- End Sticky Menu -->
      <!-- Mobile Header -->
      <div class="mobile-header">
        <div class="logo">
          <a href="index.html"
            ><img src="@static/images/logo-small.png" alt="" title=""
          /></a>
        </div>
        <!--Nav Box-->
        <div class="nav-outer clearfix">
          <!--Keep This Empty / Menu will come through Javascript-->
        </div>
      </div>
      <!-- Mobile Menu  -->
      <div class="mobile-menu">
        <nav class="menu-box">
          <div class="nav-logo">
            <a href="index.html"
              ><img src="@static/images/logo-small.png" alt="" title=""
            /></a>
          </div>
          <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->
        </nav>
      </div>
      <!-- End Mobile Menu -->
      <!-- Header Search -->
      <!-- End Header Search -->
    </header>
  </div>
</template>
<script>
export default {
  name: 'App-Head',
  inject: ['reload'],
  data () {
    return {
      cart: [],
      total: 0.0
    }
  },
  methods: {
    viewCart () {
      this.cart =
        sessionStorage.getItem('cart') !== null
          ? JSON.parse(sessionStorage.getItem('cart'))
          : this.cart
      //   sessionStorage.clear()
      console.log(this.cart)
    },
    checkTotal () {
      this.total = 0
      if (this.cart.length >= 1) {
        this.cart.forEach(item => {
          this.total += item.price * item.num
        })
        sessionStorage.setItem('total', this.total)
      }
      console.log(this.total)
    },
    updateItemNumber (num, skuId) {
      this.cart.some((item, index) => {
        if (item.sku_id === skuId) {
          if (item.num === 1 && num === -1) {
            if (confirm('是否移出购物车')) {
              this.cart.splice(index, 1)
            } else {
              item.num = 1
            }
          } else {
            item.num += num
          }
          return true
        }
      })
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
      this.checkTotal()
      this.reload()
    },
    deleteNumber (index) {
      console.log(index)
      if (confirm('是否移出购物车')) {
        this.cart.splice(index, 1)
        sessionStorage.setItem('cart', JSON.stringify(this.cart))
        this.checkTotal()
        this.reload()
      }
    },
    clearCart () {
      if (confirm('是否清空购物车')) {
        this.cart = []
        sessionStorage.removeItem('cart')
        this.checkTotal()
        this.reload()
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.viewCart()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.checkTotal()
  }
}
</script>
<style scoped>
.isEmpty {
    width: 270px;
    height: 400px;
    line-height: 400px;
    text-align: center;
}
.line-through {
    text-decoration: line-through;
}
.now-price {
    color: #cf6e67;
}
</style>
