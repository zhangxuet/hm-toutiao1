<template>
    <div class="container">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="formLogin" :model="formLogin" :rules="loginRules" class="form" status-icon>
                <el-form-item prop="mobile">
                    <el-input v-model="formLogin.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="formLogin.code" placeholder="请输入验证码" style="width: 266px;margin-right:10px"></el-input>
                    <el-button>验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="checkLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    var checkLogin = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号错误'))
      }
      callback()
    }
    return {
      formLogin: {
        mobile: '16111111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: checkLogin, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkLogin () {
      this.$refs.formLogin.validate(valid => {
        if (valid) {
          this.$http.post('/authorizations', this.formLogin)
            .then(res => {
              store.setUser(res.data.data)
              this.$router.push('/')
            //   alert('登陆成功')
            })
            .catch(err => {
              return console.log(err)
            })
        } else {
          this.$message.error('手机号或验证码错误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .my-card{
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img {
            width: 220px;
            display: block;
            margin: auto;
        }
        .form {
            margin-top: 20px;
        }
    }
}
</style>
