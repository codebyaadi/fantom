import { Session, User } from "lucia";

export type ContextVariables = {
    user: User | null;
    session: Session | null;
};