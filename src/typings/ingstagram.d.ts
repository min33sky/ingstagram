/**
 * Current User Type
 */
export interface IUser {
  dateCreated: Date;
  docId: string;
  emailAddress: string;
  following: string[];
  fullName: string;
  userId: string;
  username: string;
}
