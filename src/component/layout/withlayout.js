import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navItem: {
    width: "100%",
    "&:hover": {
      background: "rgb(22, 22, 22)",
    },
  },
});

export default function WraperTest(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{
        background: "rgb(22, 22, 22)",
        height: "100%",
        maxWidth: "100vw",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <Grid
        item
        style={{
          minWidth: "200px",
          height: "100vh",
          zIndex: 10,
          background: "black",
          position: "fixed",
          marginRight: 100,
        }}
      >
        <Grid container direction="column">
          <Typography color="primary" variant="h2">
            SheCodes
          </Typography>
          <Typography style={{ marginTop: 0, marginBottom: 150 }}>
            Admin Panel
          </Typography>
          <Grid container direction="column" spacing={3}>
            <Grid item className={classes.navItem}>
              <Button fullWidth href="/posts">
                <Typography>All posts</Typography>
              </Button>
            </Grid>
            <Grid item className={classes.navItem}>
              <Button fullWidth href="/posts/create">
                <Typography>New post</Typography>
              </Button>
            </Grid>
            <Grid item className={classes.navItem}>
              <Button fullWidth href="/gallery">
                <Typography>Image Gallery</Typography>
              </Button>
            </Grid>
            <Grid item className={classes.navItem}>
              <Button fullWidth href="https://shecodesvietnam.com/#/blog">
                <Typography>Shecodes Website</Typography>
              </Button>
            </Grid>
            <Grid item className={classes.navItem}>
              <Button fullWidth>
                <Typography>Setting</Typography>
              </Button>
            </Grid>
            <Grid item className={classes.navItem}>
              <Button
                fullWidth
                onClick={() => {
                  localStorage.removeItem("x-auth-token");
                  window.location.reload();
                }}
              >
                <Typography>Log out</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ marginLeft: 300, width: "100%" }} item>
        {props.children}
      </Grid>
    </Grid>
  );
}
