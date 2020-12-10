<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-button
        type="primary"
        style="margin-bottom: 15px"
        @click="showAddDialog"
      >
        添加角色
      </el-button>
      <el-table :data="rolesList" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
              type="flex"
              align="middle"
              :class="['bb', i1 === 0 ? 'bt' : '']"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag
                  type="primary"
                  closable
                  @close="delRoleRights(scope.row.id, item1.id)"
                >
                  {{ item1.authName }}
                  <i class="el-icon-caret-right"></i>
                </el-tag>
              </el-col>

              <!-- 二级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                  :class="[i2 === 0 ? '' : 'bt']"
                  type="flex"
                >
                  <el-col :span="5">
                    <el-tag
                      type="success"
                      closable
                      @close="delRoleRights(scope.row.id, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <!-- 三级权限 -->
                  <el-col :span="19">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="delRoleRights(scope.row.id, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="180px">
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
              @click="delRole(scope.row)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
                @click="showSetRightsDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog title="提示" :visible.sync="addDialogVisible" width="30%" center>
      <el-form
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
        ref="addFormRef"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="setRightsDialogVisible"
      width="30%"
      center
      @close="setRightDialogClosed"
    >
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        :props="treeProps"
        default-expand-all
        :default-checked-keys="defaultKeys"
        ref="treeRefs"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    let checkRoleName = (rule, value, callback) => {
      // console.log(value.trim())
      if (value.trim().length !== 0) return callback()
      callback(new Error('请输入合法角色名'))
    }
    return {
      rolesList: [],
      addDialogVisible: false,
      addForm: {},
      addFormRules: {
        roleName: [
          { required: true, validator: checkRoleName, trigger: 'blur' },
        ]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        roleName: [
          { required: true, validator: checkRoleName, trigger: 'blur' },
        ]
      },
      setRightsDialogVisible: false,
      // 树形所有权限的数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认勾选的节点的 key 的数组
      defaultKeys: [],
      // 要分配权限的id值
      roleId: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const res = await this.$api._getRolesList()
      if (res.meta.status !== 200) return
      this.rolesList = res.data
      // console.log(res)
    },
    showAddDialog () {
      this.addDialogVisible = !this.addDialogVisible
    },
    async addRole () {
      const res = await this.$api._addRole(this.addForm)
      if (res.meta.status !== 201) return
      this.$message.success(res.meta.msg)
      this.addDialogVisible = !this.addDialogVisible
      this.getRolesList()
      // console.log(res)
    },
    async showEditDialog (id) {
      this.editDialogVisible = !this.editDialogVisible
      const res = await this.$api._getRoleInfo(id)
      if (res.meta.status !== 200) return
      this.editForm = res.data
      // console.log(res)
    },
    async updateRoleInfo () {
      const res = await this.$api._updateRoleInfo(this.editForm.roleId, this.editForm)
      if (res.meta.status !== 200) return
      this.$message.success(res.meta.msg)
      this.editDialogVisible = !this.editDialogVisible
      this.getRolesList()
      // console.log(res)
    },
    delRole (rowdata) {
      this.$confirm(`此操作将永久删除角色${rowdata.roleName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$api._delRole(rowdata.id)
        if (res.meta.status !== 200) return
        this.$message.success(res.meta.msg)
        this.getRolesList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async showSetRightsDialog (rowdata) {
      const res = await this.$api._getRightsList('tree')
      if (res.meta.status !== 200) return
      this.rightsList = res.data
      // console.log(res)
      // console.log(rowdata)
      this.roleId = rowdata.id
      this.getLeafKeys(rowdata, this.defaultKeys)
      this.setRightsDialogVisible = !this.setRightsDialogVisible
    },
    // 通过递归方式获取角色下所有三级权限的id，并保存到defaultKeys中
    getLeafKeys (node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 分配权限
    async setRights () {
      const keys = [
        ...this.$refs.treeRefs.getCheckedKeys(),
        ...this.$refs.treeRefs.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      // console.log(idStr)
      const res = await this.$api._RoleRights(this.roleId, idStr)
      if (res.meta.status !== 200) return
      this.$message.success(res.meta.msg)
      this.getRolesList()
      this.setRightsDialogVisible = !this.setRightsDialogVisible
      // console.log(res)
    },
    async delRoleRights (roleId, rightId) {
      // console.log(roleId)
      // console.log(rightId)
      const res = await this.$api._delRoleRights(roleId, rightId)
      if (res.meta.status !== 200) return
      this.$message.success(res.meta.msg)
      this.getRolesList()
      // console.log(res)
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed () {
      this.defaultKeys = []
    }
  }
}
</script>

<style lang="less" scoped>
.bt {
  border-top: 1px solid #eee;
}

.bb {
  border-bottom: 1px solid #eee;
}

.el-tag {
  margin: 6px;
}
</style>