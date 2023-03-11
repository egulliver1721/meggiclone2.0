import React from 'react';

interface ProductConfigurationProps {
  pattern: string;
  onPatternClick: (pattern: string) => void;
  handleSubmit: (e: any) => void;
}

export default function ProductConfiguration(props: ProductConfigurationProps) {
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
              onClick={() => props.onPatternClick('rainbowTag')}
            />
            <label htmlFor="rainbow">
              <span className={props.pattern === 'rainbowTag' ? 'activeInput' : ''}></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              data-image="wildAnimalTag"
              name="pattern"
              id="wildAnimal"
              value={props.pattern}
              onClick={() => props.onPatternClick('wildAnimalTag')}
            />
            <label htmlFor="wildAnimal">
              <span className={props.pattern === 'wildAnimalTag' ? 'activeInput' : ''}></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              data-image="pinkTag"
              name="pattern"
              id="pink"
              value={props.pattern}
              onClick={() => props.onPatternClick('pinkTag')}
            />
            <label htmlFor="pink">
              <span className={props.pattern === 'pinkTag' ? 'activeInput' : ''}></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              data-image="blueTag"
              name="pattern"
              id="blue"
              value={props.pattern}
              onClick={() => props.onPatternClick('blueTag')}
            />
            <label htmlFor="blue">
              <span className={props.pattern === 'blueTag' ? 'activeInput' : ''}></span>
            </label>
          </div>
          {/* product pricing */}
          <div className="productPrice">
            <span>$14.00 AUD</span>
            <button className="cartBtn" type="submit" onSubmit={props.handleSubmit}>
              Add to cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
