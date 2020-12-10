<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="@/assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout" type="info">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333645"
          text-color="#fff"
          active-text-color="#2095FF"
          unique-opened
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="'' + submenu.order"
            v-for="submenu in menus"
            :key="submenu.id"
          >
            <template slot="title">
              <i :class="icons[submenu.id]"></i>
              <span>{{ submenu.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="item.path"
              v-for="item in submenu.children"
              :key="item.id"
              @click="saveMenuState(item.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: [],
      icons: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      // 左侧菜单激活时的路径
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取左侧菜单列表
    async getMenuList () {
      const res = await this.$api._getMenuList()
      if (res.meta.status !== 200) return
      this.menus = res.data
      // console.log(res)
    },
    // 控制左侧菜单的折叠
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveMenuState (activePath) {
      // console.log(activePath)
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #353d42;
    color: #fff;
    padding-left: 0;

    div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
        font-size: 20px;
      }
    }
  }

  .el-aside {
    height: 100%;
    background-color: #333645;

    .el-menu {
      border-right: none;
    }

    .toggle-button {
      letter-spacing: 2px;
      background-color: #4a4e65;
      color: #fff;
      text-align: center;
    }

    .iconfont {
      margin-right: 10px;
    }
  }

  .el-main {
    background-color: #eaedf2;
  }
}
</style>