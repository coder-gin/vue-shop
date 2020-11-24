<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="login-avatar">
        <img src="~@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单数据 -->
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        @submit.prevent.native="login"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // 
        const res = await this.$api.login(this.loginForm)
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          this.$router.push('/home')
          // 将登录成功之后的token保存在sessionStorage中
          window.sessionStorage.setItem('token', res.data.token)
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    // 重置登录表单，将其值重置为初始值并移除校验结果
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    }
  }
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