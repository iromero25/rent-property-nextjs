"use server";

import Message from "@/models/Message";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function addMessage(
  _previousState: FormData,
  formData: FormData
) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: "You must be logged in to send a message" };
  }

  const { user } = sessionUser;

  const recipient = formData.get("recipient");

  if (user.id === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    sender: user.id,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });

  await newMessage.save();

  return { submitted: true };
}
