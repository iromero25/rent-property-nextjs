"use server";

import Message from "@/models/Message";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

export const deleteMessage = async (messageId: string) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message Not Found");

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  // revalidate cache
  revalidatePath("/messages", "page");
};
