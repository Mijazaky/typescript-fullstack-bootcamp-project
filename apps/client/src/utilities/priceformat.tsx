export const formatPrice = (price: number): string => {
    const priceString = price.toString().padStart(4, '0'); // Ensure at least 4 digits
    const formattedPrice = `${priceString.slice(0, 2)}.${priceString.slice(2)}`;
    return formattedPrice;
  };