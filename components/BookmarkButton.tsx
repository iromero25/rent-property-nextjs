"use client";

import { IProperty } from "@/types";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

interface BookmarkButtonProps {
  property: IProperty;
}

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBookmarkStatus(property._id)
      .then((res) => {
        if (res.error) toast.error(res.error);
        if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (e instanceof Error) {
          console.error(e.message);
        }
      })
      .finally(() => setLoading(false));
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  const isDisabled = !userId;
  const buttonLabel = isBookmarked ? "Remove Bookmark" : "Bookmark Property";
  const backgroundStyle = isBookmarked
    ? "bg-red-500 hover:bg-red-600"
    : "bg-blue-500 hover:bg-blue-600";

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${backgroundStyle}`}
    >
      <FaBookmark className="mr-2" />
      {buttonLabel}
    </button>
  );
};
export default BookmarkButton;
