import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../services/firebase';
import { IUser } from '../typings/ingstagram';
import SuggestedProfile from './SuggestedProfile';

interface ISuggestionsProps {
  userId: string;
  following: string[];
  loggedInUserDocId: string;
}

function Suggestions({ userId, following, loggedInUserDocId }: ISuggestionsProps) {
  const [profiles, setProfiles] = useState<IUser[]>([]);

  useEffect(() => {
    async function suggestedProfiles() {
      const response: IUser[] = (await getSuggestedProfiles(userId, following)) as any;
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [following, userId]);

  if (!profiles) {
    return <Skeleton count={1} height={150} className="mt-5" />;
  }

  return (
    <div className="flex flex-col rounded">
      <div className="flex items-center justify-between mb-2 text-sm">
        <p className="font-bold text-gray-700">Suggestions for you</p>
      </div>
      <div>
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileId={profile.userId}
            username={profile.username}
            userId={userId}
            profileDocId={profile.docId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
