import { User } from "../types/types";
interface AddToCartProps {
  productId: number;
  count: number;
  user: User;
}

export async function addToCart({ productId, count, user }: AddToCartProps) {
  if (!user || !user.id) {
    return;
  }

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    userId: user.id,
    productId: productId,
    count: count,
    method: "add",
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = fetch("/api/cart/add", requestOptions);

  if ((await response).status === 200) {
    const data = await response;

    return data;
  }

  return { status: 400, error: "something went wrong" };
}
export async function removeFromCart({
  productId,
  count,
  user,
}: AddToCartProps) {
  if (!user || !user.id) {
    return;
  }

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    userId: user.id,
    productId: productId,
    count: count,
    method: "remove",
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = fetch("/api/cart/add", requestOptions);

  if ((await response).status === 200) {
    const data = await response;

    return data;
  }

  return { status: 400, error: "something went wrong" };
}
