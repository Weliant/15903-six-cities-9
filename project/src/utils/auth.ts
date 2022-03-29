import { AuthorizationStatus } from '../consts';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus | undefined): boolean => authorizationStatus === AuthorizationStatus.Auth;
