import React from 'react';
import { Link } from 'react-router-dom';

interface ICommentProps {
  docId: string;
  comments: {
    comment: string;
    displayName: string;
  }[];
  dateCreated: number;
}

function Comment({ docId, comments, dateCreated }: ICommentProps) {
  return (
    <div className="p-4 pt-1 pb-4">
      {
        // TODO: 3개로 수정
        comments.length >= 1 && (
          <p className="mb-1 text-sm text-gray-500 cursor-pointer">
            댓글 {comments.length}개 모두 보기
          </p>
        )
      }
      {comments.slice(0, 3).map((comment) => (
        <p>
          <Link to={`/p/${comment.displayName}`}>
            <span className="mr-1 font-bold">{comment.displayName}</span>
          </Link>
          <span>{comment.comment}</span>
        </p>
      ))}
      <p className="mt-2 text-xs text-gray-500 uppercase">{dateCreated}</p>
    </div>
  );
}

export default Comment;
