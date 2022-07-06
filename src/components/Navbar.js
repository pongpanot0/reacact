import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Category from './Category';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={2}  >
        <Item style={{ background: '#13499f' ,color:'white'}}>xs=4</Item>
      </Grid>
      <Grid item xs={10}>
        <Item><Category/></Item>
      </Grid>
    </Grid>
  </Box>
  );
}