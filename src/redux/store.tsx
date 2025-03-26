import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userslices"


export const store = configureStore({
  reducer: {
   user : userLoginSlice
  },
  
})

