import { forwardRef } from 'react';
import { MessageType } from '../../types/response';

type MessageProps = {
  message: MessageType;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(({ message }, ref) => {
  return (
    <div ref={ref} className='p-4 rounded-xl mb-4 text-white font-bold'>
      <div className='flex gap-4'>
        <p>{message.displayName}</p>
        <p>{message.createdAt}</p>
      </div>
      <p>{message.message}</p>
    </div>
  );
});

export default Message;
