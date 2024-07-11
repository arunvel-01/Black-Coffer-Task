import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const TopicsGraph = ({ data }) => {
  const [topicsData, setTopicsData] = useState({
    labels: [],
    datasets: [{
      label: 'Topic Distribution',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateTopicsData(data);
  }, [data]);

  const updateTopicsData = (filteredData) => {
    const topicsCounts = {};
    filteredData.forEach(item => {
      const topic = item.topic;
      if (topicsCounts[topic]) {
        topicsCounts[topic]++;
      } else {
        topicsCounts[topic] = 1;
      }
    });

    const topicLabels = Object.keys(topicsCounts);
    const topicValues = Object.values(topicsCounts);

    setTopicsData({
      labels: topicLabels,
      datasets: [{
        ...topicsData.datasets[0],
        data: topicValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={topicsData} options={{ responsive: true }} />
    </div>
  );
};

export default TopicsGraph;
