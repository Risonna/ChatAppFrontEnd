import ChatRoomMessages from './ChatRoomMessages';
import { useDispatch, useSelector } from 'react-redux';

const ChatPage = () => {
  const userId = useSelector((state) => state.userId.userId);
  const queryParameters = new URLSearchParams(window.location.search)
  const type = queryParameters.get("chatRoomId")

  return (
    <div>
      <ChatRoomMessages chatRoomId={type} />
    </div>
  );
};

export default ChatPage;
