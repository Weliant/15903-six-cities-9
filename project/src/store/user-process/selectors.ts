import { AuthorizationStatus, NameSpace } from '../../consts';
import { State } from '../../types/state';
import { User } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getUser = (state: State): User | undefined => state[NameSpace.user].user;
