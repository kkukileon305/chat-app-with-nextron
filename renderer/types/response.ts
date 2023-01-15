export interface ChatRoomsResponse {
  [key: string]: Omit<ChatRoom, 'key'>;
}

export type ChatRoomResponse = Omit<ChatRoom, 'key'>;

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

export interface MessageResponse {
  [key: string]: Omit<MessageType, 'key'>;
}

export interface MessageType {
  key: string;
  createdAt: string;
  displayName: string;
  message: string;
}
