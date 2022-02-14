<template>
    <div class="main">
        <div class="form">
            <div class="login">
                <p class="title">Login</p>
                <!-- <div class="d">
                    <input type="text" class="e" placeholder="账号">
                    <input type="password" class="e" placeholder="密码">
                    <div class="f">GO</div>
                </div> -->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                     <el-form-item  prop="account" label-width='0'>
                        <!-- <el-input :model="ruleForm.account"></el-input> -->
                         <input type="text" class="item" placeholder="账号" v-model="ruleForm.account" />
                    </el-form-item>
                    <el-form-item  prop="password" label-width='0'>
                        <!-- <el-input :model="ruleForm.password"></el-input> -->
                         <input type="password" class="item" placeholder="密码" v-model="ruleForm.password" />
                    </el-form-item>
                    <el-form-item label-width='0'>
                         <div class="submit" @click="submitForm">GO</div>
                    </el-form-item>
                </el-form>
                <div class="bot">没有账号?<router-link to="register" style="color:red">register</router-link></div>
            </div>
        </div>
    </div>
         

</template>

<script>
export default {
    data(){
        return {
            ruleForm:{
                account:'admin',
                password:'111111',
            },
             rules: {
                account:[ 
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
             }
        }
    },
    created(){
    },  
    methods:{
        submitForm() {
        this.$refs.ruleForm.validate((valid) => {
            const { account ,password}=this.ruleForm
            if (valid) {
                        this.$http({
                        url:"/login",
                        method:"post",
                        data:{
                            account,
                            password
                        }
                    }).then(resolve=>{
                        this.$store.commit("rembAcc",resolve.account)
                        console.log(this.$store.state.user.account)
                        this.$router.push('/index')
                    }).catch((err) => {
                        this.$message.error(err);
                    })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>

<style lang="scss" scoped>
    .main{
        width: 100%;
        height: calc(100vh);
        display: flex;
        justify-content: center;
        background-image: linear-gradient(to left, #fd79a8, #a29bfe);
    }
     .form{
            background-color: #fff;
            width: 350px;
            height: 500px;
            position: relative;
            display: flex;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
            top: 100px;
        }
        .login{
            width: 300px;
            height: 450px;
            overflow: hidden;
        }
        .title{
            font: 900 40px '';
            margin: 60px 0;
            text-align: center;
            /* 设置字体间距 */
            letter-spacing: 5px;
        }
        .item{
            width: 100%;
            // margin-bottom: 20px;
            outline: none;
            border: 0;
            padding: 10px;
            border-bottom: 2px solid rgb(60,60,70);
            font: 900 16px '';
        }
        .submit{

            text-align: center;
            height: 24px;
            padding: 12px;
            font: 900 20px '';
            border-radius: 10px;
            background-image: linear-gradient(to left, #fd79a8, #a29bfe);
        }
        .bot{
            width: 100%;
            margin-top: 30px;
            text-align: center;
        }
</style>