import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const YearGraph = ({ data }) => {
  const [yearData, setYearData] = useState({
    labels: [],
    datasets: [{
      label: 'Year Distribution',
      data: [],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateYearData(data);
  }, [data]);

  const updateYearData = (filteredData) => {
    const yearCounts = {};
    filteredData.forEach(item => {
      const year = item.start_year;
      if (yearCounts[year]) {
        yearCounts[year]++;
      } else {
        yearCounts[year] = 1;
      }
    });

    const yearLabels = Object.keys(yearCounts);
    const yearValues = Object.values(yearCounts);

    setYearData({
      labels: yearLabels,
      datasets: [{
        ...yearData.datasets[0],
        data: yearValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={yearData} options={{ responsive: true }} />
    </div>
  );
};

export default YearGraph;
