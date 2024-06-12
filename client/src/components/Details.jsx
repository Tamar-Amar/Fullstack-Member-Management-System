import { useEffect, useState } from "react";
import { Chart } from "chart.js";
import { useRef } from "react";
import './Details.css';
import './GeneralCss.css';
import { useSelector } from "react-redux";
import { all } from "axios";

export const Details =()=>{

    let [memArr, setMemArr] = useState([])
    let [dailyCounts, setDailyCounts] = useState({});
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const allMembers = useSelector((state) => state.allMembers_Store);

    //Initialize graph data and non-vaccinated members
    useEffect(() => {
          setMemArr(allMembers)
          const dailyCounts = calculateDailyPatientCounts(allMembers);
          setDailyCounts(dailyCounts);
          renderChart(dailyCounts);
    },[])
        

    const currentlyMonth = new Date();

    //Returns an array of patients by days
    function calculateDailyPatientCounts(patientsData) {
        const today = new Date();
        //change from today.getDate() to 31
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, 31); 
        const dailyCounts = {};
        const daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        
        for (let i = 1; i <= daysInMonth; i++) {
            dailyCounts[i] = 0;
        }

        for (const patient of patientsData) {
            const date = new Date(patient.positiveResult); 
            if (date >= oneMonthAgo && date <= today) {
                const day = date.getDate();
                dailyCounts[day]++;
            }
        }
        return dailyCounts;
    }

    const unvaccinatedMembers = memArr.filter((member) => !member.vaccinations.length);
    const unvaccinatedCount=unvaccinatedMembers.length

    //Initializes or renders the graph according to the data
    const renderChart = (data) => {

        const labels = Object.keys(data);
        const counts = Object.values(data);
        const ctx = chartContainer.current.getContext("2d");
    
        if (chartInstance.current) {
          chartInstance.current.destroy(); 
        }
    
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [{
                label: "Daily Patients Count: ",
                data: counts,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },],
          },

          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
              },              
            },
          },
        });
      };
    

    return (
        <div className="component">
          <h2 className="rep-tit">Corona report</h2>
          <label><b>{unvaccinatedCount} members are not vaccinated:</b></label>
          <ul>
            {unvaccinatedMembers.map((member) => (
              <li key={member.id}>
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
            
          <div className="graph">
              <h3>Patient's number on {currentlyMonth.toLocaleDateString("en-US", { month: "long" })}:</h3>
              <canvas ref={chartContainer} />
          </div>

        </div>
      );
}