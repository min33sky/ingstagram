import React, { useEffect, useState } from 'react';
import { getUserPhotosByUserId } from '../../services/firebase';
import { IPhoto, IUser } from '../../typings/ingstagram';
import UserInfo from './UserInfo';
import UserPhotos from './UserPhotos';

interface IUserProfilePros {
  user: IUser;
}

function UserProfile({ user }: IUserProfilePros) {
  const [photosCollection, setPhotosCollection] = useState<IPhoto[]>([]);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const result = await getUserPhotosByUserId(user.userId);
      setPhotosCollection(result);
    }

    getProfileInfoAndPhotos();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <UserInfo photosCount={photosCollection.length} profileUser={user} />
      <UserPhotos photos={photosCollection} />
    </div>
  );
}

export default UserProfile;
