// "use client";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  console.log("PropertyPage");

  const { id } = await params;

  return <div>Property page {id}</div>;
}
