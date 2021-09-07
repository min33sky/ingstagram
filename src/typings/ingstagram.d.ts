/**
 * 로그인 한 유저의 타입
 */
export interface IUser {
  dateCreated: Date;
  docId: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  fullName: string;
  userId: string;
  username: string;
}

/**
 * 사진 게시물 타입
 */
export interface IPhoto {
  caption: string;
  comments: { comment: string; displayName: string }[];
  dateCreated: number;
  docId: string;
  imageSrc: string;
  likes: string[];
  photoId: number;
  userId: string;
  userLatitude: string;
  userLongitude: string;
}

export interface IPhotoWithDetail {
  caption: string;
  comments: {
    comment: string;
    displayName: string;
  }[];
  dateCreated: number;
  docId: string;
  imageSrc: string;
  likes: string[];
  photoId: number;
  userId: string;
  userLatitude: string;
  userLongitude: string;
  //? 추가 부분
  username: string;
  userLikedPhoto: boolean;
}
