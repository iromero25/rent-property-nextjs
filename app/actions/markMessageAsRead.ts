"use server";

import Message from "@/models/Message";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

export const markMessageAsRead = async (messageId: string) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message not found");

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  message.read = !message.read;

  await message.save();

  revalidatePath("/messages", "page");

  return message.read;
};
