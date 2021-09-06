import React from 'react';
import { IPhotoWithDetail } from '../../typings/ingstagram';
import Actions from './Actions';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';
import Comment from './Comment';

interface IPostProps {
  content: IPhotoWithDetail;
}

function Post({ content }: IPostProps) {
  return (
    <div className="col-span-4 mb-12 bg-white border border-gray-200 rounded">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        likedPhoto={content.userLikedPhoto}
        totalLikes={content.likes.length}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comment
        docId={content.docId}
        comments={content.comments}
        dateCreated={content.dateCreated}
      />
    </div>
  );
}

export default Post;
