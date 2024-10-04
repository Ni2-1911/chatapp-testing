import {
  DeleteMessage,
  EditMessage,
  Message,
  UserChatData,
  UserIdKey,
  ViewMode,
} from "../../../types/type.common";
import DefaultMessage from "./message/DefaultMessage";
import SentMessage from "./message/SentMessage";
import { useRef, useEffect } from "react";
export default function ChatBox({
  userId,
  viewMode,
  userChatData,
  editMessage,
  deleteMessage,
}: {
  userId: UserIdKey;
  viewMode: ViewMode;
  userChatData: UserChatData;
  editMessage: EditMessage;
  deleteMessage: DeleteMessage;
}) {
  const conversation = userChatData.chatData[userId] || [];
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollTo({
        top: endOfMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation]);
  return (
    <div ref={endOfMessagesRef} className="chatBox flex-col">
      <DefaultMessage />
      {conversation.length ? (
        <>
          {conversation.map((message: Message) => {
            return (
              <>
                <SentMessage
                  key={message.id}
                  viewMode={viewMode}
                  text={message.text}
                  time={message.time}
                  userId={userId}
                  messageKey={message.id}
                  editMessage={editMessage}
                  deleteMessage={deleteMessage}
                />
              </>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
