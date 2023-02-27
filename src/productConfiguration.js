import React from "react";

export default function ProductConfiguration(props) {
  return (
    <div className="productCongifuration">
      <div className="productPattern">
        <span>Pattern</span>
        <form className="colorChoose" onSubmit={props.handleSubmit}>
          <div>
            <input
              type="radio"
              data-image="rainbowTag"
              name="pattern"
              id="rainbow"
              value={props.pattern}
              onChange={props.onPatternClick}
            />
            <label htmlFor="rainbow">
              <span
                className={props.pattern === "rainbowTag" ? "activeInput" : ""}
              ></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              data-image="wildAnimalTag"
              name="pattern"
              id="wildAnimal"
              value={props.pattern}
              onChange={props.onPatternClick}
            />
            <label htmlFor="wildAnimal">
              <span
                className={
                  props.pattern === "wildAnimalTag" ? "activeInput" : ""
                }
              ></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              data-image="pinkTag"
              name="pattern"
              id="pink"
              value={props.pattern}
              onChange={props.onPatternClick}
            />
            <label htmlFor="pink">
              <span
                className={props.pattern === "pinkTag" ? "activeInput" : ""}
              ></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              data-image="blueTag"
              name="pattern"
              id="blue"
              value={props.pattern}
              onChange={props.onPatternClick}
            />
            <label htmlFor="blue">
              <span
                className={props.pattern === "blueTag" ? "activeInput" : ""}
              ></span>
            </label>
          </div>
          {/* product pricing */}
          <div className="productPrice">
            <span>$14.00 AUD</span>
            <button
              className="cartBtn"
              type="submit"
              onSubmit={props.handleSubmit}
            >
              Add to cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
