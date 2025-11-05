import User from "@/models/User";
import type { IProperty, IUser } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function SavedPropertiesPage() {
  const sessionUser = await getSessionUser();

  const userId = sessionUser?.userId;

  if (!userId) return <p>No user is logged</p>;

  const documentUser = await User.findById(userId)
    .populate("bookmarks")
    .lean<IUser>();

  const bookmarks = documentUser?.bookmarks ?? [];

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property: IProperty) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
