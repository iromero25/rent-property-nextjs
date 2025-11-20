import { IProperty } from "@/types";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";
import { Pagination } from "@/components/Pagination";

interface PropertiesPageProps {
  searchParams: Promise<{
    pageSize?: string;
    page?: string;
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  await connectDB();
  const { pageSize = "2", page = "1" } = await searchParams;
  const parsedPageSize = parseInt(pageSize);
  const parsedPage = parseInt(page);

  const skip = (parsedPage - 1) * parsedPageSize;

  const total = await Property.countDocuments({});
  const properties = await Property.find<IProperty>({})
    .skip(skip)
    .limit(parsedPageSize);
  const showPagination = total > parsedPageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Browse Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={`property-${index}`} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parsedPage}
            pageSize={parsedPageSize}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
}
