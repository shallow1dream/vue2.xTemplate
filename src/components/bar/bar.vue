<template>
  <div>
    <div class="bar">
      <div class="left">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1">主页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">歌手/演员</template>
            <el-menu-item index="2-1">1</el-menu-item>
            <el-menu-item index="2-2">2</el-menu-item>
            <el-menu-item index="2-3">3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="4">啦啦啦啦</el-menu-item>
        </el-menu>
      </div>
      <div class="center">
        <!-- <el-input v-model="input" placeholder="请输入内容" style="width:400px">
          </el-input> -->
        <el-autocomplete
          v-model="keyword"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          value-key="name"
          style="width:400px"
        ></el-autocomplete>
      </div>
      <div class="right">
        <el-dropdown placement="bottom">
          <svg-icon icon-class="user" className="user" @click="true"></svg-icon>
          <el-dropdown-menu slot="dropdown">
            <div class="detail">
              <div class="header"></div>
              <div class="tail">
                <el-button type="primary" size="mini" @click="logOut"
                  >退出登录</el-button
                >
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <span style="padding-left: 10px">{{ $store.state.user.account }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1", //默认值menu
      keyword: "",
    };
  },
  methods: {
    querySearchAsync(keyword, cb) {
      this.$http({
        url: "getSelName",
        method: "post",
        data: {
          keyword,
        },
      })
        .then((result) => {
          cb(result);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    handleSelect(item) {
      console.log(item);
    },
    logOut() {
      //退出登录
      this.$http({
        url: "logout",
      })
        .then((result) => {
          this.$store.commit("logOut");
          this.$router.push("/login");
          this.$message({
            message: "退出成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 60px;
  z-index: 1001;
  position: sticky;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 0;
  border-bottom: 1px solid #dcdfe6;
  .user {
    width: 32px;
    height: 32px;
  }
  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.el-menu-demo {
  border-bottom: 0;
}
.el-dropdown-menu {
  width: 200px;
  .detail {
    width: 100%;
    height: 300px;
    .header {
      height: 250px;
    }
    .tail {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
