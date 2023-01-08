export interface Feur {
  id: string;
  reportedBy: User;
  timestamp: number;
  context: string;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}
