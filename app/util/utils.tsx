import { User } from "../types/types";
interface AddToCartProps {
  productId: number;
  count: number;
  user: User;
  method: string;
}

export async function addToCart({
  productId,
  count,
  user,
  method,
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
    method: method,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //fetch("http://localhost:3000/api/cart/add", requestOptions)
  //  .then(async (response) => await response.text())
  //  .then((result) => {
  //    return result;
  //  })
  //  .catch((error) => console.error(error));
  const response = fetch("/api/cart/add", requestOptions);

  if ((await response).status === 200) {
    const data = await response;

    return data;
  }

  return { status: 400, error: "something went wrong" };
}
