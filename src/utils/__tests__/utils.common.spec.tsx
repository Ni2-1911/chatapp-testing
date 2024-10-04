import {
  getTimeFormat,
  deleteMessageFromDB,
  generateNewMessage,
  addMessageToDB,
  getLatestMessagefromDB,
} from "../utils.common";
import { UserChatData, UserIdKey } from "@app/types/type.common";

describe("Chat Utility Functions", () => {
  describe("getTimeFormat", () => {
    it("should format the time correctly", () => {
      const date = new Date("2024-01-01T12:05:00");
      expect(getTimeFormat(date)).toBe("12:05");
    });

    it("should format single-digit hours and minutes correctly", () => {
      const date = new Date("2024-01-01T01:02:00");
      expect(getTimeFormat(date)).toBe("01:02");
    });
  });

  describe("deleteMessageFromDB", () => {
    it("should delete the specified message", () => {
      const id: UserIdKey = "user_id_0000";
      const userChatData: UserChatData = {
        id,
        name: "test user",
        profileImg: "",
        chatData: {
          [id]: [
            { id: "msg1", text: "Hello", time: new Date() },
            { id: "msg2", text: "World", time: new Date() },
          ],
        },
      };
      const updatedData = deleteMessageFromDB(userChatData, id, "msg1");
      expect(updatedData.chatData[id]).toHaveLength(1);
      expect(updatedData.chatData[id]).not.toContainEqual(
        expect.objectContaining({ id: "msg1" })
      );
    });
  });

  describe("generateNewMessage", () => {
    it("should generate a new message with the correct structure", () => {
      const messageText = "Hello!";
      const newMessage = generateNewMessage(messageText);
      expect(newMessage).toHaveProperty("id");
      expect(newMessage).toHaveProperty("text", messageText);
      expect(newMessage).toHaveProperty("time");
    });
  });

  describe("addMessageToDB", () => {
    it("should add a new message to the user chat data", () => {
      const id: UserIdKey = "user_id_0000";
      const userChatData: UserChatData = {
        id,
        name: "name",
        profileImg: "",
        chatData: {
          [id]: [],
        },
      };
      const updatedData = addMessageToDB(userChatData, id, "Hello!");
      expect(updatedData.chatData[id]).toHaveLength(1);
      expect(updatedData.chatData[id][0]).toHaveProperty("text", "Hello!");
    });
  });

  describe("getLatestMessagefromDB", () => {
    it("should return the latest message for each user", () => {
      const id1: UserIdKey = "user_id_0000";
      const id2: UserIdKey = "user_id_0001";
      const userChatData: UserChatData = {
        id: id1,
        name: "test user",
        profileImg: "",
        chatData: {
          [id1]: [
            { id: "msg1", text: "Hello", time: new Date() },
            { id: "msg2", text: "World", time: new Date() },
          ],
          [id2]: [{ id: "msg3", text: "Foo", time: new Date() }],
        },
      };
      const latestMessages = getLatestMessagefromDB(userChatData);
      expect(latestMessages[id1]).toEqual(
        expect.objectContaining({ text: "World" })
      );
      expect(latestMessages[id2]).toEqual(
        expect.objectContaining({ text: "Foo" })
      );
    });
  });
});
