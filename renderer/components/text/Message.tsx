import { MessageType } from '../../types/response';

type MessageProps = {
  message: MessageType;
};

const Message = ({ message }: MessageProps) => {
  return (
    <div className='p-4 bg-gray-400 rounded-xl mb-4'>
      <div className='flex gap-4'>
        <p>{message.displayName}</p>
        <p>{message.createdAt}</p>
      </div>
      <p>{message.message}</p>
    </div>
  );
};
export default Message;
