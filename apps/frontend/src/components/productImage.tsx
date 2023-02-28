import React from "react";
import rainbowTag from "../images/rainbowTag.png";
import wildAnimalTag from "../images/wildAnimalTag.png";
import pinkTag from "../images/pinkTag.png";
import blueTag from "../images/blueTag.png";

export default function ProductImage(props) {
  return (
    <div className="productImage leftColumn">
      <img
        src={rainbowTag}
        alt="meggi nappy bag tag with rainbow pattern"
        className={props.pattern === "rainbowTag" ? "active" : ""}
        data-image="rainbowTag"
      />
      <img
        src={wildAnimalTag}
        alt="meggi nappy bag tag with animal pattern"
        className={props.pattern === "wildAnimalTag" ? "active" : ""}
        data-image="wildAnimalTag"
      />
      <img
        src={pinkTag}
        alt="meggi nappy bag tag with pink pattern"
        className={props.pattern === "pinkTag" ? "active" : ""}
        data-image="pinkTag"
      />
      <img
        src={blueTag}
        alt="meggi nappy bag tag with blue pattern"
        className={props.pattern === "blueTag" ? "active" : ""}
        data-image="blueTag"
      />
    </div>
  );
}
