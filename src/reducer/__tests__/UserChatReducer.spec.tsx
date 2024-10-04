import { renderHook, act } from "@testing-library/react";
import useUserChatDataReducer from "../UserChatReducer";
import { USER_CHAT_DATA } from "@app/constants/constant.common";
import { UserIdKey } from "@app/types/type.common";

const id: UserIdKey = "user_id_0000";
const contactInfo = { id, name: "test user", profileImg: "" };

describe("useUserChatDataReducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default user chat data", () => {
    const { result } = renderHook(() => useUserChatDataReducer());
    expect(result.current.userChatData).toEqual(USER_CHAT_DATA);
  });

  it("should add a new message", () => {
    const { result } = renderHook(() => useUserChatDataReducer());
    act(() => {
      result.current.addMessage("Hello!", contactInfo);
    });
    expect(result.current.userChatData.chatData[contactInfo.id]).toHaveLength(
      1
    );
    expect(
      result.current.userChatData.chatData[contactInfo.id][0]
    ).toMatchObject({
      text: "Hello!",
    });
  });

  it("should delete a message", () => {
    const { result } = renderHook(() => useUserChatDataReducer());
    act(() => {
      result.current.addMessage("Hello!", contactInfo);
    });
    const messageKey =
      result.current.userChatData.chatData[contactInfo.id][0].id;
    act(() => {
      result.current.deleteMessage(contactInfo.id, messageKey);
    });
    expect(result.current.userChatData.chatData[contactInfo.id]).toHaveLength(
      0
    );
  });

  it("should edit a message", () => {
    const { result } = renderHook(() => useUserChatDataReducer());
    act(() => {
      result.current.addMessage("Hello!", contactInfo);
    });
    const messageKey =
      result.current.userChatData.chatData[contactInfo.id][0].id;
    act(() => {
      result.current.editMessage("Hi there!", contactInfo.id, messageKey);
    });
    expect(
      result.current.userChatData.chatData[contactInfo.id][0]
    ).toMatchObject({
      text: "Hi there!",
    });
  });

  it("should delete a chat", () => {
    const { result } = renderHook(() => useUserChatDataReducer());
    act(() => {
      result.current.addMessage("Hello!", contactInfo);
    });
    act(() => {
      result.current.deleteChat(contactInfo.id);
    });
    expect(result.current.userChatData.chatData).not.toHaveProperty(
      contactInfo.id
    );
  });

  it("should persist user chat data to localStorage", () => {
    const { result } = renderHook(() => useUserChatDataReducer());
    act(() => {
      result.current.addMessage("Hello!", contactInfo);
    });
    const savedData = JSON.parse(localStorage.getItem("userChat")!);
    expect(savedData.userChatData.chatData[contactInfo.id]).toHaveLength(1);
  });
});
