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

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormGroup, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {useParams } from 'react-router-dom'
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
function UpdateForm(id) {
    const params = useParams();

    console.log(params);
  const [CategoryID, SetCategoryID] = useState("");
  const [CategoryName, SetCategoryName] = useState("");
  const [CategoryList, setCategoryList] = useState([]);

  const [Name, setName] = useState("");
  const [Tel, setTel] = useState("");
  const [Email, setEmail] = useState("");
  const [Consent, setConsent] = useState("");
  const [ProductID, setProductID] = useState();
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [Status, setStatus] = useState("");
  const [Remark, setRemark] = useState("");
const [update,setUpdate] = useState(new Date().toLocaleDateString("en-US"));
  const handleChange2 = (event) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    axios
      .get("https://whispering-everglades-42366.herokuapp.com/twoColectionJoin2/"+params.id)
      .then((res) => {
        console.log(res.data);
        SetCategoryID(res.data[0].CategoryID);
SetCategoryName(res.data[0].CategoryName);
setName(res.data[0].Name);
setTel(res.data[0].Tel);
setEmail(res.data[0].Email);
setConsent(res.data[0].Consent);
setProductID(res.data[0].ProductID);
setStatus(res.data[0].Status);
setRemark(res.data[0].Remark);

      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const postData = (e) => {
    e.preventDefault();
    axios
      .put("https://whispering-everglades-42366.herokuapp.com/updateFormy/"+params.id, {
        CategoryID,
        CategoryName,
        Name,
        Tel,
        Email,
        Consent,
        ProductID,
        date,
        Status,
        Remark,
        update
      })
      .then((res) => window.location ='/home')
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={style}>
      <Typography sx={{ textAlign: "center" }} variant="body1" gutterBottom>
        เพิ่มข้อมูลโครงการที่ลูกค้าสนใจ
      </Typography>
      
      <FormControl>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <label>ชื่อลูกค้า</label>
            <TextField
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>เบอร์โทร</label>
            <TextField
              type="text"
              value={Tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <label>อีเมลล์</label>
            <TextField
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>หมายเหตุ</label>
            <TextField
              type="text"
              value={Consent}
              onChange={(e) => setConsent(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <label>ประเภทโครงการ</label>
            <TextField
              type="number"
              value={CategoryID}
              onChange={(e) => SetCategoryID(e.target.valueAsNumber)}
            />
            <label>รหัสโครงการ</label>
            <TextField
              type="number"
              value={ProductID}
              onChange={(e) => setProductID(e.target.valueAsNumber)}
            />
            <label>ชื่อโครงการ</label>
            <TextField
              type="number"
              value={CategoryName}
              onChange={(e) => SetCategoryName(e.target.value)}
            />
            <label>ราคา</label>
            <TextField
              type="text"
              value={CategoryName}
              onChange={(e) => SetCategoryName(e.target.value)}
            />
          </Grid>
        </Grid>
        <label>Remark</label>
        <TextField
          type="text"
          value={Remark}
          onChange={(e) => setRemark(e.target.value)}
        ></TextField>
        <FormControl>
          <InputLabel id="demo-simple-select-label">สถานะงาน</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Status}
            label="สถานะงาน"
            onChange={handleChange2}
          >
            <MenuItem value={"Success"}>Success</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Reject"}>Reject</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={postData}>
          submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default UpdateForm;
