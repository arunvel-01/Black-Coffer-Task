// import React, { useState } from 'react';
// import { FormControl, InputLabel, MenuItem} from '@mui/material';
// import Select from '@mui/material/Select';
// import { styled } from '@mui/system';

// const useStyles = styled((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const RegionFilter = ({ data, setFilteredData }) => {
//   const classes = useStyles();
//   const [selectedRegion, setSelectedRegion] = useState('');

//   const handleRegionChange = (event) => {
//     const region = event.target.value;
//     setSelectedRegion(region);
//     filterData({ region });
//   };

//   const filterData = (filters) => {
//     let filteredResult = [...data];
//     Object.keys(filters).forEach(key => {
//       const value = filters[key];
//       if (value !== '') {
//         filteredResult = filteredResult.filter(item => item[key] === value);
//       }
//     });
//     setFilteredData(filteredResult);
//   };

//   const regions = [...new Set(data.map(item => item.region))];

//   return (
//     <FormControl className={classes.formControl}>
//       <InputLabel id="region-filter-label">Region</InputLabel>
//       <Select
//         labelId="region-filter-label"
//         id="region-filter-select"
//         value={selectedRegion}
//         onChange={handleRegionChange}
//       >
//         <MenuItem value="">All</MenuItem>
//         {regions.map(region => (
//           <MenuItem key={region} value={region}>{region}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default RegionFilter;
