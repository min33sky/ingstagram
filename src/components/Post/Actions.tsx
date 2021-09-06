import React, { useCallback, useContext, useState } from 'react';
import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/userContext';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline';

interface IActionsProps {
  docId: string;
  totalLikes: number;
  likedPhoto: boolean;
}

function Actions({ docId, likedPhoto, totalLikes }: IActionsProps) {
  const [toggledLike, setToggledLike] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { user } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = useCallback(async () => {
    setToggledLike((prev) => !prev);
    setLikes((likes) => (toggledLike ? likes - 1 : likes + 1));

    if (user) {
      await firebase
        ?.firestore()
        .collection('photos')
        .doc(docId)
        .update({
          likes: toggledLike ? FieldValue?.arrayRemove(user.uid) : FieldValue?.arrayUnion(user.uid),
        });
    }
  }, [FieldValue, docId, firebase, toggledLike, user]);

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <div>
            <HeartIcon
              className={`w-8 mr-4 cursor-pointer select-none ${
                toggledLike && 'fill-current text-red-500'
              }`}
              onClick={handleToggleLiked}
            />
          </div>
          <div>
            <ChatIcon className="w-8 cursor-pointer select-none" />
          </div>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">좋아요 {likes}개</p>
      </div>
    </>
  );
}

export default Actions;
