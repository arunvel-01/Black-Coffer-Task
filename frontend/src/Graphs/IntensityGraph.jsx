import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const IntensityGraph = ({ data }) => {
  const [intensityData, setIntensityData] = useState({
    labels: [],
    datasets: [{
      label: 'Intensity Levels',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateIntensityData(data);
  }, [data]);

  const updateIntensityData = (filteredData) => {
    const intensityLevels = {};
    filteredData.forEach(item => {
      const intensity = item.intensity;
      if (intensityLevels[intensity]) {
        intensityLevels[intensity]++;
      } else {
        intensityLevels[intensity] = 1;
      }
    });

    const intensityLabels = Object.keys(intensityLevels);
    const intensityValues = Object.values(intensityLevels);

    setIntensityData({
      labels: intensityLabels,
      datasets: [{
        ...intensityData.datasets[0],
        data: intensityValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={intensityData} options={{ responsive: true }} />
    </div>
  );
};

export default IntensityGraph;
