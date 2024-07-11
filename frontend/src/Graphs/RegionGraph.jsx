import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const RegionGraph = ({ data }) => {
  const [regionData, setRegionData] = useState({
    labels: [],
    datasets: [{
      label: 'Region Distribution',
      data: [],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateRegionData(data);
  }, [data]);

  const updateRegionData = (filteredData) => {
    const regionCounts = {};
    filteredData.forEach(item => {
      const region = item.region;
      if (regionCounts[region]) {
        regionCounts[region]++;
      } else {
        regionCounts[region] = 1;
      }
    });

    const regionLabels = Object.keys(regionCounts);
    const regionValues = Object.values(regionCounts);

    setRegionData({
      labels: regionLabels,
      datasets: [{
        ...regionData.datasets[0],
        data: regionValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={regionData} options={{ responsive: true }} />
    </div>
  );
};

export default RegionGraph;
