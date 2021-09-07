import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { IPhoto } from '../../typings/ingstagram';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline';

interface IUserPhotos {
  photos: IPhoto[];
}

function UserPhotos({ photos }: IUserPhotos) {
  console.log('photos: ', photos);
  return (
    <div className="h-16 pt-4 mt-12 border-t border-gray-200">
      <div className="grid grid-cols-3 gap-1 mt-4 mb-12 sm:mx-4 sm:gap-8">
        {!photos && (
          <div className="">
            <Skeleton count={12} width={310} height={400} />
          </div>
        )}
        {photos.length > 0 &&
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className="absolute top-0 left-0 z-10 items-center hidden w-full h-full bg-black opacity-50 cursor-pointer justify-evenly group-hover:flex ">
                <div className="space-y-0 text-white">
                  <div className="flex items-center space-x-2">
                    <HeartIcon className="h-4" />
                    <p>{photo.likes.length}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChatIcon className="h-4" />
                    <p>{photo.comments.length}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserPhotos;
