import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios, { Axios } from "axios";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
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
import fs from "fs";
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
  const [ProductID, setProductID] = useState();
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [Status, setStatus] = useState("");
  const [Remark, setRemark] = useState("");
  const [searchedVal, setSearchedVal] = useState("");
  const [searchedVal2, setSearchedVal2] = useState("");
  const [searchedVal3, setSearchedVal3] = useState("");
  const [det, setDet] = useState("");
  const handleChange = (event) => {
    setSearchedVal3(event.target.value);
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
  const [checked, setChecked] = React.useState(true);
  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const formRef = React.useRef();
  useEffect(() => {
    axios
      .get("https://whispering-everglades-42366.herokuapp.com/twoColectionJoin")
      .then((res) => {
        console.log(res.data);
        setCategoryList(res.data);
        setDet(res.data)
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
  const postData = (e) => {
    if(CategoryID == undefined){
       console.log('err')
    }
    if(CategoryID !== undefined){
      return axios.post("https://whispering-everglades-42366.herokuapp.com/createForm", {
        CategoryID,
        CategoryName,
        Name,
        Tel,
        Email,
        checked,
        ProductID,
        date,
        Status,
        Remark,
        
      })
        .then((res) => {
          window.location.reload();
        })
    
    }

    
      
    
    
  };
  const OnExit = (e) => {
    window.location.reload();
  }
  const getExcel = (e) => {
    e.preventDefault();
    axios({
      url: "https://whispering-everglades-42366.herokuapp.com/csv", //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  function Update(id) {
    window.location = "/edit/" + id;
  }
  const click = (e) =>{
    if(CategoryID == null){
      formRef.current.reportValidity()
    }
    if(CategoryID !== null){
      postData()
    }



  }
  const DeleteData = (id) => {
    axios
      .delete(
        "https://whispering-everglades-42366.herokuapp.com/deleteForm/" + id
      )
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <br></br>
      <br></br>

      <div style={{marginLeft: 20}}>
        {" "}
        <br></br>
        <Box  >
          <Button
            onClick={handleOpen}
            variant="contained"
            style={{ backgroundColor: "#867A3C" }}
          >
            เพิ่มข้อมูล
          </Button>
          <Button
            variant="contained"
            onClick={getExcel}
            style={{ backgroundColor: "#867A3C", marginLeft: 5 }}
          >
            Export Excel
          </Button>
          <br></br>
          <br></br>
          <FormGroup>
            <TextField
              label="ค้นหาด้วยเบอร์โทร"
              onChange={(e) => setSearchedVal(e.target.value)}
            />
            <br></br>
            <TextField
              label="ค้นหาอีเมลล์"
              onChange={(e) => setSearchedVal2(e.target.value)}
            />
            <br></br>
            <FormControl>
              <InputLabel id="demo-simple-select-label">สถานะงาน</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchedVal3}
                label="สถานะงาน"
                onChange={handleChange}
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
          </FormGroup>
        </Box>
        <br></br>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 
        <Box sx={style} >
        <form ref={formRef}>
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
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <label>เบอร์โทร</label>
                <TextField
                  type="text"
                  value={Tel}
                  required
                  onChange={(e) => setTel(e.target.value)}
                />
                <label>อีเมลล์</label>
                <TextField
                  type="text"
                  value={Email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <label>หมายเหตุ</label>
                <TextField
                  type="text"
                  
                  value={Remark}
                  required
                  onChange={(e) => setRemark(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  
                  onChange={handleChange4}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="ยินยอมให้เก็บข้อมูลส่วนบุคคล"
            />
            <br></br>
            <FormControl>
              <InputLabel id="demo-simple-select-1">ประเภทโครงการ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={CategoryID}
                label="CategoryID"
                required
                onChange={handleCategoryID}
              >
                {Cate.map((row) => (
                  <MenuItem value={row.CategoryID}>{row.CategoryName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br></br>
            <FormControl>
              <InputLabel id="demo-simple-select-1">ชื่อโครงการ</InputLabel>
              <Select
                labelId="demo-simple-select-1"
                id="demo-simple-1"
                value={ProductID}
                required
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
                required
                label="สถานะงาน"
                onChange={handleChange2}
              >
                <MenuItem autoFocus value={"ทั้งหมด"}>
                ทั้งหมด
                </MenuItem>
                <MenuItem  value={"สนใจ"}>
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
            <Button
              variant="contained"
              onClick={OnExit}
              style={{ backgroundColor: "#867A3C" }}
            >
              ยกเลิก
            </Button>
            <br></br>
            <Button
              variant="contained"
              onClick={click}
             
              style={{ backgroundColor: "#867A3C" }}
            >
              เพิ่มข้อมูล
            </Button>
          </FormControl>
          </form>
        </Box>
     
      </Modal>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} >
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
              <TableCell>หมายเหตุ</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {CategoryList.filter(
              (row) =>
                // note that I've incorporated the searchedVal length check here
                !searchedVal.length ||
                row.Tel.toString()
                  .toLowerCase()
                  .includes(searchedVal.toString().toLowerCase())
            )
              .filter(
                (row) =>
                  // note that I've incorporated the searchedVal length check here
                  !searchedVal2.length ||
                  row.Email.toString()
                    .toLowerCase()
                    .includes(searchedVal2.toString().toLowerCase())
              )
              .filter(
                (row) =>
                  // note that I've incorporated the searchedVal length check here
                  !searchedVal3.length ||
                  row.Status.toString()
                    .toLowerCase()
                    .includes(searchedVal3.toString().toLowerCase())
              )
              .map((row) => (
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
