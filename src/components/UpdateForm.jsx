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
import { useParams } from "react-router-dom";
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
  const [ProductID, setProductID] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [Status, setStatus] = useState("");
  const [Remark, setRemark] = useState("");
  const [update, setUpdate] = useState(new Date().toLocaleDateString("en-US"));
  const [PRoductList, setPRoductList] = useState([]);
  const [Cate, setCateList] = useState([]);

  const handleProduct = (event) => {
    setProductID(event.target.value);
  };
  const handleCategoryID = (event) => {
    SetCategoryID(event.target.value);
  };

  const handleChange2 = (event) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    axios
      .get(
        "https://whispering-everglades-42366.herokuapp.com/twoColectionJoin2/" +
          params.id
      )
      .then((res) => {
        console.log(res.data[0].det[0].CategoryID);
        SetCategoryName(res.data[0].CategoryName);
        setName(res.data[0].Name);
        setTel(res.data[0].Tel);
        setEmail(res.data[0].Email);
        setConsent(res.data[0].Consent);
        setStatus(res.data[0].Status);
        setRemark(res.data[0].Remark);
        setProductID(res.data[0].det[0].ProductID);
        SetCategoryID(res.data[0].det[0].CategoryID);
      })
      .catch((err) => console.log(err));
    axios
      .get("https://whispering-everglades-42366.herokuapp.com/getProduct")
      .then((res) => {
        console.log(res.data);
        setPRoductList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("https://whispering-everglades-42366.herokuapp.com/getCategory")
      .then((res) => {
        console.log(res.data);
        setCateList(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const postData = (e) => {
    e.preventDefault();
    axios
      .put(
        "https://whispering-everglades-42366.herokuapp.com/updateFormy/" +
          params.id,
        {
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
          update,
        }
      )
      .then((res) => (window.location = "/home"))
      .catch((err) => console.log(err));
  };
  const Home = (e) => {
    window.location ='/home'
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
              style={{marginBottom:15}}
            />
                 <br></br>
          </Grid>
     
          <Grid item xs={6}>
       
            <label>Remark</label>
            <TextField
              type="text"
              value={Remark}
              onChange={(e) => setRemark(e.target.value)}
            ></TextField>
          </Grid>
        </Grid>

        <FormControl>
          <InputLabel id="demo-simple-select-1">ประเภทโครงการ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={CategoryID}
            label="CategoryID"
            onChange={handleCategoryID}
          >
            {Cate.map((row) => (
              <MenuItem value={row.CategoryID}>{row.CategoryName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br></br>
        <FormControl>
          <InputLabel id="demo-simple-select-1">รหัสโครงการ</InputLabel>
          <Select
            labelId="demo-simple-select-1"
            id="demo-simple-1"
            value={ProductID}
            label="ProductID"
            onChange={handleProduct}
          >
            {PRoductList.map((row) => (
              <MenuItem value={row.ProductID}>{row.ProductName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br></br>
        <FormControl>
          <InputLabel id="demo-simple-select-label">สถานะงาน</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Status}
            label="สถานะงาน"
            onChange={handleChange2}
          >
            <MenuItem autoFocus value={"สนใจ"}>
              สนใจ
            </MenuItem>
            <MenuItem value={"รอติดต่อลูกค้า"}>รอติดต่อลูกค้า</MenuItem>
            <MenuItem value={"อยู่ระหว่างดำเนินการ"}>
              อยู่ระหว่างดำเนินการ
            </MenuItem>
            <MenuItem value={"รอผลพิจารณา"}>รอผลพิจารณา</MenuItem>
            <MenuItem value={"สำเร็จ"}>สำเร็จ</MenuItem>
            <MenuItem value={"ลูกค้ายกเลิก"}>ลูกค้ายกเลิก</MenuItem>
            <MenuItem value={"ปฏิเสธลูกค้า"}>ปฏิเสธลูกค้า</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <Button variant="contained" onClick={Home}>
          ยกเลิก
        </Button>
        <br></br>
        <Button variant="contained" onClick={postData}>
          อัพเดท
        </Button>
      </FormControl>
    </Box>
  );
}

export default UpdateForm;
