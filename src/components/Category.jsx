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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormGroup, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
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
  const [CategoryID, SetCategoryID] = useState("");
  const [CategoryName, SetCategoryName] = useState("");
  const [CategoryList, setCategoryList] = useState([]);

  const [Name, setName] = useState("");
  const [Tel, setTel] = useState("");
  const [Email, setEmail] = useState("");
  const [Consent, setConsent] = useState("");
  const [ProductID, setProductID] = useState();
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/twoColectionJoin")
      .then((res) => {
        console.log(res.data)
        setCategoryList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const postData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/createForm", {
        CategoryID,
        CategoryName,
        Name,
        Tel,
        Email,
        Consent,
        ProductID,
        date
      })
      .then((res) => console.log("post", res))
      .catch((err) => console.log(err));
  };
  function Update(id) {
    console.log(id);
    props.history.push("http://localhost:4000/updateCategory/" + id);
  }
  return (
    <React.Fragment>
      <div>
        <Box>
          <Button onClick={handleOpen} variant="contained">
            เพิ่มข้อมูล
          </Button>
          <Button variant="contained">Export Excel</Button>
          <br></br>
          ค้นหาข้อมูล{" "}
          <FormGroup>
            <TextField label="ค้นหาเบอร์โทร">ค้นหาเบอร์โทร</TextField>
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
          <FormGroup>
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
            <br></br>
            <Typography>เพิ่มข้อมูลโครงการที่ลูกค้าสนใจ</Typography>
            <br></br>
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
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>{row.Parking}</TableCell>
                <TableCell>
                  <Button onClick={() => Update(row.id)}>Edit</Button> Delete
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
