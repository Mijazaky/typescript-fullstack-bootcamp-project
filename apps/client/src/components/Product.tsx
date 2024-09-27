import { useQuery } from "@tanstack/react-query";
import { ProductResponseDto } from "../../../../packages/dto";
import { formatPrice } from "../utilities/priceformat";
import { useState } from "react";

export const BookInfo = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCollection, setSelectedCollection] = useState<number | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');

  // Fetch books with sort, filter, and search applied
  const { data: products, isLoading, error, refetch } = useQuery<ProductResponseDto[]>({
    queryKey: ['books', sortOrder, selectedCollection, searchText],
    queryFn: () =>
      fetch(`http://localhost:5001/api/book?sort=${sortOrder}&collectionId=${selectedCollection ?? ''}&searchText=${searchText}`)
        .then((result) => result.json()),
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
    refetch(); // Trigger refetch after changing the sort order
  };

  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(Number(e.target.value) || undefined);
    refetch(); // Trigger refetch after changing the collection
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    refetch(); // Trigger refetch after clicking the search button
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

      {/* Search input */}
      <div className="mb-4">
        <label className="mr-2 text-gray-700">Search:</label>
        <input
          type="text"
          className="bg-white border border-gray-300 rounded-md p-2"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by name..."
        />
        <button
          onClick={handleSearchClick}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Display books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error fetching books</div>
        ) : products && products.length > 0 ? (
          products.map((item) => (
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
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};
