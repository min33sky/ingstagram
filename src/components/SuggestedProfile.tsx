import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../services/firebase';

interface ISuggestedProfileProps {
  username: string;
  profileId: string;
  userId: string;
  profileDocId: string; // 팔로우 추천 id
  loggedInUserDocId: string; // 로그인 한 유저의 id
}

function SuggestedProfile({
  profileId,
  profileDocId,
  userId,
  username,
  loggedInUserDocId,
}: ISuggestedProfileProps) {
  const [followed, setFollowed] = useState(false);

  //* 팔로우 핸들러
  const handleFollowUser = useCallback(async () => {
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    setFollowed(true);
  }, [loggedInUserDocId, profileId, profileDocId, userId]);

  if (followed) return null;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt="avatar"
          className="flex w-8 mr-3 rounded-full"
        />
        <Link to={`/p/${username}`}>
          <p className="text-sm font-bold">{username}</p>
        </Link>
      </div>
      <button
        className="mr-5 text-xs font-bold text-blue-500"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  );
}

export default SuggestedProfile;
