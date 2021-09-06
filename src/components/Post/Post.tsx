import React from 'react';
import { IPhotoWithDetail } from '../../typings/ingstagram';
import Header from './Header';

interface IPostProps {
  content: IPhotoWithDetail;
}

function Post({ content }: IPostProps) {
  return (
    <>
      <Header username={content.username} />
    </>
  );
}

export default Post;
