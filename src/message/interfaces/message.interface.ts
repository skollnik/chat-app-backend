interface Message {
  text: string;
  timestamp: Date;
  chatId: number;
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IMessageInterface extends Message, User {
  message: Message;
  user: User;
}
