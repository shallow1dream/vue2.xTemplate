const user={
    state: {
      account:""
      },
      mutations: {
        rembAcc:(state,data)=> state.account=data,
        logOut:(state)=>state.account=""
      },
      actions: {
      },
      modules: {
      }
}
export default user