export interface ChatRoomsResponse {
  [key: string]: Omit<ChatRoom, 'key'>;
}

export interface ChatRoom {
  key: string;
  createdAt: string;
  creator: string;
  creatorEmail: string;
  name: string;
}

export interface UsersResponse {
  [uid: string]: UserResponse;
}

export type UserResponse = Omit<User, 'uid'>;

export interface User {
  uid: string;
  displayName: string;
  email: string;
  createdAt: string;
}
