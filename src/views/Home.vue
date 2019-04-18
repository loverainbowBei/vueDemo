<template>
  <div>
    主页已经跳到舍得
  </div>
</template>
<script>
//引入请求用户列表的接口
import {getUserList} from '@/api'
export default {
  mounted(){
    let params = {params: {query: '', pagenum: 1, pagesize: 1}} //由于请求函数需要传递一个参数
    getUserList(params).then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

</style>

