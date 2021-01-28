import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "blue",
    height: "100vh",
    width: "100%",
  },
  field: {},
}));

export default function SignInForm() {
  const classes = useStyle();
  const history = useHistory();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reponse = await axios.post(
      `http://206.189.155.4:3000/api/auth`,
      inputValues
    );
    if (reponse) {
      localStorage.setItem("JWT", reponse.data);
      history.push("/posts");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <form noValidate onSubmit={handleSubmit}>
          <Grid>
            <TextField
              variant="outlined"
              name="email"
              label="email"
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
          </Grid>
          <Grid>
            <TextField
              variant="outlined"
              label="password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
          </Grid>
          <Grid>
            <Button type="submit">
              <Typography>Sign In</Typography>
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid>
        <Grid>SheCodes Vietnam</Grid>
        <Grid>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </div>
  );
}
