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
import fs from 'fs'
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
  const [CategoryID, SetCategoryID] = useState();
  const [CategoryName, SetCategoryName] = useState("");
  const [CategoryList, setCategoryList] = useState([]);
  const [PRoductList, setPRoductList] = useState([]);
  const [Cate, setCateList] = useState([]);
  const [Name, setName] = useState("");
  const [Tel, setTel] = useState("");
  const [Email, setEmail] = useState("");
  const [Consent, setConsent] = useState("");
  const [ProductID, setProductID] = useState();
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [age, setAge] = React.useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [Status, setStatus] = useState("");
  const [Remark, setRemark] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
      .get("https://whispering-everglades-42366.herokuapp.com/twoColectionJoin")
      .then((res) => {
        console.log(res.data);
        setCategoryList(res.data);
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
  }, []);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = CategoryList.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(CategoryList);
    }
  };
  const postData = (e) => {
    e.preventDefault();
    axios
      .post("https://whispering-everglades-42366.herokuapp.com/createForm", {
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
      })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };
  const getExcel = (e) => {
    e.preventDefault();
      axios({
        url: 'https://localhost:4000/csv', //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
    });
  
  };
  console.log(getExcel);
  function Update(id) {
    window.location = "/edit/" + id;
  }
  const DeleteData = (id) => {
    axios
      .delete("https://whispering-everglades-42366.herokuapp.com/" + id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div>
        <Box>
          <Button onClick={handleOpen} variant="contained">
            เพิ่มข้อมูล
          </Button>
          <Button variant="contained" onClick={getExcel}>
            Export Excel
          </Button>
          <br></br>
          ค้นหาข้อมูล{" "}
          <FormGroup>
            <TextField
              label="ค้นหาเบอร์โทร"
              onChange={(e) => searchItems(e.target.value)}
            >
              ค้นหาเบอร์โทร
            </TextField>
            <TextField label="ค้นหาอีเมลล์">ค้นหาอีเมลล์</TextField>
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
          <Typography sx={{ textAlign: "center" }} variant="body1" gutterBottom>
            เพิ่มข้อมูลโครงการที่ลูกค้าสนใจ
          </Typography>
          <FormControl>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
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
            <Button variant="contained" onClick={postData}>
              submit
            </Button>
          </FormControl>
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
                <TableCell>{row.det[0].CompanyID}</TableCell>
                <TableCell>{row.det[0].ProductID}</TableCell>
                <TableCell>{row.det[0].ProductName}</TableCell>
                <TableCell>{row.det[0].Adress}</TableCell>
                <TableCell>{row.det[0].Price}</TableCell>
                <TableCell>{row.det[0].sqm}</TableCell>
                <TableCell>{row.det[0].bedroom}</TableCell>
                <TableCell>{row.det[0].bathroom}</TableCell>
                <TableCell>{row.det[0].Parking}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Tel}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Consent}</TableCell>
                <TableCell>{row.Status}</TableCell>
                <TableCell>{row.Remark}</TableCell>
                <TableCell>{row.update}</TableCell>
                <TableCell>
                  <Button onClick={() => Update(row.id)}>Edit</Button>
                  <Button onClick={() => DeleteData(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default Category;
