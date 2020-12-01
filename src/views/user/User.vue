<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button
              icon="el-icon-search"
              slot="append"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="userList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="updateUserState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delUser(scope.row)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="30%"
      center
    >
      <el-form
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
        ref="editFormRef"
      >
        <el-form-item label="姓名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户对话框 -->
    <el-dialog title="提示" :visible.sync="addDialogVisible" width="30%" center>
      <el-form
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
        ref="addFormRef"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // 手机号验证
    let checkMobile = (rule, value, callback) => {
      const mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (mobileReg.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }

    // 邮箱验证
    let checkEmail = (rule, value, callback) => {
      const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (emailReg.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    return {
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 2
      },
      // 用户数据
      userList: [],
      // 总数
      total: 0,
      editDialogVisible: false,
      // 编辑对话框表单数据
      editForm: {},
      // 编辑表单的验证规则
      editFormRules: {
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      // 添加用户表单数据
      addForm: {},
      // 添加用户表单数据验证
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],

      },
      addDialogVisible: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const res = await this.$api._getUsersList(this.queryInfo)
      if (res.meta.status !== 200) return
      this.userList = res.data.users
      this.total = res.data.total
      // console.log(res)
    },
    // 控制用户状态改变
    async updateUserState (rowdata) {
      // console.log(rowdata)
      const res = await this.$api._updateUserState(rowdata.id, rowdata.mg_state)
      if (res.meta.status !== 200) return
      this.$message.success(res.meta.msg)
      // console.log(res)
    },
    // 监听每页显示条数的改变
    handleSizeChange (pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getUserList()
    },
    // 监听当前页码的改变
    handleCurrentChange (pagenum) {
      this.queryInfo.pagenum = pagenum
      this.getUserList()
    },
    // 删除角色
    delUser (rowdata) {
      console.log(rowdata)
      this.$confirm(`此操作将永久删除用户${rowdata.username}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$api._delUser(rowdata.id)
        if (res.meta.status !== 200) return
        this.$message.success(res.meta.msg)
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 展示编辑对话框
    async showEditDialog (id) {
      this.editDialogVisible = !this.editDialogVisible
      const res = await this.$api._getUserInfo(id)
      if (res.meta.status !== 200) return
      this.editForm = res.data
      // console.log(res)
    },
    // 更新用户信息
    updateUserInfo () {
      this.editDialogVisible = !this.editDialogVisible
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$api._updateUserInfo(this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) return
        this.$message.success(res.meta.msg)
        this.getUserList()
        // console.log(res)
      })
    },
    showAddDialog () {
      this.addDialogVisible = !this.addDialogVisible
    },
    addUser () {
      this.addDialogVisible = !this.addDialogVisible
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$api._addUser(this.addForm)
        if (res.meta.status !== 201) return
        this.$message.success(res.meta.msg)
        this.getUserList()
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  display: flex;
}
</style>