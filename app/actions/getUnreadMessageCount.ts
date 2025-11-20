"use server";

import Message from "@/models/Message";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

export const getUnreadMessageCount = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
};
