import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Category from "./Category";
import Sidebar from "./sidebar";

const Item = styled(Paper)(({ theme }) => ({

  ...theme.typography.body2,
  textAlign: "center",


}));
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)"
};

// Variable number of columns
const gridContainer2 = {
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column"
};

const gridItem = {
  margin: "8px",
  border: "1px solid red"
};

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: "white" }}>
      <Grid container >
        <Grid item xs={2} >
          <Item style={{ background: "#13499f", color: "white" }}>
       
<Sidebar/>
          </Item>
        </Grid>
        <Grid item xs={9} style={{paddingLeft:50}}>
          <Item >
            <Category />
          </Item>
        </Grid>
      </Grid>
      <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
    </Box>
  );
}
