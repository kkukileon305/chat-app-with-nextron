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
