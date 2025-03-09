import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../Models/chat.Modlel.js";

const accessChat = AsyncHandeller(async (req, res, next) => {
  const { searchedUserId } = req.body;
  const { _id } = req.userData;

  const isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: _id } } },
      { users: { $elemMatch: { $eq: searchedUserId } } },
    ],
  })
    .populate({
      path: "users",
      select: "-password",
    })
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name avatar email",
      },
    });

  if (isChat.length > 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, isChat[0], "chat fetched successfull"));
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
    });

  if (Chat.length === 0) {
    return next({
      message: "no chat found",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "users chats fetched successfully"));
});

export { accessChat, fetchChat };
