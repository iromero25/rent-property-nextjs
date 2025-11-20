import Link from "next/link";
import { IPropertyDoc } from "@/types";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { FaArrowLeft } from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyDetails from "@/components/PropertyDetails";
import { PropertyImages } from "@/components/PropertyImages";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { convertToSerializeableObject } from "@/utils/convertToObject";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  await connectDB();
  const { id } = await params;
  const propertyDoc = await Property.findById(id).lean<IPropertyDoc>();

  if (!propertyDoc) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  const property = convertToSerializeableObject(propertyDoc);

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}
