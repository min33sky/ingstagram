import React from 'react';

interface IFooterProps {
  username: string;
  caption: string;
}

function Footer({ caption, username }: IFooterProps) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  );
}

export default Footer;
