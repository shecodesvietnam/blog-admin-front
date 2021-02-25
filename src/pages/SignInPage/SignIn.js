import React from "react";
import { Grid } from "@material-ui/core";
import Final from "../../assets/final.png";
import SignInFrom from "../../component/SignInForm";

export default function SignInPage() {
  return (
    <div>
      <Grid container style={{ background: "#101013" }}>
        <Grid item xs={5}>
          <SignInFrom></SignInFrom>
        </Grid>
        <Grid item xs={7}>
          <Grid
            style={{
              background: `url(${Final}) no-repeat`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: "100%",
            }}
          ></Grid>
        </Grid>
      </Grid>
    </div>
  );
}
