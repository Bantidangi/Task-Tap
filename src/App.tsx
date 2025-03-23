import React from "react";
import { Route, Routes } from "react-router-dom";
import GetStarted from "./component/userEnd/GetStarted";
import Navbar from "./component/userEnd/Navbar";
import AuthPage from "./component/userEnd/AuthPage";
import SigninForm from "./component/userEnd/SigninForm";
import SignupForm from "./component/userEnd/SignupForm";

const App = () => {
  return (
 
      <div className="min-h-screen font-sans text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
        </Routes>
      </div>
   
  );
};
export default App;
