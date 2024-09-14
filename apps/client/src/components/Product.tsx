import { useQuery } from "@tanstack/react-query";
import { ProductResponseDto } from "../../../../packages/dto";
import { formatPrice } from "../utilities/priceformat";
import { useState } from "react";

export const BookInfo = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCollection, setSelectedCollection] = useState<number | undefined>(undefined);

  
  const { data, isLoading, error } = useQuery<ProductResponseDto[]>({
    queryKey: ['books', sortOrder, selectedCollection],
    queryFn: () =>
      fetch(`http://localhost:5001/api/book?sort=${sortOrder}&collectionId=${selectedCollection ?? ''}`)
        .then((result) => result.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books</div>;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(Number(e.target.value) || undefined);
  };

  return (
    <div className="p-4">
      {/* Sort dropdown */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-gray-700">Sort by price:</label>
        <select
          className="bg-white border border-gray-300 rounded-md p-2"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      {/* Collection filter dropdown */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-gray-700">Filter by collection:</label>
        <select
          className="bg-white border border-gray-300 rounded-md p-2"
          value={selectedCollection ?? ''}
          onChange={handleCollectionChange}
        >
          <option value="">All Collections</option>
          <option value="1">Collection 1</option>
          <option value="2">Collection 2</option>
          <option value="3">Collection 3</option>
        </select>
      </div>

      {/* Display books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data?.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold mb-2">{item.name}</h1>
            <h2 className="text-lg text-gray-700 mb-2">{item.author}</h2>
            <h2 className="text-lg font-bold mb-2">${formatPrice(item.price)}</h2>
            <img
              src={item.image}
              alt={item.name}
              width="100"
              height="200"
              className="rounded-md mb-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
