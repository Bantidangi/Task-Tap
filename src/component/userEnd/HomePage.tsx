import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock user data (replace with actual auth context or API data)
  const user = { name: "John Doe", role: "provider" }; // Toggle to "provider" to test Provider view

  // Redirect to sign-in if not logged in (uncomment when using auth)
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, [user, navigate]);

  // if (!user) return null;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-72 transition-transform duration-300 z-50`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-8">TaskTap</h2>
          <nav className="space-y-4">
            <SidebarLink href="#dashboard" label="Dashboard" active />
            {user?.role === "provider" ? (
              <>
                <SidebarLink href="#applications" label="Job Applications" />
                <SidebarLink href="#running" label="Running Jobs" />
                <SidebarLink href="#completed" label="Completed Jobs" />
                <SidebarLink href="#payments" label="Payment History" />
                <SidebarLink href="#post-job" label="Post a Job" />
              </>
            ) : (
              <>
                <SidebarLink href="#available" label="Available Jobs" />
                <SidebarLink href="#applied" label="Applied Jobs" />
                <SidebarLink href="#completed" label="Completed Jobs" />
              </>
            )}
            <SidebarLink href="#profile" label="Profile" />
            <SidebarLink
              href="/auth"
              label="Logout"
              onClick={() => navigate("/auth")}
            />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden mb-6 p-2 bg-blue-700 text-white rounded-lg"
            onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Menu" : "Open Menu"}
          </button>

          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">Your TaskTap Dashboard</p>
          </header>

          {/* Dashboard Content */}
          {user?.role === "provider" ? (
            <ProviderDashboard />
          ) : (
            <SeekerDashboard />
          )}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ href, label, active, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors ${
      active ? "bg-blue-100 text-blue-800 font-semibold" : ""
    }`}>
    {label}
  </a>
);

// Job Provider Dashboard
const ProviderDashboard = () => {
  const jobApplications = [
    {
      id: 1,
      title: "Move Furniture",
      applicant: "Alice Smith",
      status: "Pending",
      appliedDate: "2025-03-22",
    },
    {
      id: 2,
      title: "Clean Garage",
      applicant: "Bob Johnson",
      status: "Pending",
      appliedDate: "2025-03-23",
    },
  ];
  const runningJobs = [
    {
      id: 3,
      title: "Paint Room",
      worker: "Charlie Brown",
      progress: "50%",
      startDate: "2025-03-21",
    },
  ];
  const completedJobs = [
    {
      id: 4,
      title: "Fix Sink",
      worker: "Dana White",
      date: "2025-03-20",
      pay: "$40",
    },
  ];
  const paymentHistory = [
    {
      id: 5,
      title: "Move Furniture",
      amount: "$60",
      date: "2025-03-18",
      status: "Paid",
    },
    {
      id: 6,
      title: "Clean Garage",
      amount: "$50",
      date: "2025-03-19",
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Dashboard Overview */}
      <DashboardSection id="dashboard" title="Dashboard Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Applications"
            value={jobApplications.length}
            color="bg-blue-100"
          />
          <StatCard
            label="Running Jobs"
            value={runningJobs.length}
            color="bg-yellow-100"
          />
          <StatCard
            label="Completed Jobs"
            value={completedJobs.length}
            color="bg-green-100"
          />
          <StatCard
            label="Pending Payments"
            value={paymentHistory.filter((p) => p.status === "Pending").length}
            color="bg-red-100"
          />
        </div>
      </DashboardSection>

      {/* Job Applications */}
      <DashboardSection id="applications" title="Job Applications">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {jobApplications.map((job) => (
            <DashboardCard key={job.id}>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600">Applicant: {job.applicant}</p>
              <p className="text-gray-600">Status: {job.status}</p>
              <p className="text-gray-600">Applied: {job.appliedDate}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                Review Application
              </button>
            </DashboardCard>
          ))}
        </div>
      </DashboardSection>

      {/* Running Jobs */}
      <DashboardSection id="running" title="Running Jobs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {runningJobs.map((job) => (
            <DashboardCard key={job.id}>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600">Worker: {job.worker}</p>
              <p className="text-gray-600">Progress: {job.progress}</p>
              <p className="text-gray-600">Started: {job.startDate}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                Track Progress
              </button>
            </DashboardCard>
          ))}
        </div>
      </DashboardSection>

      {/* Completed Jobs */}
      <DashboardSection id="completed" title="Completed Jobs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {completedJobs.map((job) => (
            <DashboardCard key={job.id}>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600">Worker: {job.worker}</p>
              <p className="text-gray-600">Completed: {job.date}</p>
              <p className="text-gray-600">Pay: {job.pay}</p>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full">
                View Details
              </button>
            </DashboardCard>
          ))}
        </div>
      </DashboardSection>

      {/* Payment History */}
      <DashboardSection id="payments" title="Payment History">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-gray-800 font-semibold">Job Title</th>
                <th className="p-4 text-gray-800 font-semibold">Amount</th>
                <th className="p-4 text-gray-800 font-semibold">Date</th>
                <th className="p-4 text-gray-800 font-semibold">Status</th>
                <th className="p-4 text-gray-800 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{payment.title}</td>
                  <td className="p-4">{payment.amount}</td>
                  <td className="p-4">{payment.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:underline">
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardSection>

      {/* Post a Job */}
      <DashboardSection id="post-job" title="Post a New Job">
        <div className="text-center">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold">
            Create New Job Posting
          </button>
        </div>
      </DashboardSection>
    </div>
  );
};

// Job Seeker Dashboard
const SeekerDashboard = () => {
  const availableJobs = [
    {
      id: 1,
      title: "Move Furniture",
      location: "Downtown",
      pay: "$30/hr",
      postedBy: "Jane Doe",
      postedDate: "2025-03-22",
    },
    {
      id: 2,
      title: "Clean Home",
      location: "Suburbs",
      pay: "$25/hr",
      postedBy: "Mark Lee",
      postedDate: "2025-03-23",
    },
  ];
  const appliedJobs = [
    {
      id: 3,
      title: "Paint Room",
      status: "Pending",
      pay: "$28/hr",
      appliedDate: "2025-03-21",
    },
  ];
  const completedJobs = [
    { id: 4, title: "Fix Sink", date: "2025-03-20", pay: "$20/hr" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Dashboard Overview */}
      <DashboardSection id="dashboard" title="Dashboard Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Available Jobs"
            value={availableJobs.length}
            color="bg-blue-100"
          />
          <StatCard
            label="Applied Jobs"
            value={appliedJobs.length}
            color="bg-yellow-100"
          />
          <StatCard
            label="Completed Jobs"
            value={completedJobs.length}
            color="bg-green-100"
          />
        </div>
      </DashboardSection>

      {/* Available Jobs */}
      <DashboardSection id="available" title="Available Jobs Near You">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {availableJobs.map((job) => (
            <DashboardCard key={job.id}>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600">Location: {job.location}</p>
              <p className="text-gray-600">Pay: {job.pay}</p>
              <p className="text-gray-600">Posted by: {job.postedBy}</p>
              <p className="text-gray-600">Posted: {job.postedDate}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                Apply Now
              </button>
            </DashboardCard>
          ))}
        </div>
      </DashboardSection>

      {/* Applied Jobs */}
      <DashboardSection id="applied" title="Your Applied Jobs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {appliedJobs.map((job) => (
            <DashboardCard key={job.id}>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600">Status: {job.status}</p>
              <p className="text-gray-600">Pay: {job.pay}</p>
              <p className="text-gray-600">Applied: {job.appliedDate}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                Check Status
              </button>
            </DashboardCard>
          ))}
        </div>
      </DashboardSection>

      {/* Completed Jobs */}
      <DashboardSection id="completed" title="Completed Jobs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {completedJobs.map((job) => (
            <DashboardCard key={job.id}>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600">Completed: {job.date}</p>
              <p className="text-gray-600">Pay: {job.pay}</p>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full">
                View Details
              </button>
            </DashboardCard>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
};

// Reusable Dashboard Section Component
const DashboardSection = ({ id, title, children }) => (
  <section id={id} className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
    {children}
  </section>
);

// Reusable Dashboard Card Component
const DashboardCard = ({ children }) => (
  <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    {children}
  </div>
);

// Reusable Stat Card Component
const StatCard = ({ label, value, color }) => (
  <div className={`${color} p-4 rounded-lg text-center`}>
    <p className="text-gray-600 font-medium">{label}</p>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default HomePage;
