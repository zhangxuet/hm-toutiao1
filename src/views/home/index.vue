<template>
    <el-container class="container">
        <el-aside :width="isCollapse?'64px': '200px'" class="aside" v-model="isCollapse">
            <div class="logo" :class="{minilogo: isCollapse}"></div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo el-menu"
                background-color="#002233" text-color="#fff" active-text-color="#ffd04b" router>
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/articles">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="/picture">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="/content">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="/comment">
                    <i class="el-icon-chat-line-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="content">
                    <span class="el-icon-s-fold" @click="fold"></span>
                    <span class="cont">江苏传智播客科技教育有限公司</span>
                    <span class="user">
                        <el-dropdown @command="clickItem">
                            <span class="el-dropdown-link">
                                <img :src="photo" alt=""> {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="dropdown">
                                <div><el-dropdown-item class="el-icon-setting" command="setting"> 个人设置</el-dropdown-item></div>
                                <el-dropdown-item class="el-icon-unlock" command="logout"> 退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import eventBus from '@/eventBus'
import store from '@/store'
export default {
  created () {
    var user = store.getUser()
    this.name = user.name
    this.photo = user.photo

    eventBus.$on('updateName', (name) => {
      this.name = name
    })
    eventBus.$on('updatePhoto', (photo) => {
      this.photo = photo
    })
  },
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    fold () {
      this.isCollapse = !this.isCollapse
    },
    clickItem (command) {
      this[command]()
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .aside {
        background: #002233;
        .logo{
        background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px;
        height: 60px;
        }
        .minilogo{
            background-image: url(../../assets/images/logo_admin_01.png);
            background-size: 40px
        }
        .el-menu {
            border-right: none
        }
    }
    .content{
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        .el-icon-s-fold{
            font-size: 24px;
            vertical-align: middle;
        }
        .cont {
            vertical-align: middle;
        }
    }
    .user{
        float: right;
        img {
            width: 30px;
            vertical-align: middle;
        }
        .dropdown{
            vertical-align: middle;
        }
    }
}
</style>
