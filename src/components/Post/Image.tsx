import React from 'react';

interface IImageProps {
  src: string;
  caption: string;
}

function Image({ caption, src }: IImageProps) {
  return <img src={src} alt={caption} />;
}

export default Image;
