import { getSession } from '@/server/lib/session';
import { ProfileForm } from './_components/profile-form-v2';
import { getUserInfo } from '@/server/queries/users';
import { ProfileTypes } from './_components/types';

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await getUserInfo(session.publicKey);

  return (
    <ProfileForm publicKey={session?.publicKey} user={user as ProfileTypes} />
  );
}
