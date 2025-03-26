const { createSlice } = require("@reduxjs/toolkit");

const userLoginSlice = createSlice({
  name:"userLogin",
  initialState:[],
  reducers:{
    userLogedIn:(state,action)=>{
      return [...state, action.payload]
    }
  }
})

export default userLoginSlice.reducer