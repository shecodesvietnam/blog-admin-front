import React from "react";

export default function Notfound() {
  var pageX = window.innerWidth;
  var pageY = window.innerHeight;
  var mouseY = 0;
  var mouseX = 0;
  window.addEventListener("mousemove", function (event) {
    //verticalAxis
    mouseY = event.pageY;
    let yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
    //horizontalAxis
    mouseX = event.pageX / -pageX;
    let xAxis = -mouseX * 100 - 100;

    document.getElementById("box__ghost-eyes").style.transform =
      "translate(" + xAxis + "%,-" + yAxis + "%)";

    document.getElementById("box__ghost-eyes").style.transition =
      ".3s all ease";
  });

  return (
    <>
      <div class="box">
        <div class="box__ghost">
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>

          <div class="box__ghost-container">
            <div id="box__ghost-eyes">
              <div class="box__eye-left"></div>
              <div class="box__eye-right"></div>
            </div>
            <div class="box__ghost-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="box__ghost-shadow"></div>
        </div>

        <div class="box__description">
          <div class="box__description-container">
            <div class="box__description-title">Whoops!</div>
            <div class="box__description-title">404</div>
            <div class="box__description-text">
              It seems like we couldn't find the page you were looking for
            </div>
          </div>

          <a href="/" class="box__button">
            Go back
          </a>
        </div>
      </div>
    </>
  );
}
