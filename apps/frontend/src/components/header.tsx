import React from 'react';

export default function Header(props) {
  return (
    <div
      className='heroImage'
      style={{
        '--img': `url(${props.heroImage}), 
      linear-gradient(#e66465, #9198e5)`,
      }}
    >
      <h1 className='heading'>We're getting organised over here.</h1>
      <p className='description'>
        The ultimate organisation tool for you and your family.
      </p>
      <div className='buttonDiv center'>
        <a
          className='button'
          href='www.google.com'
        >
          Shop Tags
        </a>
      </div>
    </div>
  );
}
