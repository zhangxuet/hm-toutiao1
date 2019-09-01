import MyBread from '@/components/bread'
import MyChannel from '@/components/my-channel'
import MyPublic from '@/components/my-public'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyPublic.name, MyPublic)
  }
}
