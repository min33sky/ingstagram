import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import Post from './Post/Post';

function Timeline() {
  const { photos } = usePhotos();

  if (!photos) {
    return <Skeleton count={4} width={640} height={500} className="mb-5" />;
  }

  return (
    <div className="col-span-2">
      {photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p>No Photos</p>
      )}
    </div>
  );
}

export default Timeline;
