import React, { useState, useEffect } from "react";

export default function Notfound() {
  var [loading, setLoading] = useState(true);
  var pageX = window.innerWidth;
  var pageY = window.innerHeight;
  var mouseY = 0;
  var mouseX = 0;

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     window.addEventListener("mousemove", function (event) {
  //       //verticalAxis
  //       mouseY = event.pageY;
  //       let yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
  //       //horizontalAxis
  //       mouseX = event.pageX / -pageX;
  //       let xAxis = -mouseX * 100 - 100;

  //       // document.getElementById("box__ghost-eyes").style.transform =
  //       //   "translate(" + xAxis + "%,-" + yAxis + "%)";

  //       // document.getElementById("box__ghost-eyes").style.transition =
  //       //   ".3s all ease";
  //     });
  //   }
  // }, [loading]);

  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>

        <div className="box__ghost-container">
          <div id="box__ghost-eyes">
            <div className="box__eye-left"></div>
            <div className="box__eye-right"></div>
          </div>
          <div className="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="box__ghost-shadow"></div>
      </div>

      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-title">404</div>
          <div className="box__description-text">
            It seems like we couldn't find the page you were looking for
          </div>
        </div>

        <a href="/" className="box__button">
          Go back
        </a>
      </div>
    </div>
  );
}
