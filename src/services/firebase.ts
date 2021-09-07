import { IPhoto, IPhotoWithDetail, IUser } from './../typings/ingstagram.d';
import { FieldValue, firebase } from '../lib/firebase';

export async function doesUsernameExist(username: string): Promise<boolean> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data()).length > 0;
}

/**
 * 유저 아이디로 유저 정보 가져오기
 * @param userId
 * @returns
 */
export async function getUserByUserId(userId: string) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user: IUser[] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as any;

  return user[0];
}

export async function getUserByUsername(username: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  const user: IUser[] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as any;

  return user[0];
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

/**
 *
 * 팔로우 추가 및 삭제
 * @param loggedInUserDocId
 * @param profileId
 * @param isFollowingProfile if true, unfollow user else folllow user
 * @returns
 */
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

/**
 * 팔로워 추가 및 삭제
 * @param profileDocId
 * @param userId
 * @param isFollowingProfile
 * @returns
 */
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
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

export async function getPhotos(userId: string, following: string[]): Promise<IPhotoWithDetail[]> {
  //* 팔로우한 사람들의 사진 게시물들을 가져온다.
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos: IPhoto[] = result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  })) as any;

  // console.log('userFollowedPhotos: ', userFollowedPhotos);

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      //* 내가 좋아요 누른 사진인지 체크
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      //* 게시물 작성자의 이름을 가져온다.
      const { username } = await getUserByUserId(photo.userId);

      return {
        username,
        userLikedPhoto,
        ...photo,
      };
    })
  );

  return photosWithUserDetails;
}

/**
 * 해당 유저가 올린 사진들을 가져오기
 * @param userId
 * @returns
 */
export async function getUserPhotosByUserId(userId: string) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  const photos: IPhoto[] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as any;

  return photos;
}

/**
 * 로그인 한 유저가 해당 유저를 팔로우 했는지 유무
 * @param loggedInUserId
 * @param profileUserId
 */
export async function isUserFollowingProfile(loggedInUserId: string, profileUserId: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', loggedInUserId)
    .where('following', 'array-contains', profileUserId)
    .get();

  const followingUser: IUser[] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as any;

  return followingUser[0];
}

export async function toggleFollow(
  activeUserDocId: string,
  profileDocId: string,
  followingUserId: string,
  profileUserId: string,
  isFollowingProfile: boolean
) {
  console.log('activeuserId: ', activeUserDocId);

  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
