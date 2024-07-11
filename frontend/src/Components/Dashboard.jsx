import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import IntensityGraph from '../Graphs/IntensityGraph'; // Adjust path as per your project structure
import LikelihoodGraph from '../Graphs/LikelihoodGraph'; // Adjust path as per your project structure
import RelevanceGraph from '../Graphs/RelevanceGraph'; // Adjust path as per your project structure
import YearGraph from '../Graphs/YearGraph'; // Adjust path as per your project structure
import CountryGraph from '../Graphs/CountryGraph'; // Adjust path as per your project structure
import TopicsGraph from '../Graphs/TopicsGraph'; // Adjust path as per your project structure
import RegionGraph from '../Graphs/RegionGraph'; // Adjust path as per your project structure
import TopicsFilter from './TopicsFilter'; // Adjust path as per your project structure

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    likelihood: '',
    relevance: '',
    start_year: '',
    country: '',
    region: '',
    topic: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/data');
        setData(res.data);
        setFilteredData(res.data); // Initially set filteredData to all data
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filteredResult = [...data];
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== '') {
        filteredResult = filteredResult.filter((item) => item[key] === value);
      }
    });
    setFilteredData(filteredResult);
  };

  const handleFilterChange = (event, field) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  // Extract unique values for each filter
  const getUniqueValues = (fieldName) => {
    return [...new Set(data.map((item) => item[fieldName]))];
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper>
            <FormControl fullWidth>
              <InputLabel id="likelihood-filter-label">Likelihood</InputLabel>
              <Select
                labelId="likelihood-filter-label"
                id="likelihood-filter-select"
                value={filters.likelihood}
                onChange={(e) => handleFilterChange(e, 'likelihood')}
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueValues('likelihood').map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <FormControl fullWidth>
              <InputLabel id="relevance-filter-label">Relevance</InputLabel>
              <Select
                labelId="relevance-filter-label"
                id="relevance-filter-select"
                value={filters.relevance}
                onChange={(e) => handleFilterChange(e, 'relevance')}
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueValues('relevance').map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <FormControl fullWidth>
              <InputLabel id="year-filter-label">Year</InputLabel>
              <Select
                labelId="year-filter-label"
                id="year-filter-select"
                value={filters.start_year}
                onChange={(e) => handleFilterChange(e, 'start_year')}
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueValues('start_year').map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <FormControl fullWidth>
              <InputLabel id="country-filter-label">Country</InputLabel>
              <Select
                labelId="country-filter-label"
                id="country-filter-select"
                value={filters.country}
                onChange={(e) => handleFilterChange(e, 'country')}
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueValues('country').map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <FormControl fullWidth>
              <InputLabel id="region-filter-label">Region</InputLabel>
              <Select
                labelId="region-filter-label"
                id="region-filter-select"
                value={filters.region}
                onChange={(e) => handleFilterChange(e, 'region')}
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueValues('region').map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <TopicsFilter data={data} setFilteredData={(value) => handleFilterChange({ target: { value } }, 'topic')} />
          </Paper>
        </Grid>
      </Grid>

      <div className="graphs-container">
        {/* Graph components */}
        <IntensityGraph data={filteredData} />
        <LikelihoodGraph data={filteredData} />
        <RelevanceGraph data={filteredData} />
        <YearGraph data={filteredData} />
        <CountryGraph data={filteredData} />
        <TopicsGraph data={filteredData} />
        <RegionGraph data={filteredData} />
      </div>
    </Container>
  );
};

export default Dashboard;