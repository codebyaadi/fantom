export type ProfileTypes = {
  username: string;
  email: string;
  bio: string;
  avatar: string;
  banner: string;
};

export interface ProfileProps {
  publicKey: string;
  user: ProfileTypes;
}
