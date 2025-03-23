import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";


const HomePage = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to sign-in if not logged in
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, [user, navigate]);

  // if (!user) return null; 

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Welcome back, {user.name}!
        </h1>

        {user.role === "provider" ? <ProviderDashboard /> : <SeekerDashboard />}
      </div>
    </div>
  );
};

// Job Provider Dashboard
const ProviderDashboard = () => {
  // Mock data for active jobs (replace with API call)
  const activeJobs = [
    { id: 1, title: "Move Furniture", status: "Pending", pay: "$30/hr" },
    { id: 2, title: "Clean Garage", status: "Completed", pay: "$25/hr" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Your Active Jobs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeJobs.map((job) => (
          <div key={job.id} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">Status: {job.status}</p>
            <p className="text-gray-600">Pay: {job.pay}</p>
            <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>
      <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold block mx-auto">
        Post a New Job
      </button>
    </div>
  );
};

// Job Seeker Dashboard
const SeekerDashboard = () => {
  // Mock data for available jobs (replace with API call)
  const availableJobs = [
    { id: 1, title: "Move Furniture", location: "Downtown", pay: "$30/hr" },
    { id: 2, title: "Clean Home", location: "Suburbs", pay: "$25/hr" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Available Jobs Near You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableJobs.map((job) => (
          <div key={job.id} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Pay: {job.pay}</p>
            <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
              Apply Now
            </button>
          </div>
        ))}
      </div>
      <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold block mx-auto">
        Update Profile
      </button>
    </div>
  );
};

export default HomePage;
