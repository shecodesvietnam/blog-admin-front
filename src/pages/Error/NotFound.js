import { Grid, Typography, Button } from "@material-ui/core";
import React from "react";

export default function Notfound() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{
        background: "black",
        height: window.innerHeight,
        width: "100%",
      }}
    >
      <Grid style={{ marginBottom: 40 }}>
        <Typography variant="h1" color="primary">
          404 Not Found
        </Typography>
      </Grid>
      <Grid>
        <Button
          href="/"
          variant="outlined"
          style={{ border: "1px solid white" }}
        >
          <Typography>Go back</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
