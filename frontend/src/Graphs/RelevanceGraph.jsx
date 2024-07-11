import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const RelevanceGraph = ({ data }) => {
  const [relevanceData, setRelevanceData] = useState({
    labels: [],
    datasets: [{
      label: 'Relevance Levels',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateRelevanceData(data);
  }, [data]);

  const updateRelevanceData = (filteredData) => {
    const relevanceLevels = {};
    filteredData.forEach(item => {
      const relevance = item.relevance;
      if (relevanceLevels[relevance]) {
        relevanceLevels[relevance]++;
      } else {
        relevanceLevels[relevance] = 1;
      }
    });

    const relevanceLabels = Object.keys(relevanceLevels);
    const relevanceValues = Object.values(relevanceLevels);

    setRelevanceData({
      labels: relevanceLabels,
      datasets: [{
        ...relevanceData.datasets[0],
        data: relevanceValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={relevanceData} options={{ responsive: true }} />
    </div>
  );
};

export default RelevanceGraph;
