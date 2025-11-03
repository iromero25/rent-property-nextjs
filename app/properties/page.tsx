import { IProperty } from "@/types";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";

export default async function PropertiesPage() {
  await connectDB();

  const properties = await Property.find({}).lean<IProperty[]>();

  console.log("properties", properties);

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
      </div>
    </section>
  );
}
