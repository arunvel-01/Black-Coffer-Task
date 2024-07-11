// CountryGraph.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const CountryGraph = ({ data }) => {
  const [countryData, setCountryData] = useState({
    labels: [],
    datasets: [{
      label: 'Country Distribution',
      data: [],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    updateCountryData(data);
  }, [data]);

  const updateCountryData = (filteredData) => {
    const countryCounts = {};
    filteredData.forEach(item => {
      const country = item.country;
      if (countryCounts[country]) {
        countryCounts[country]++;
      } else {
        countryCounts[country] = 1;
      }
    });

    const countryLabels = Object.keys(countryCounts);
    const countryValues = Object.values(countryCounts);

    setCountryData({
      labels: countryLabels,
      datasets: [{
        ...countryData.datasets[0],
        data: countryValues,
      }],
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar data={countryData} options={{ responsive: true }} />
    </div>
  );
};

export default CountryGraph;
