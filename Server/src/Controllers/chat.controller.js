import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../Models/chat.Modlel.js";
import { Message } from "../Models/message.Modle.js";
import { User } from "../Models/user.Modle.js";

// "accessChat" is created for creating a new chat with user
const accessChat = AsyncHandeller(async (req, res, next) => {
  const { searchedUserId } = req.body;
  const { _id } = req.userData;

  const isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: _id } } },
      { users: { $elemMatch: { $eq: searchedUserId } } },
    ],
  });

  if (isChat.length > 0) {
    return next({ message: "This Chat already exist" });
  }

  try {
    const createdChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [_id, searchedUserId],
    });

    const chatAfterCreation = await Chat.findOne({
      _id: createdChat._id,
    }).populate("users", "-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, chatAfterCreation, "chat creation successfull")
      );
  } catch (error) {
    throw new Error(error.message);
  }
});

const fetchChat = AsyncHandeller(async (req, res, next) => {
  const { _id } = req.userData;

  const chats = await Chat.find({
    isGroupChat: false,
    users: { $elemMatch: { $eq: _id } },
  })
    .populate({
      path: "users",
      select: "-password",
    })
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name email avatar",
      },
    })
    .sort({ createdAt: -1 });

  if (Chat.length === 0) {
    return next({
      message: "no chat found",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "users chats fetched successfully"));
});

const sendMessage = AsyncHandeller(async (req, res, next) => {
  const { chatId } = req.params;
  const { _id } = req.userData;
  const { content } = req.body;

  if (!chatId || !_id) {
    return next({
      message: "Server error! plz try after some time",
    });
  }

  if (!content || content === "") {
    return next({
      message: "text filed is empty",
    });
  }

  try {
    let createdMsg = await Message.create({
      sender: _id,
      content,
      chat: chatId,
    });

    createdMsg = await createdMsg.populate("sender", "name avatar")
    createdMsg = await createdMsg.populate("chat");
    createdMsg = await User.populate(createdMsg, {
      path: "chat.users",
      select: "name avatar email",
    });

    await Chat.findByIdAndUpdate(
      {
        _id: chatId,
      },
      { latestMessage: createdMsg._id },
      { new: true }
    );
   
    return res
      .status(200)
      .json(new ApiResponse(200, createdMsg, "message added Successfully"));
  } catch (error) {
    console.log(error);
  }
});

const fetchMessagesOfChat = AsyncHandeller(async (req, res, next) => {
  const { chatId } = req.params;

  const messageList = await Message.find({
    chat: chatId,
  }).populate("sender", "name email avatar").populate("chat").sort({createdAt:1});

  if (messageList.length === 0) {
    return res.json({
      status:200,
      message: "no message exist for these chat",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, messageList, "message fetch successfull"));
});

export { accessChat, fetchChat, sendMessage, fetchMessagesOfChat };
