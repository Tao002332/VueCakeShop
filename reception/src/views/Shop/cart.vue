<!--  -->
<template>
<!-- Cart Widget -->
    <div class="sidebar-widget cart-widget">
        <div class="widget-content">
        <h3 class="widget-title">Cart</h3>
        <div class="shopping-cart">
            <ul class="shopping-cart-items">
            <li v-if="!cart.length" class="isEmpty">
                <span >当前购物车空空如也</span>
            </li>
            <li v-else  v-for="(item,index) in cart" :key="item.sku_id" class="cart-item">
                <el-image :src="item.product_img" class="thumb" />
                <span class="item-name">{{ item.product_title }}</span>
                <span class="item-quantity" style="font-size: 95%;">{{ item.num }} x <span :class="item.discount!==1.00?'item-amount line-through':'item-amount'">￥{{ item.origin_price }}</span>
                    <span class="now-price">￥{{ item.price }}</span>
                    <span>
                        <i class="el-icon-caret-top" style="position: absolute;top: -5px;z-index: 999;" @click="updateItemNumber(1, item.sku_id)"></i>
                        <i class="el-icon-caret-bottom" style="position: absolute;top: 5px;z-index: 999;" @click="updateItemNumber(-1,item.sku_id)"></i>
                    </span>
                </span>
                <router-link tag="a" :to="{ name: 'ShopDetail', query: { spuId: item.id } }" class="product-detail"></router-link>
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
    </div>
</template>

<script>
export default {
  name: 'Cart',
  inject: ['reload'],
  data () {
    return {
      cart: [],
      total: 0.00
    }
  },
  methods: {
    viewCart () {
      this.cart = sessionStorage.getItem('cart') !== null ? JSON.parse(sessionStorage.getItem('cart')) : this.cart
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
/* @import url(); 引入css类 */
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
