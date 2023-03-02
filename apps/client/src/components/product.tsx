import React from 'react';
import ProductImage from './productImage';
import ProductConfiguration from './productConfiguration';

export default function Product(props) {
  const { onPatternClick, handleSubmit, pattern } = props;

  return (
    <main className="container">
      <ProductImage pattern={pattern} />
      {/* product description */}
      <div className="rightColumn">
        <div className="productDescription">
          <h1>Nappy Bag Tags</h1>
          <p>The ultimate orgnisation accessory for parents or carers of young children.</p>
        </div>
        <ProductConfiguration pattern={pattern} onPatternClick={onPatternClick} handleSubmit={handleSubmit} />
      </div>
    </main>
  );
}
