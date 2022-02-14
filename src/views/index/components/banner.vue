<template>
  <div class="carousel">
      <el-carousel :interval="2000" type="card" height="400px" >
        <el-carousel-item v-for="item in imgUrl" :key="item">
        <el-image
            style="width:100%;height:400px;"
            :src="item"
            fit="contain"
            :preview-src-list="imgUrl">
        </el-image>
        </el-carousel-item> 
    </el-carousel>
  </div>
</template>

<script>
export default {
    data(){
        return {
            imgUrl:[],
        }
    },
    created(){
        let imgUrl=['iu1.jpeg','nana1.jpeg','yuner1.jpeg','iu2.jpeg','yuner2.jpeg','nana2.jpg']
        for(let i=0;i<imgUrl.length;i++){
            this.imgUrl[i]=require('assets/'+imgUrl[i])
        }
    }
}
</script>

<style lang="scss" scoped>
</style>