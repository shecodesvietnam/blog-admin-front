import React, { useState, useEffect } from "react";
import WraperTest from "../../component/layout/withlayout";
import MediaServices from "../../services/MediaServices";
import { apiUrl } from "../../config/endpoint.json";
import { Grid, Button, Typography } from "@material-ui/core";

export default function Gallery() {
  const [allimg, setAllImage] = useState([]);

  useEffect(() => {
    MediaServices.getAll()
      .catch((e) => console.log(e))
      .then((res) => {
        if (res) {
          setAllImage(res.data);
        }
      });
  }, [allimg]);
  return (
    <WraperTest>
      <Grid container direction="row">
        {allimg &&
          allimg.map((e, i) => (
            <Grid item xs={3}>
              <Grid container direction="column" justify="center" key={i}>
                <Grid
                  item
                  style={{
                    height: 300,
                    margin: "0 10px",
                    borderBottom: "1px solid white",
                  }}
                >
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      <img
                        width={280}
                        height="auto"
                        alt={e}
                        src={`${apiUrl}/media/image/${e.filename}`}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    key={i}
                    onClick={() =>
                      MediaServices.deleteImg(e.filename).then((res) => {
                        console.log(res);
                      })
                    }
                  >
                    <Typography>Delete Image</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </WraperTest>
  );
}
