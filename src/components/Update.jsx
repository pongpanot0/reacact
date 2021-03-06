import React from "react";
import axios, { Axios } from "axios";
import { FormGroup } from "@mui/material";
import TextField from '@mui/material/TextField';
export default function Update() {
  const [CategoryID, SetCategoryID] = useState("");
  const [CategoryName, SetCategoryName] = useState("");
  useEffect(() => {
    const id = props.match.params.id
    axios
      .get("https://whispering-everglades-42366.herokuapp.com/getCategory")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const postData = (e) => {
    e.preventDefault();
    axios
      .post("https://whispering-everglades-42366.herokuapp.com/createCategory", {
        CategoryID,
        CategoryName,
      })
      .then((res) => console.log("post", res))
      .catch((err) => console.log(err));
  };
  function Update(id) {
    console.log(id);
    props.history.push("https://whispering-everglades-42366.herokuapp.com/updateCategory/" + id);
  }
  return (        
  <FormGroup>
    <label>CategoryID</label>
      <TextField type="text" value={CategoryID} onChange={(e)=>SetCategoryID(e.target.value)}/>
      <label>CategoryName</label>
      <TextField type="text" value={CategoryName} onChange={(e)=>SetCategoryName(e.target.value)}/>
      <button onClick={postData}>submit</button>
      </FormGroup>);
}
