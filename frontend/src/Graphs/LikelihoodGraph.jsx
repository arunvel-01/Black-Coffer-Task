import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const LikelihoodGraph = ({ data }) => {
  const [likelihoodData, setLikelihoodData] = useState({
    labels: [],
    datasets: [{
      label: 'Likelihood Levels',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateLikelihoodData(data);
  }, [data]);

  const updateLikelihoodData = (filteredData) => {
    const likelihoodLevels = {};
    filteredData.forEach(item => {
      const likelihood = item.likelihood;
      if (likelihoodLevels[likelihood]) {
        likelihoodLevels[likelihood]++;
      } else {
        likelihoodLevels[likelihood] = 1;
      }
    });

    const likelihoodLabels = Object.keys(likelihoodLevels);
    const likelihoodValues = Object.values(likelihoodLevels);

    setLikelihoodData({
      labels: likelihoodLabels,
      datasets: [{
        ...likelihoodData.datasets[0],
        data: likelihoodValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={likelihoodData} options={{ responsive: true }} />
    </div>
  );
};

export default LikelihoodGraph;
