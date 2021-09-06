import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';
import { getPhotos, getUserByUserId } from '../services/firebase';
import { IPhotoWithDetail } from '../typings/ingstagram';

export default function usePhotos() {
  const [photos, setPhotos] = useState<IPhotoWithDetail[] | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user) {
        const { uid: userId } = user;
        const { following } = await getUserByUserId(userId);
        let followedUserPhotos: IPhotoWithDetail[] = [];

        //* 팔로우한 사람들의 사진을 가져온다.
        if (following.length > 0) {
          followedUserPhotos = await getPhotos(userId, following);
        }

        followedUserPhotos.sort((a, b) => (b.dateCreated = a.dateCreated));
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();

    return () => {};
  }, [user]);

  return { photos };
}
