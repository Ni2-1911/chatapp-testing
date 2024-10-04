import { UserChatData, Contact } from "../types/type.common";

export const DEFAULT_PROFILE_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg";
export const USER_CHAT_DATA: UserChatData = {
  id: "user_id_0",
  name: "Fujizumi Hokusaburo",
  profileImg: "https://cdn-icons-png.freepik.com/512/147/147137.png",
  chatData: {
    user_id_1: [
      {
        id: "1",
        text: "Hello! How are you today? Hope you're having a wonderful day and everything is going well!",
        time: new Date(),
      },
      {
        id: "2",
        text: "Just wanted to check in on you. Let me know if you need anything or if I can help you.",
        time: new Date(),
      },
      {
        id: "3",
        text: "Have you seen the latest news? I think it’s important to stay updated on current events.",
        time: new Date(),
      },
      {
        id: "4",
        text: "Let's plan a meeting for next week. We have a lot to discuss about the upcoming project.",
        time: new Date(),
      },
      {
        id: "5",
        text: "Don't forget about our project deadline! It's crucial that we stay on track for success.",
        time: new Date(),
      },
      {
        id: "6",
        text: "How's everything going with your family? I hope everyone is doing well and staying happy.",
        time: new Date(),
      },
      {
        id: "7",
        text: "I found a great new coffee shop! They have amazing coffee and a cozy atmosphere to relax.",
        time: new Date(),
      },
      {
        id: "8",
        text: "Are you interested in joining the book club? We have some interesting books lined up for discussion!",
        time: new Date(),
      },
    ],
  },
};
export const DEFAULT_USER: Contact[] = [
  {
    id: "user_id_1",
    name: "DEMO",
    profileImg:
      "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
  },
];
export const DIALOG_BOX_DATA = {
  newConversation: {
    inputData: "Type the name",
    buttonData: "start a new chat",
  },
  deleteConversation: {
    inputData: "Are you sure you want to delete",
    buttonData: "yes",
  },
  editMessage: {
    inputData: "Message text",
    buttonData: "save",
  },
};
