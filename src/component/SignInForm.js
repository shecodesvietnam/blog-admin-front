import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  withStyles,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import UserServices from "../services/UserServices";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "#101013",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonSignin: {
    padding: "2px",
    color: "white",
    borderRadius: "20%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    fontSize: "1.5rem",
    margin: " 0 0.5rem",
    transition: "transform 0.4s ease !important",
    "&:hover": {
      cursor: "pointer",
      outline: "none",
      background:
        "linear-gradient(to right bottom, #e80872 69.1%, #592368 102.67%)",
      transform: "rotate(5deg) scale(1.3)",
    },
  },
  form: {
    width: 600,
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  footerContainer: {
    width: "200px",
  },
}));

const CssTextField = withStyles({
  root: {
    width: "80%",
    maxWidth: "600px",
    "& label.Mui-focused": {
      color: "linear-gradient(to right bottom, #e80872 69.1%, #592368 102.67%)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e80872",
    },
    "& .MuiFormLabel-root": {
      color: "#e80872",
      borderBottomColor: "white",
    },
    "& .MuiFilledInput-root": {
      "& input, textarea": {
        fontFamily: "Poppins, sans-serif",
        fontSize: "20px",
        fontWeight: "600",
        color: "#7a4f86",
        background: "rgb(22, 22, 22)",
      },
      "&:hover fieldset": {
        borderColor: "#e80872",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e80872",
      },
    },
  },
})(TextField);

export default function SignInForm() {
  const classes = useStyle();
  const history = useHistory();
  const [IsErrorSignin, setErrorSignin] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setErrorSignin(false);
    e.preventDefault();
    const reponse = await UserServices.login(inputValues).catch((err) => {
      console.log(err);
      setErrorSignin(true);
    });
    if (reponse) {
      localStorage.setItem("x-auth-token", reponse.data);
      history.push("/posts");
      window.location.reload();
    }
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Typography variant="h1" color="primary">
          SheCodes Admin
        </Typography>
        <Typography>
          {IsErrorSignin
            ? "Something went wrong, please try again"
            : "Please Sign In"}
        </Typography>
        <form noValidate onSubmit={handleSubmit} className={classes.form}>
          <CssTextField
            variant="filled"
            name="email"
            label="Email"
            onChange={(e) => {
              handleChange(e);
            }}
          ></CssTextField>

          <CssTextField
            variant="filled"
            label="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          ></CssTextField>

          <Grid>
            <Button type="submit">
              <Typography>Sign In</Typography>
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid>
        <Grid className={classes.footerContainer}>
          <Typography variant="subtitle1" color="primary" align="center">
            ShortCuts
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          className={classes.footerContainer}
        >
          <Grid item xs={4}>
            <IconButton>
              <FacebookIcon className={classes.buttonSignin} />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton>
              <InstagramIcon className={classes.buttonSignin} />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton>
              <LinkedInIcon className={classes.buttonSignin} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
