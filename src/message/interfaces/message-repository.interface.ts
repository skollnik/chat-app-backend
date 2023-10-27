export interface IMessageRepository {
  newMessage(
    text: string,
    timestamp: Date,
    chatId: number,
    userId: number,
  ): Promise<any>;
  getAllMessagesByChatId(chatId: number);
}
