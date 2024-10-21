import { useUser } from "@/app/contexts/UserContext";

interface AddToCartProps {
  productId: number;
  count: number;
  method: string;
}

export function useAddToCart() {
  const { user } = useUser();
  const handleAddToCart = async ({
    productId,
    count,
    method,
  }: AddToCartProps) => {
    if (!user || !user.id) {
      return;
    }

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
          count: count,
          method: method,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      //fetchCartItems();
    } catch (err) {
      console.error("Error adding item to cart:", err);
      // Optionally, show an error message to the user
    }
  };

  return { handleAddToCart };
}
