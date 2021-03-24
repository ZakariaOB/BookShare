export interface RegisterUser {
  username: string;
  knownAs: string;
  gender: string;
  dateOfBirth: Date | string;
  cityId: number;
  password: string;
}
