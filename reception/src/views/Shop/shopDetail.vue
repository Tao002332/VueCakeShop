<template>
  <div>
    <!--Page Title-->
    <section
      class="page-title"
      style="background-image:url(static/images/background/34.jpg)"
    >
      <div class="auto-container">
        <h1>{{ pojo.title }}</h1>
        <ul class="page-breadcrumb">
          <li>
            <router-link tag="a" :to="{name: 'Home'}">home</router-link>
          </li>
          <li>
            <router-link tag="a" :to="{name: 'Shop'}">Shop</router-link>
          </li>
          <li>{{ pojo.title }}</li>
        </ul>
      </div>
    </section>
    <!--End Page Title-->
    <!--Sidebar Page Container-->
    <div class="sidebar-page-container">
      <div class="auto-container">
        <div class="row clearfix">
          <!--Content Side-->
          <div class="content-side col-lg-9 col-md-12 col-sm-12">
            <div class="shop-single">
              <!-- Product Detail -->
              <div class="product-details">
                <!--Basic Details-->
                <div class="basic-details">
                  <div class="row clearfix">
                    <div class="image-column col-md-6 col-sm-12">
                      <figure class="image">
                        <a
                          href="javascript:;"
                          class="lightbox-image"
                          title="Image Caption Here"
                        >
                          <el-image :src="pojo.img"  style="width:100%;height:auto;"></el-image>
                          <span class="icon fa fa-search"></span>
                        </a>
                      </figure>
                    </div>
                    <div class="info-column col-md-6 col-sm-12">
                      <div class="details-header">
                        <h4>{{ pojo.title }}</h4>
                        <div class="rating">
                          <span>{{ pojo.pv }}浏览</span>
                          <br>
                          <span>{{ pojo.discount | formatterDiscount }} </span>
                        </div>
                        <div class="item-price">
                          最低价 ￥{{ pojo.price }}
                        </div>
                        <div class="text">
                          {{ pojo.desc }}
                        </div>
                      </div>
                      <div class="other-options clearfix">
                        <div class="item-quantity">
                          规格
                          <div style="margin-left:10px;width:400px" v-for="item in skus" :key="item.id">
                            <span  @click="getPrice(item.price)">
                              <el-radio v-model="checkMap.sku_id" :label="item.id" border>{{ item.attribute_list.sizeTitle }}| {{ item.attribute_list.heightTitle }} |单价 ￥{{ item.price }}|库存 {{ item.stock }}</el-radio>
                            </span>
                          </div>
                        </div>
                        <div class="item-quantity">
                          Quantity
                          <el-input-number :min="1" v-model="checkMap.num" placeholder="购买数量" style="margin-bottom: 10px;"></el-input-number>
                          <button type="button" class="theme-btn add-to-cart">
                            <span class="btn-title" v-loading="loading" @click="addCart">Add To Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Product Detail -->
            </div>
            <!-- End Shop Single -->
          </div>
          <!--Sidebar Side-->
          <div
            class="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12"
          >
            <aside class="sidebar theiaStickySidebar">
              <div class="sticky-sidebar">
                <!-- Search Widget -->
                <div class="sidebar-widget search-widget">
                  <form method="post">
                    <div class="form-group">
                      <input
                        type="search"
                        name="search-field"
                        value=""
                        placeholder="Search products…"
                        required=""
                      />
                      <button type="submit">
                        <span class="icon fa fa-search"></span>
                      </button>
                    </div>
                  </form>
                </div>
                <cart />
                <!-- Tags Widget -->
                <div class="sidebar-widget tags-widget">
                  <h3 class="widget-title">Tags</h3>
                  <ul class="tag-list clearfix">
                    <li><a href="javascript:;">Bars</a></li>
                    <li><a href="javascript:;">Caramels</a></li>
                    <li><a href="javascript:;">Chocolate</a></li>
                    <li><a href="javascript:;">Fruit</a></li>
                    <li><a href="javascript:;">Nuts</a></li>
                    <li><a href="javascript:;">Toffees</a></li>
                    <li><a href="javascript:;">Top Rated</a></li>
                    <li><a href="javascript:;">Truffles</a></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
    <!--End Sidebar Page Container-->
    <!-- Main Footer -->
    <appFooter />
    <!-- End Footer -->
  </div>
</template>
<script>
import productSpusApi from '@/api/productSpu'
import propertyKeysApi from '@/api/propertyKey'
import appFooter from '@/layout/app-footer'
import cart from '@/views/Shop/cart'
export default {
  name: 'ShopDetail',
  components: { appFooter, cart },
  inject: ['reload'],
  filters: {
    formatterDiscount (value) {
      return value === '1.00' ? '无折扣' : '正在活动当前折扣 ' + (value * 100) + '%'
    },
    formatterDate (value) {
      return new Date(value).toLocaleString()
    }
  },
  data () {
    return {
      pojo: {},
      skus: [],
      keysList: [],
      valuesList: [],
      checkMap: {
        num: 1
      },
      loading: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      productSpusApi.getSkus(this.$route.query.spu_id).then(res => {
        this.pojo = res.data.spu
        this.skus = res.data.skus
        this.skus.forEach(element => {
          element.attribute_list = JSON.parse(element.attribute_list)
          this.getKeyAndValuesById(element.attribute_list.size)
        })
      })
    },
    getKeyAndValuesById (id) {
      if (!this.keysList.hasOwnProperty(id)) {
        propertyKeysApi.findById(id).then(res => {
          this.keysList.push({ key: id, title: res.data.keys.title, value: res.data.values })
        })
      }
    },
    getPrice (price) {
      this.checkMap.price = (price * this.pojo.discount).toFixed(2)
      this.checkMap.origin_price = price
      console.log(this.checkMap.price + '---' + this.pojo.discount)
    },
    addCart () {
      this.loading = true
      if (this.checkMap.sku_id !== undefined) {
        var cart = sessionStorage.getItem('cart') !== null ? JSON.parse(sessionStorage.getItem('cart')) : []
        const isHas = cart.some(item => {
          if (item.sku_id === this.checkMap.sku_id) {
            item.num += this.checkMap.num
            return true
          } else {
            return false
          }
        })
        if (!isHas) {
          cart.push({
            sku_id: this.checkMap.sku_id,
            num: this.checkMap.num,
            price: this.checkMap.price,
            product_title: this.pojo.title + '-' + this.checkMap.sku_id,
            product_img: this.pojo.img,
            spu_id: this.pojo.id,
            origin_price: this.checkMap.origin_price,
            discount: this.pojo.discount
          })
        }
        sessionStorage.setItem('cart', JSON.stringify(cart))
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.reload()
      } else {
        this.$message({
          message: '请选择规格',
          type: 'error'
        })
      }
      this.loading = false
    }
  }
}
</script>
<style scoped>
.tag-list li {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
}

</style>
