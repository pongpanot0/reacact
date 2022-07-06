import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios, { Axios } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormGroup } from "@mui/material";
import TextField from '@mui/material/TextField';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Category(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [CategoryID,SetCategoryID] = useState('')
  const [CategoryName,SetCategoryName]=useState('')
  const [CategoryList, setCategoryList] = useState([]);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/getProduct")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const postData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/createCategory", {
      CategoryID,
      CategoryName
    }).then((res) => console.log("post", res)).catch(err=> console.log(err));
  };
  function Update(id){
    console.log(id)
    props.history.push("http://localhost:4000/updateCategory/"+id)  }
  return (
    <React.Fragment>
      <div>
      <Box>
      <Button onClick={handleOpen} variant="contained">
        เพิ่มข้อมูล
      </Button>
      <Button  variant="contained">
        Export Excel
      </Button>
      <br></br>
      ค้นหาข้อมูล <FormGroup>
        <TextField label="ค้นหาเบอร์โทร" >ค้นหาเบอร์โทร</TextField>
        <TextField label="ค้นหาอีเมลล์" >ค้นหาอีเมลล์</TextField>
        <InputLabel label="ค้นหาสถานะ">ค้นหาสถานะ</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
      </FormGroup>
      </Box>
      </div>
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
        
        <FormGroup>
        <label>CategoryID</label>
          <TextField type="text" value={CategoryID} onChange={(e)=>SetCategoryID(e.target.value)}/>
          <label>CategoryName</label>
          <TextField type="text" value={CategoryName} onChange={(e)=>SetCategoryName(e.target.value)}/>
          <button onClick={postData}>submit</button>
          </FormGroup>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>CompanyID</TableCell>
              <TableCell>ProductID</TableCell>
              <TableCell>ProductName</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>sqm</TableCell>
              <TableCell>bedroom</TableCell>
              <TableCell>bathroom</TableCell>
              <TableCell>Parking</TableCell>
              <TableCell>Post date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Tel</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Consent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Action</TableCell>
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {CategoryList.map((row) => (
              <TableRow key={row.CategoryID}>
                <TableCell></TableCell>
                <TableCell>{row.CompanyID}</TableCell>
                <TableCell>{row.ProductID}</TableCell>
                <TableCell>{row.ProductName}</TableCell>
                <TableCell>{row.Adress}</TableCell>
                <TableCell>{row.Price}</TableCell>
                <TableCell>{row.sqm}</TableCell>
                <TableCell>{row.bedroom}</TableCell>
                <TableCell>{row.bathroom}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell><Button onClick={()=>Update(row.id)}>Edit</Button> Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default Category;
