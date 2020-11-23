<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="login-avatar">
        <img src="~@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单数据 -->
      <el-form
        :model="loginForm"
        class="login-form"
        @submit.prevent.native="login"
      >
        <el-form-item>
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$api.login(this.loginForm)
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
        this.$router.push('/home')
      }
      // console.log(res)
    }
  },
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #22496d;

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .login-avatar {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      padding: 10px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #eee;

      img {
        width: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }

    .login-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;

      .btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>