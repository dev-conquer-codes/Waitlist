// components/UserSync.tsx
'use client'
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

const UserSync = () => {
  const { user, isSignedIn } = useUser();
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user || isSynced) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RENDER}/user/add_user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recordId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
          }),
        });

        const result = await response.json();
        console.log('User synced:', result);
        setIsSynced(true);
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUser();
  }, [user, isSignedIn, isSynced]);

  return null; // this component just runs logic, no UI needed
};

export default UserSync;
