import { IUser } from './../typings/ingstagram.d';
import { FieldValue, firebase } from '../lib/firebase';
import { profile } from 'console';

export async function doesUsernameExist(username: string): Promise<boolean> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data()).length > 0;
}

export async function getUserByUserId(userId: string) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user: Promise<IUser[]> = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as any;

  return user;
}

//* 친구 추천
export async function getSuggestedProfiles(userId: string, following: string[]) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  //? 나와 이미 팔로잉된 회원들은 제외한다.
  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter((profile: any) => profile.userId !== userId && !following.includes(profile.userId));
}

//* 팔로우 추가
export async function updateLoggedInUserFollowing(
  loggedInUserDocId: string, // 로그인 한 유저
  profileId: string, // 팔로우 할 유저
  isFollowingProfile: boolean // true/false (언팔로우, 팔로우)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

//* 팔로워 추가
export async function updateFollowedUserFollowers(
  profileDocId: string, // 팔로우 대상
  userId: string, // 팔로워
  isFollowingProfile: boolean // true/false (언팔로우, 팔로우)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}
