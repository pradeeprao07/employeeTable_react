import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())

      .then((data) => {
        const hoursWorked = {};

        data.forEach((entry) => {
          if (!entry.EmployeeName) return;
          const startTime = new Date(entry.StarTimeUtc);
          const endTime = new Date(entry.EndTimeUtc);
          const hours = (endTime - startTime) / 3600000;
          hoursWorked[entry.EmployeeName] =
            (hoursWorked[entry.EmployeeName] || 0) + hours; // entry.EmployeeName is the key and hours is the value storing in entry.EmployeeName itself
        });

        const sortedData = Object.entries(hoursWorked) // entries converts object to array
          .map(([name, hours]) => ({
            name,
            hours: parseFloat(hours.toFixed(2)),
          })) // with the map we are storing the data (name, hours) in array of objects
          .sort((a, b) => b.hours - a.hours);
        setEmployees(sortedData);
      });
  }, []);

  const chartData = {
    labels: employees.map((emp) => emp.name),
    datasets: [
      {
        label: "Total Hours Worked",
        data: employees.map((emp) => emp.hours),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <h2>Employee Hours</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "50%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: item.hours < 100 ? "#ffcccc" : "white",
              }}
            >
              <td style={{ textAlign: "center" }}>{item.name}</td>
              <td style={{ textAlign: "center" }}>{item.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Employee Hours - Pie Chart</h2>
      <div style={{ width: "400px" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}
