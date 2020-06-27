<template>
  <div>
    <section
      class="page-title"
      style="background-image:url(static/images/background/34.jpg)"
    >
      <div class="auto-container">
        <h1>Shop</h1>
        <ul class="page-breadcrumb">
          <li>
            <router-link tag="a" :to="{name: 'Home'}">home</router-link>
          </li>
          <li>Shop</li>
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
            <div class="our-shop">
              <div class="shop-upper-box clearfix">
                <div class="items-label">
                  Showing all {{ total }} results
                </div>
                <div class="orderby">
                  <el-select v-model="searchMap.cate_id" placeholder="所属分类" clearable  @change="fetchData">
                    <el-option
                    v-for="item in catesList"
                    :label="item.title"
                    :value="item.id"
                    :key="item.id"
                    :disabled="item.data_flag===0"
                     />
                  </el-select>
                  <el-select v-model="searchMap.ord" placeholder="排序方式" @change="fetchData">
                    <el-option
                    v-for="item in ordList"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                     />
                  </el-select>
                  <el-select v-model="searchMap.by" placeholder="排序优先" @change="fetchData">
                    <el-option
                    v-for="item in byList"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                     />
                  </el-select>
                </div>
              </div>
              <div class="row clearfix">
                <!-- Shop Item -->
                <div class="shop-item col-lg-4 col-md-6 col-sm-12"
                  v-for="(item,index) in list"
                  :key="index"
                >
                  <div class="inner-box">
                    <div class="image-box">
                      <div v-if="item.discount!=1.00" class="sale-tag">
                        sale!
                      </div>
                      <figure class="image">
                        <router-link :to="{ name: 'ShopDetail', query: { spu_id: item.id } }">
                          <el-image :src="item.img" style="width:100%;height:auto;"></el-image>
                        </router-link>
                      </figure>
                      <!-- <div class="btn-box">
                        <a href="shopping-checkout.html">Add to cart</a>
                      </div> -->
                    </div>
                    <div class="lower-content">
                      <h4 class="name">
                        <router-link tag="a" :to="{ name: 'ShopDetail', query: { spu_id: item.id } }">{{ item.title }}</router-link>
                      </h4>
                      <div class="rating">
                        <span>{{item.pv }}浏览量</span>
                      </div>
                      <div class="price">
                        最低价￥ {{item.price}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Sidebar Side-->
          <div
            class="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12"
          >
            <aside class="sidebar theiaStickySidebar">
              <div class="sticky-sidebar">
                <!-- Search Widget -->
                <div class="sidebar-widget search-widget">
                  <div class="form-group">
                    <el-input v-model="searchMap.keyword" name="search-field" placeholder="Product keyword"></el-input>
                    <el-button @click="fetchData">
                      <span class="icon fa fa-search"></span>
                    </el-button>
                  </div>
                </div>
                <!-- Cart Widget -->
                <cart />
                <!-- Range Slider Widget -->
                <div class="sidebar-widget rangeslider-widget">
                  <div class="widget-content">
                    <h3 class="widget-title">Price Filter</h3>
                    <div class="range-slider-one clearfix">
                      <div class="price-range-slider"></div>
                      <div class="clearfix">
                        <div class="pull-left input-box">
                          <div class="title">
                            Price: {{ searchMap.priceRange[0] }} -- {{ searchMap.priceRange[1] }}
                          </div>
                        </div>
                        <br>
                        <el-slider
                                v-model="searchMap.priceRange"
                                range
                                show-stops
                                :min="0"
                                :max="100"
                                :step="0.1"
                                class="property-amount"
                              />
                        <div class="pull-right btn-box">
                          <a class="theme-btn"  @click="fetchData">
                            <span class="btn-title">Filtter</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Tags Widget -->
                <div class="sidebar-widget tags-widget">
                  <h3 class="widget-title">Cates</h3>
                  <ul class="tag-list clearfix">
                    <li v-for="item in catesList"
                      :key="item.id"
                      :disabled="item.data_flag===0"
                      >
                      <a @click="findByCate(item.id)" :style="item.data_flag===0?'background-color: #d5d7d4':''">{{ item.title }}</a>
                    </li>
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
    <footer class="main-footer style-seven">
      <div class="shape_wrapper wave_up">
        <div
          class="shape_inner"
          style="background-image: url(@static/images/background/5.jpg);"
        >
          <div class="overlay"></div>
        </div>
      </div>
      <!--Widgets Section-->
      <div class="widgets-section">
        <div class="auto-container">
          <div class="row">
            <!--Footer Column-->
            <div class="footer-column col-lg-4 col-md-12 col-sm-12">
              <div class="footer-widget social-widget">
                <div class="widget-title">
                  <h3>Our Contacts</h3>
                  <svg viewbox="0 0 850.4 410.3">
                    <path
                      d="M351.6,300.8c45.5,20.8,90.4,42.8,136.4,62.5c23,9.8,43.7,15,68.7,16.8c24.2,1.7,26.9-11.4,47.7-17.2 c36.4-10.2,50.6,30.7,12.4,39.4c-47,10.7-90.1,11.7-135.8-5.3c-43.6-16.2-84-40.4-125.5-61.1c-19.3-9.6-41-21.4-63.2-19.4 c-25.3,2.3-48.4,14.1-74.3,15.3c-33.4,1.5-101.6-4.4-107.8-47.3c-8-55.4,62.8-44,94.4-37.5c27.8,5.7,54.3,16.5,81.9,22 c27.9,5.7,49.2-4.2,74.5-15.3c49.2-21.6,108.5-37,152.6-67.4c-73-44.3-144.1-91.2-222.1-126.4c-68.4-30.9-157.2-64-226-12.7 c-11.1,8.3-20.3,19.6-26,32.2c-6.4,14-2.7,29.4-7.8,42.9C27.4,133.4,16,141,4.9,129.5c-10.1-10.4-2-33.4,2.1-44.6 C28.2,27.4,86.9,0.5,145,0c78.1-0.7,153.1,31.3,222.4,64.4c35.5,16.9,70.1,35.7,103.2,56.8c30.6,19.5,61.9,54.4,100.8,39.3 c68.6-26.4,131.4-75.9,210-57.7c57.6,13.4,99.3,84.7,40.5,125.7c-32.5,22.7-74.6,30.1-113.6,30c-42.6-0.1-77.9-19.1-117-32.7 c-41.5-14.4-84.9,10.2-124.1,24.2C448.9,256.6,351.9,281.1,351.6,300.8z M604.7,191.1c24.8,28.8,71.1,34.9,107.4,34.4 c31.8-0.4,94.3-7.9,110.4-41.2c23.9-49.5-49.1-56-77.9-51.8C695.1,139.9,649,169.4,604.7,191.1z M131.1,283.8 c25.5,27.4,91,30.7,122.6,7.1C212.6,263.8,153.1,259.8,131.1,283.8z"
                    ></path>
                  </svg>
                </div>
                <div class="text-box">
                  <p>
                    250 Biscayne Blvd. (North) 11st Floor <br />New World Tower
                    Miami, Florida 33148
                  </p>
                  <p><a href="tel:305-333-5522">(305) 333-5522</a></p>
                  <p>
                    <a href="mailto:info@your-site.com">info@your-site.com</a>
                  </p>
                </div>
                <div class="social-box">
                  <ul class="social-icon-two">
                    <li>
                      <a href="#"><span class="fab fa-facebook-f"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-pinterest-p"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-twitter"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-instagram"></span></a>
                    </li>
                    <li>
                      <a href="#"><span class="fab fa-dribbble"></span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--Footer Column-->
            <div class="footer-column col-lg-4 col-md-12 col-sm-12">
              <div class="footer-widget gallery-widget">
                <div class="widget-title">
                  <h3>Made For You</h3>
                  <svg viewbox="0 0 850.4 410.3">
                    <path
                      d="M351.6,300.8c45.5,20.8,90.4,42.8,136.4,62.5c23,9.8,43.7,15,68.7,16.8c24.2,1.7,26.9-11.4,47.7-17.2 c36.4-10.2,50.6,30.7,12.4,39.4c-47,10.7-90.1,11.7-135.8-5.3c-43.6-16.2-84-40.4-125.5-61.1c-19.3-9.6-41-21.4-63.2-19.4 c-25.3,2.3-48.4,14.1-74.3,15.3c-33.4,1.5-101.6-4.4-107.8-47.3c-8-55.4,62.8-44,94.4-37.5c27.8,5.7,54.3,16.5,81.9,22 c27.9,5.7,49.2-4.2,74.5-15.3c49.2-21.6,108.5-37,152.6-67.4c-73-44.3-144.1-91.2-222.1-126.4c-68.4-30.9-157.2-64-226-12.7 c-11.1,8.3-20.3,19.6-26,32.2c-6.4,14-2.7,29.4-7.8,42.9C27.4,133.4,16,141,4.9,129.5c-10.1-10.4-2-33.4,2.1-44.6 C28.2,27.4,86.9,0.5,145,0c78.1-0.7,153.1,31.3,222.4,64.4c35.5,16.9,70.1,35.7,103.2,56.8c30.6,19.5,61.9,54.4,100.8,39.3 c68.6-26.4,131.4-75.9,210-57.7c57.6,13.4,99.3,84.7,40.5,125.7c-32.5,22.7-74.6,30.1-113.6,30c-42.6-0.1-77.9-19.1-117-32.7 c-41.5-14.4-84.9,10.2-124.1,24.2C448.9,256.6,351.9,281.1,351.6,300.8z M604.7,191.1c24.8,28.8,71.1,34.9,107.4,34.4 c31.8-0.4,94.3-7.9,110.4-41.2c23.9-49.5-49.1-56-77.9-51.8C695.1,139.9,649,169.4,604.7,191.1z M131.1,283.8 c25.5,27.4,91,30.7,122.6,7.1C212.6,263.8,153.1,259.8,131.1,283.8z"
                    ></path>
                  </svg>
                </div>
                <div class="instagram-gallery">
                  <div class="outer-box clearfix">
                    <figure class="image">
                      <a
                        href="@static/images/resource/gw-7.jpg"
                        class="lightbox-image"
                        data-fancybox="instagram"
                        ><img src="@static/images/resource/gw-7.jpg" alt=""
                      /></a>
                    </figure>
                    <figure class="image">
                      <a
                        href="@static/images/resource/gw-8.jpg"
                        class="lightbox-image"
                        data-fancybox="instagram"
                        ><img src="@static/images/resource/gw-8.jpg" alt=""
                      /></a>
                    </figure>
                    <figure class="image">
                      <a
                        href="@static/images/resource/gw-9.jpg"
                        class="lightbox-image"
                        data-fancybox="instagram"
                        ><img src="@static/images/resource/gw-9.jpg" alt=""
                      /></a>
                    </figure>
                    <figure class="image">
                      <a
                        href="@static/images/resource/gw-10.jpg"
                        class="lightbox-image"
                        data-fancybox="instagram"
                        ><img src="@static/images/resource/gw-10.jpg" alt=""
                      /></a>
                    </figure>
                    <figure class="image">
                      <a
                        href="@static/images/resource/gw-11.jpg"
                        class="lightbox-image"
                        data-fancybox="instagram"
                        ><img src="@static/images/resource/gw-11.jpg" alt=""
                      /></a>
                    </figure>
                    <figure class="image">
                      <a
                        href="@static/images/resource/gw-12.jpg"
                        class="lightbox-image"
                        data-fancybox="instagram"
                        ><img src="@static/images/resource/gw-12.jpg" alt=""
                      /></a>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <!--Footer Column-->
            <div class="footer-column col-lg-4 col-md-12 col-sm-12">
              <div class="footer-widget contact-widget">
                <div class="widget-title">
                  <h3>Order Your Sweet</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewbox="0 0 850.4 410.3"
                  >
                    <path
                      d="M351.6,300.8c45.5,20.8,90.4,42.8,136.4,62.5c23,9.8,43.7,15,68.7,16.8c24.2,1.7,26.9-11.4,47.7-17.2 c36.4-10.2,50.6,30.7,12.4,39.4c-47,10.7-90.1,11.7-135.8-5.3c-43.6-16.2-84-40.4-125.5-61.1c-19.3-9.6-41-21.4-63.2-19.4 c-25.3,2.3-48.4,14.1-74.3,15.3c-33.4,1.5-101.6-4.4-107.8-47.3c-8-55.4,62.8-44,94.4-37.5c27.8,5.7,54.3,16.5,81.9,22 c27.9,5.7,49.2-4.2,74.5-15.3c49.2-21.6,108.5-37,152.6-67.4c-73-44.3-144.1-91.2-222.1-126.4c-68.4-30.9-157.2-64-226-12.7 c-11.1,8.3-20.3,19.6-26,32.2c-6.4,14-2.7,29.4-7.8,42.9C27.4,133.4,16,141,4.9,129.5c-10.1-10.4-2-33.4,2.1-44.6 C28.2,27.4,86.9,0.5,145,0c78.1-0.7,153.1,31.3,222.4,64.4c35.5,16.9,70.1,35.7,103.2,56.8c30.6,19.5,61.9,54.4,100.8,39.3 c68.6-26.4,131.4-75.9,210-57.7c57.6,13.4,99.3,84.7,40.5,125.7c-32.5,22.7-74.6,30.1-113.6,30c-42.6-0.1-77.9-19.1-117-32.7 c-41.5-14.4-84.9,10.2-124.1,24.2C448.9,256.6,351.9,281.1,351.6,300.8z M604.7,191.1c24.8,28.8,71.1,34.9,107.4,34.4 c31.8-0.4,94.3-7.9,110.4-41.2c23.9-49.5-49.1-56-77.9-51.8C695.1,139.9,649,169.4,604.7,191.1z M131.1,283.8 c25.5,27.4,91,30.7,122.6,7.1C212.6,263.8,153.1,259.8,131.1,283.8z"
                    ></path>
                  </svg>
                </div>
                <div class="footer-form">
                  <form action="#" method="post" id="email-form">
                    <div class="form-group">
                      <div class="response"></div>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="username"
                        class="username"
                        placeholder="Your Name *"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        class="email"
                        placeholder="Your Email *"
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        name="contact_message"
                        placeholder="Text Message"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <button
                        class="theme-btn"
                        type="button"
                        id="submit"
                        name="submit-form"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Footer Bottom-->
      <div class="footer-bottom">
        <div class="auto-container">
          <div class="copyright-text">
            <p>Bellaria - A Delicious Cakes and Bakery WordPress Theme</p>
          </div>
        </div>
      </div>
    </footer>
    <!-- End Footer -->
  </div>
</template>
<script>
import productCatesApi from '@/api/productCate'
import productSpusApi from '@/api/productSpu'
import cart from '@/views/Shop/cart'
// import {mapState} from 'vuex'
export default {
  name: 'Shop',
  components: { cart },
  data () {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        cate_id: 1,
        ord: 'price',
        by: 'desc',
        priceRange: [1, 50]
      },
      catesList: [],
      ordList: [
        { label: '按价格', value: 'price' },
        { label: '按折扣', value: 'discount' },
        { label: '按上架时间', value: 'created_at' },
        { label: '按访问数', value: 'pv' }
      ],
      byList: [
        { label: '从上到下', value: 'desc' },
        { label: '从下到上', value: 'asc' }
      ]
    }
  },
  created () {
    this.getProductCates()
    this.fetchData()
  },
  methods: {
    fetchData () {
      console.log(this.searchMap)
      productSpusApi.searchPage(this.searchMap, this.page, this.pageSize).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
        console.log(this.list)
      })
    },
    getProductCates () {
      productCatesApi.findAll().then(res => {
        this.catesList = res.data
      })
    },
    findByCate (id) {
      this.searchMap.cate_id = id
      this.fetchData()
    }
  }
}
</script>
<style scoped>
.range-slider-one .title:before {
    position: absolute;
    content: '￥';
    right: -14px;
    top: 0px;
    color: #848484;
    font-size: 16px;
    font-weight: 300;
}
.tag-list li {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
}
</style>
