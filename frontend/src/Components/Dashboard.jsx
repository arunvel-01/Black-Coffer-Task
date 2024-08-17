import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import IntensityGraph from '../Graphs/IntensityGraph';
import LikelihoodGraph from '../Graphs/LikelihoodGraph';
import RelevanceGraph from '../Graphs/RelevanceGraph';
import YearGraph from '../Graphs/YearGraph';
import CountryGraph from '../Graphs/CountryGraph';
import TopicsGraph from '../Graphs/TopicsGraph';
import RegionGraph from '../Graphs/RegionGraph';
import TopicsFilter from './TopicsFilter';

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
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applyFilters = useCallback(() => {
    let filteredResult = [...data];
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== '') {
        filteredResult = filteredResult.filter((item) => item[key] === value);
      }
    });
    setFilteredData(filteredResult);
  }, [data, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (event, field) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const getUniqueValues = (fieldName) => {
    return [...new Set(data.map((item) => item[fieldName]))];
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Filters</Typography>
              <FormControl fullWidth margin="normal">
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
              <FormControl fullWidth margin="normal">
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
              <FormControl fullWidth margin="normal">
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
              <FormControl fullWidth margin="normal">
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
              <FormControl fullWidth margin="normal">
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
              <TopicsFilter data={data} setFilteredData={(value) => handleFilterChange({ target: { value } }, 'topic')} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Graphs
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <IntensityGraph data={filteredData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LikelihoodGraph data={filteredData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RelevanceGraph data={filteredData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <YearGraph data={filteredData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CountryGraph data={filteredData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TopicsGraph data={filteredData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RegionGraph data={filteredData} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
