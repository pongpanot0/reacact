import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Category from "./Category";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,

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
    <Box sx={{ flexGrow: 1 }} style={{ background: "#13499f", color: "white"  }}>
      <Grid container spacing={2}>
        <Grid item xs={2} >
          <Item style={{ background: "#13499f", color: "white" }}>
            <Button style={{ color: "#13499" ,width:'100%',background:"white"}}>แสดงข้อมูล</Button>
            <br></br>
            <br></br>
            <Button style={{ color: "#13499",width:'100%',background:"white" }}>ออกจากระบบ</Button>

          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
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
