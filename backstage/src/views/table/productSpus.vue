<template>
  <div class="app-container">
    <div v-if="cates.title" align="center" style="color:red;font-size:40px">
      所属分栏名称：{{ cates.title }}
    </div>
    <br>
    <el-button v-if="!cates.title" type="primary" @click="searchDrawer=true">条件查询</el-button>
    <el-button type="primary" @click="handleSave">添加</el-button>
    <el-drawer
      title="条件查询"
      :visible.sync="searchDrawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form :model="searchMap" label-position="left" label-width="80px" size="mini" style="padding:20px">
        <el-form-item label="标题">
          <el-input v-model="searchMap.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchMap.cate_id" placeholder="分类">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="searchMap.keyword" placeholder="关键字" />
        </el-form-item>
        <el-form-item label="折扣范围">
          <div class="block">
            <el-slider
              v-model="searchMap.discountRange"
              range
              show-stops
              :min="0"
              :max="1"
              :step="0.01"
            />
          </div>
        </el-form-item>
        <el-form-item label="价格范围">
          <div class="block">
            <el-slider
              v-model="searchMap.priceRange"
              range
              show-stops
              :min="0"
              :max="100"
              :step="0.1"
            />
          </div>
        </el-form-item>
        <el-form-item label="生产时间">
          <el-date-picker
            v-model="searchMap.pdRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="过期时间">
          <el-date-picker
            v-model="searchMap.expdRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form>
    </el-drawer>
    <el-table :data="list" height="700">
      <el-table-column align="center" label="id" prop="id" width="180px" />
      <el-table-column align="center" label="标题" prop="title" width="180px">
        <template slot-scope="scope">
          <el-tag type="primary" disable-transitions>
            {{ scope.row.title }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" prop="desc" width="180px" />
      <el-table-column
        label="状态"
        prop="data_flag"
        width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="dataFlagType(scope.row.data_flag)"
            disable-transitions
          >{{ scope.row.data_flag | filterDataFlag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="关键字" prop="keyword" width="180px" />
      <el-table-column align="center" label="图片" width="300px">
        <template slot-scope="scope">
          <el-image :src="scope.row.img">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="折扣" prop="discount" width="180px" />
      <el-table-column align="center" label="最低价" prop="price" width="180px" />
      <el-table-column align="center" label="浏览量" prop="pv" width="180px" />
      <el-table-column align="center" label="生产时间" prop="pd" width="220px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.pd | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效时间" prop="expd" width="220px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.expd | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="created_at" width="220px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" prop="updated_at" width="220px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated_at | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.data_flag===0" type="success" size="small" @click="putOn(scope.row.id)">上架</el-button>
          <el-button v-else type="danger" size="small" @click="deleteById(scope.row.id)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="fetchData"
      @current-change="fetchData"
    />
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="pojo" label-position="left" :model="pojo" label-width="80px" size="mini" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="pojo.title" placeholder="标题" style="width: 80%;" />
        </el-form-item>
        <el-form-item label="分类" prop="cate_id">
          <el-select v-model="pojo.cate_id" placeholder="分类" @change="getKeys(pojo.cate_id)">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="pojo.desc" type="textarea" placeholder="描述" style="width: 80%;" />
        </el-form-item>
        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="pojo.keyword" placeholder="英文逗号分隔" style="width: 80%;" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3001/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="img"
          >
            <img v-if="pojo.img?true:showimg" :src="pojo.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="生产时间" prop="pd">
          <el-date-picker
            v-model="pojo.pd"
            type="datetime"
            value-format="yy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="过期时间" prop="expd">
          <el-date-picker
            v-model="pojo.expd"
            type="datetime"
            value-format="yy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input-number v-model="pojo.discount" :precision="2" :max="1" :min="0" placeholder="折扣" style="width: 80%;" />
        </el-form-item>
        <el-form-item label="显示最低价" prop="price">
          <el-input-number v-model="pojo.price" :precision="2" placeholder="显示最低价" style="width: 80%;" />
        </el-form-item>
        <el-form-item
          v-for="(v,k) in skus"
          :key="v.key"
          :label="'sku '+k"
          :rules="{
            required: true, message: '不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="v.price" style="width: 20%" placeholder="价格" />
          <el-input v-model="v.stock" style="width: 20%;" placeholder="库存" />
          <el-button type="danger" @click.prevent="removeSku(k)">删除SKU</el-button>
          <br>
          <el-select v-model="v.attribute_list.size" placeholder="尺寸" style="width: 20%" @change="handleChangeKey(v.attribute_list)">
            <el-option
              v-for="item1 in keysList"
              :key="item1.id"
              :value="item1.id"
              :label="item1.title"
            />
          </el-select>
          <el-select v-if="v.attribute_list.size" v-model="v.attribute_list.height" placeholder="高度" style="width: 20%" @change="handleChangeValue(v.attribute_list)">
            <el-option
              v-for="item1 in valuesList"
              :key="item1.id"
              :label="item1.value"
              :value="item1.id"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" @click.prevent="addSku">添加SKU</el-button>
        <el-button type="success" size="small" @click="saveOrUpdate('pojo')">确定</el-button>
        <el-button type="primary" size="small" @click="dialogVisible =false ">取消</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import productCateApi from '@/api/productCate'
import productSpuApi from '@/api/productSpu'
import propertyKeyApi from '@/api/propertyKey'
export default {
  name: 'ProductSpus',
  filters: {
    filterDataFlag(value) {
      switch (value) {
        case 1: return '上架'
        case 0: return '下架'
      }
    },
    formatterDate(value) {
      return new Date(value).toLocaleString()
    }
  },
  data() {
    return {
      list: [],
      searchDrawer: false,
      dialogVisible: false,
      cates: { id: 0 },
      cateList: [],
      pojo: {},
      searchMap: {},
      page: 1,
      pageSize: 10,
      total: 0,
      valuesList: [],
      keysList: [],
      title: '编辑',
      showimg: false,
      skus: [{
        price: '',
        stock: '',
        attribute_list: {
          size: '',
          sizeTitle: '',
          height: '',
          heightTitle: ''
        },
        key: ''
      }],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ],
        discount: [
          { required: true, message: '请输入折扣', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入最低价', trigger: 'blur' }
        ],
        pd: [
          { required: true, message: '请输入生产日期', trigger: 'blur' }
        ],
        expd: [
          { required: true, message: '请输入过期日期', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.cates.id = this.$route.query.cate_id !== undefined ? this.$route.query.cate_id : 0
    if (this.cates.id !== 0) {
      this.fetchDataByCateId()
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchDataByCateId() {
      productCateApi.getSpus(this.cates.id).then(res => {
        console.log(res.data)
        this.list = res.data.spus
        this.cates = res.data.cates
      })
      this.getAllCate()
    },
    fetchData() {
      productSpuApi.searchPage(this.searchMap, this.page, this.pageSize).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
      this.getAllCate()
    },
    getAllCate() {
      productCateApi.findAll().then(res => {
        this.cateList = res.data
      })
    },
    getValues(id) {
      propertyKeyApi.findById(id).then(res => {
        this.valuesList = res.data.values
      })
    },
    getKeys(cate_id) {
      propertyKeyApi.findByCateId(cate_id).then(res => {
        this.keysList = res.data
      })
    },
    dataFlagType(data_flag) {
      if (data_flag === 1) {
        return 'success'
      } else {
        return 'danger'
      }
    },
    handleEdit(id) {
      this.title = '编辑'
      productSpuApi.getSkus(id).then(res => {
        this.pojo = res.data.spu
        this.skus = res.data.skus.length === 0 ? this.skus : res.data.skus
        this.skus.forEach(element => {
          element.attribute_list = JSON.parse(element.attribute_list)
        })
        this.getKeys(this.pojo.cate_id)
        this.getValues(this.skus[0].attribute_list.size)
      })
      this.dialogVisible = true
    },
    handleSave() {
      this.title = '保存'
      this.pojo = {}
      this.skus = [{
        price: '',
        stock: '',
        attribute_list: {
          size: '',
          sizeTitle: '',
          height: '',
          heightTitle: ''
        },
        key: ''
      }]
      this.valuesList = []
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    },
    handleChangeKey(attribute_list) {
      var obj = this.keysList.find(item => {
        return item.id === attribute_list.size
      })
      attribute_list.sizeTitle = obj.title
      this.getValues(attribute_list.size)
    },
    handleChangeValue(attribute_list) {
      var obj = this.valuesList.find(item => {
        return item.id === attribute_list.height
      })
      attribute_list.heightTitle = obj.value
      this.getValues(attribute_list.size)
    },
    saveOrUpdate(pojo) {
      console.log(this.skus)
      this.skus.forEach(element => {
        element.attribute_list = JSON.stringify(element.attribute_list)
      })
      this.pojo.skus = this.skus
      console.log(this.pojo)
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          if (this.title === '保存') {
            productSpuApi.save(this.pojo).then((res) => {
              if (res.flag) {
                this.fetchData()
                this.dialogVisible = false
              }
              this.$message({
                message: res.message,
                type: res.flag ? 'success' : 'error'
              })
            })
          } else {
            productSpuApi.updateById(this.pojo.id, this.pojo).then((res) => {
              if (res.flag) {
                this.fetchData()
                this.dialogVisible = false
              }
              this.$message({
                message: res.message,
                type: res.flag ? 'success' : 'error'
              })
            })
          }
        }
      })
      this.skus = [{
        price: '',
        stock: '',
        attribute_list: {
          size: '',
          sizeTitle: '',
          height: '',
          heightTitle: ''
        },
        key: ''
      }]
      this.valuesList = []
    },
    removeSku(index) {
      if (index !== 0) {
        this.skus.splice(index, 1)
      } else {
        this.$message({
          message: '一个Spu里有一个sku',
          type: 'error'
        })
      }
    },
    addSku() {
      this.skus.push({
        price: '',
        stock: '',
        attribute_list: {
          size: '',
          height: ''
        },
        key: Date.now()
      })
    },
    putOn(id) {
      this.$confirm('确认上架吗？')
        .then(_ => {
          productSpuApi.putOn(id).then(res => {
            if (res.flag) {
              this.fetchData()
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        })
        .catch(_ => {})
    },
    deleteById(id) {
      this.$confirm('确认下架吗？连同子级同样一起下架')
        .then(_ => {
          productSpuApi.deleteById(id).then(res => {
            if (res.flag) {
              this.fetchData()
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        })
        .catch(_ => {})
    },
    handleAvatarSuccess(res) {
      this.pojo.img = res.info
      this.$nextTick(() => {
        this.showimg = true
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或png!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
