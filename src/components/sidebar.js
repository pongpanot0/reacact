import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button } from "@mui/material";
import logo from '../ICON.png'
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
export default props => {
    const Home = (e) => {
        window.location ='/'
      };
const Item = styled(Box)(({ theme }) => ({
    
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  
  }));
  return (
    <Menu>
         <Item >
         <img src={logo}  width="100" height="auto"  alt="" />
            <br></br>
            <Button style={{ color: "white" ,width:'100%'}}>แสดงข้อมูล</Button>
            <br></br>
            <br></br>
            <Button style={{ color: "white",width:'100%'}} onClick={Home}>ออกจากระบบ</Button>
       </Item>
       
    </Menu>
  );
};