import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TopicsFilter = ({ data, setFilteredData }) => {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (event) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    setFilteredData(topic);
  };

  const topics = [...new Set(data.map(item => item.topic))];

  return (
    <FormControl fullWidth>
      <InputLabel id="topics-filter-label">Topics</InputLabel>
      <Select
        labelId="topics-filter-label"
        id="topics-filter-select"
        value={selectedTopic}
        onChange={handleTopicChange}
      >
        <MenuItem value="">All</MenuItem>
        {topics.map(topic => (
          <MenuItem key={topic} value={topic}>{topic}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TopicsFilter;
