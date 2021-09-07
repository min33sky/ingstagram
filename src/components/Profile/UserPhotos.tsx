import React from 'react';
import { IPhoto } from '../../typings/ingstagram';

interface IUserPhotos {
  photos: IPhoto[];
}

function UserPhotos({ photos }: IUserPhotos) {
  return (
    <div>
      <p>사진 앨범이 나올 공간</p>
    </div>
  );
}

export default UserPhotos;
