import React, { useCallback, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import { IUser } from '../../typings/ingstagram';
import Skeleton from 'react-loading-skeleton';

interface IUserInfoProps {
  profileUser: IUser;
  photosCount: number;
}

function UserInfo({ photosCount, profileUser }: IUserInfoProps) {
  const { activeUser, isLoggedIn } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [followerNumber, setFollowerNumber] = useState(profileUser.followers.length);

  useEffect(() => {
    async function isLoggedInUserFolloingProfile() {
      if (activeUser) {
        const result = await isUserFollowingProfile(activeUser.userId, profileUser.userId);
        setIsFollowingProfile(!!result);
      }
    }

    if (activeUser) {
      isLoggedInUserFolloingProfile();
    }
  }, [activeUser, profileUser]);

  const handleToggleFollow = useCallback(async () => {
    setIsFollowingProfile((prev) => !prev);
    setFollowerNumber((prev) => (isFollowingProfile ? prev - 1 : prev + 1));
    if (activeUser) {
      await toggleFollow(
        activeUser?.docId,
        profileUser.docId,
        activeUser?.userId,
        profileUser.userId,
        isFollowingProfile
      );
    }
  }, [activeUser, isFollowingProfile, profileUser]);

  const { following } = profileUser;

  return (
    <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto">
      <div className="container flex justify-center">
        <img
          className="flex w-40 h-40 rounded-full"
          src={`/images/avatars/${profileUser.username}.jpg`}
          alt="profile pic"
        />
      </div>
      <div className="flex flex-col items-center justify-center col-span-2">
        <div className="container flex items-center">
          <p className="mr-4 text-2xl">{profileUser.username}</p>
          {
            //? 로그인 한 유저에게만 팔로우 버튼이 보이게
            isLoggedIn && (
              <button
                type="button"
                aria-label="follow button"
                onClick={handleToggleFollow}
                className="w-20 h-8 text-sm font-bold text-white bg-blue-500 rounded"
              >
                {isFollowingProfile ? '언팔로우' : '팔로우'}
              </button>
            )
          }
        </div>
        <div className="container flex mt-4">
          {!profileUser && <Skeleton count={1} width={677} height={24} />}
          {profileUser && (
            <>
              <p className="mr-10">
                게시물<span className="font-bold"> {photosCount}</span>
              </p>
              <p className="mr-10">
                팔로워<span className="font-bold"> {followerNumber}</span>
              </p>
              <p className="mr-10">
                팔로우<span className="font-bold"> {following.length}</span>
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">{profileUser.fullName}</div>
      </div>
    </div>
  );
}

export default UserInfo;
