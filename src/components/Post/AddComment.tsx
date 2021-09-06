import React, { useCallback, useContext, useState } from 'react';
import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/userContext';

interface IAddCommentProps {
  docId: string;
  setChangeComments: React.Dispatch<
    React.SetStateAction<
      {
        comment: string;
        displayName: string;
      }[]
    >
  >;
}

/**
 * 게시물 댓글 입력 컴포넌트
 * @param param0
 * @returns
 */
function AddComment({ docId, setChangeComments }: IAddCommentProps) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (user) {
        const name = user.displayName || 'no_nickname';
        setChangeComments((prev) => [{ displayName: name, comment }, ...prev]);
        setComment('');

        //* DB 업데이트
        firebase
          ?.firestore()
          .collection('photos')
          .doc(docId)
          .update({
            comments: FieldValue?.arrayUnion({ displayName: name, comment }),
          });
      }
    },
    [comment, setChangeComments, user, docId, FieldValue, firebase]
  );

  return (
    <div className="border-t border-gray-200">
      <form onSubmit={handleSubmitComment} className="flex justify-between pl-0 pr-5">
        <input
          type="text"
          aria-label="Add a comment"
          name="add-comment"
          autoComplete="off"
          placeholder="댓글을 입력하세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-5 mr-3 text-sm text-gray-500 outline-none"
        />
        <button
          type="submit"
          disabled={!comment}
          className={`text-sm font-bold text-blue-500 flex-shrink-0 ${
            !comment && 'opacity-50 cursor-not-allowed'
          }`}
        >
          게시
        </button>
      </form>
    </div>
  );
}

export default AddComment;
