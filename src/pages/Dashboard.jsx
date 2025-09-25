import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8081/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Failed to fetch patients", err));
  }, [navigate, user]);

  const total = patients.length;
  const male = patients.filter((p) => p.gender === "Male").length;
  const female = patients.filter((p) => p.gender === "Female").length;

  const diagnosisCount = patients.reduce((acc, patient) => {
    acc[patient.diagnosis] = (acc[patient.diagnosis] || 0) + 1;
    return acc;
  }, {});

  const topDiagnosis = Object.entries(diagnosisCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const cards = [
    {
      label: "Total Patients",
      value: total,
      icon: UserGroupIcon,
      color: "from-blue-500 to-blue-700",
    },
    {
      label: "Male Patients",
      value: male,
      icon: UserIcon,
      color: "from-green-500 to-green-700",
    },
    {
      label: "Female Patients",
      value: female,
      icon: UsersIcon,
      color: "from-pink-500 to-pink-700",
    },
    {
      label: "Top Diagnosis",
      value: `${topDiagnosis[0]?.name || "N/A"} (${topDiagnosis[0]?.count || 0})`,
      icon: ClipboardDocumentIcon,
      color: "from-yellow-500 to-yellow-700",
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg text-white">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-sm opacity-80 mt-1">
          Here’s a quick overview of your patients and statistics.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition`}
              />
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diagnosis Breakdown */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Diagnosis Breakdown
        </h2>
        {topDiagnosis.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No diagnosis data available.
          </p>
        ) : (
          <div className="space-y-3">
            {topDiagnosis.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                  {item.name}
                </span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;