<template>
  <div class="main">
    <ul class="tree">
      <div class="star"></div>
      <li v-for="i in 128" :key="i" :style="'--i:' + i"></li>
    </ul>
    <div class="form">
      <div class="login">
        <p class="title">register</p>
        <!-- <div class="d">
                    <input type="text" class="e" placeholder="账号">
                    <input type="password" class="e" placeholder="密码">
                    <div class="f">GO</div>
                </div> -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="account" label-width="0">
            <!-- <el-input :model="ruleForm.account"></el-input> -->
            <input
              type="text"
              class="item"
              placeholder="账号"
              v-model="ruleForm.account"
            />
          </el-form-item>
          <el-form-item prop="password" label-width="0">
            <!-- <el-input :model="ruleForm.password"></el-input> -->
            <input
              type="password"
              class="item"
              placeholder="密码"
              v-model="ruleForm.password"
            />
          </el-form-item>
          <el-form-item prop="repassword" label-width="0">
            <!-- <el-input :model="ruleForm.password"></el-input> -->
            <input
              type="password"
              class="item"
              placeholder="确认密码"
              v-model="ruleForm.repassword"
            />
          </el-form-item>
          <el-form-item label-width="0">
            <div class="submit" @click="submitForm">注册</div>
          </el-form-item>
        </el-form>
        <div class="bot">
          没有账号?<router-link to="register" style="color: red"
            >register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        account: "admin",
        password: "111111",
        repassword: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    getNowFormatDate() { //获取当前时间 日期
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          date.getHours() +
          seperator2 +
          date.getMinutes() +
          seperator2 +
          date.getSeconds();
        return currentdate;
      },
    submitForm() {
       
      this.$refs.ruleForm.validate((valid) => {
        const { account, password ,repassword} = this.ruleForm;
        if (valid&&password===repassword) {
          const create_time= this.getNowFormatDate()
          this.$http({
            url: "/register",
            method: "post",
            data: {
              account,
              password,
              create_time,
              updata_time:create_time
            },
          })
            .then((resolve) => {
              this.$store.commit("rembAcc", account);
              console.log(this.$store.state.user.account);
              this.$router.push("/index");
            })
            .catch((err) => {
              this.$message.error(err);
            });
        } else {
          this.$message.error("密码与确认密码不一样")
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  height: calc(100vh);
  justify-content: center;
  align-items: center;
  background-color: rgb(54, 66, 70);
}

.tree {
  position: relative;
  width: 500px;
  height: 700px;
  display: flex;
  justify-content: center;
  margin-right: 10%;
}

.star {
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: rgb(236, 234, 167);
  z-index: 999;
  margin-bottom: 40px;
  clip-path: polygon(
    50% 0,
    65% 40%,
    100% 40%,
    72% 60%,
    85% 100%,
    50% 75%,
    15% 100%,
    28% 60%,
    0 40%,
    35% 40%
  );
}
.tree li {
  list-style: none;
  position: absolute;
  top: 25px;
  width: 2px;
  background: linear-gradient(rgba(46, 204, 113, 0), rgba(46, 204, 113, 0.25));
  transform-origin: 50% 0;
  animation: swing 4s ease-in-out infinite;
  height: calc(var(--i) * 4px);
  animation-delay: calc(var(--i) * -0.23s);
}
@keyframes swing {
  0%,
  100% {
    transform: rotate(-30deg);
  }
  5%,
  45% {
    opacity: 0.25;
  }
  0%,
  50%,
  100% {
    opacity: 1;
  }
  50% {
    transform: rotate(30deg);
  }
}
.tree li::before {
  content: "";
  position: absolute;
  left: -1px;
  bottom: 1px;
  width: 3px;
  height: 3px;
}
.tree li:nth-child(4n)::before {
  background-color: #d8334a;
}
.tree li:nth-child(4n + 1)::before {
  background-color: #ffce54;
}
.tree li:nth-child(4n + 2)::before {
  background-color: #2ecc71;
}
.tree li:nth-child(4n + 3)::before {
  background-color: #5d9cec;
}
.form {
  background-color: #fff;
  width: 350px;
  height: 500px;
  position: relative;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  top: -100px;
}
.login {
  width: 300px;
  height: 450px;
  overflow: hidden;
}
.title {
  font: 900 40px "";
  margin: 60px 0;
  text-align: center;
  /* 设置字体间距 */
  letter-spacing: 5px;
}
.item {
  width: 100%;
  // margin-bottom: 20px;
  outline: none;
  border: 0;
  padding: 10px;
  border-bottom: 2px solid rgb(60, 60, 70);
  font: 900 16px "";
}
.submit {
  text-align: center;
  height: 24px;
  padding: 12px;
  font: 900 20px "";
  border-radius: 10px;
  background-image: linear-gradient(to left, #fd79a8, #a29bfe);
}
.bot {
  width: 100%;
  margin-top: 30px;
  text-align: center;
}
</style>