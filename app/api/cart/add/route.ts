import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
/**
 * Add a product to the cart
 * to call this endpoint, send a POST request with the following body:
 * curl -X POST /api/cart/add -d '{"userId": 1, "productId": 1, "count": 1}'
 */
export async function POST(req: NextRequest) {
  // get the id of the product as well as the user id
  const { userId, productId, count, method, selectedcolor, selectedsize } =
    await req.json();

  if (method === "add") {
    if (!userId || !productId) {
      return new NextResponse("Missing userid or productId", { status: 400 });
    }
    let newSelectedColor: string;
    let newSelectedSize: string;
    //Next get the cart associated with the user
    const cartRequest = await sql`SELECT * FROM cart WHERE userid = ${userId}`;

    if (!selectedcolor) {
      newSelectedColor = "default";
    } else {
      newSelectedColor = selectedcolor;
    }
    if (!selectedsize) {
      newSelectedSize = "default";
    } else {
      newSelectedSize = selectedsize;
    }
    //If the cart does not exist, create a new cart
    if (cartRequest.rowCount === 0) {
      const cartidresult =
        await sql`INSERT INTO cart (userid, createdat) VALUES (${userId}, NOW()) RETURNING id`;
      const cartId = cartidresult.rows[0].id;

      //Insert the product into the cart

      await sql`INSERT INTO cartitem (cartid, productid, count,selectedcolor,selectedsize) VALUES (${cartId}, ${productId}, ${count},${newSelectedColor},${newSelectedSize})`;
    }
    //If the cart exists, add the product to the cart
    else {
      const cartId = cartRequest.rows[0].id;
      const cartItemRequest =
        await sql`SELECT * FROM cartitem WHERE cartid = ${cartId} AND productid = ${productId}`;

      if (cartItemRequest.rowCount === 0) {
        await sql`INSERT INTO cartitem (cartid, productid, count,selectedcolor,selectedsize) VALUES (${cartId}, ${productId}, ${count},${newSelectedColor},${newSelectedSize})`;
      } else {
        const newCount = cartItemRequest.rows[0].count + count;

        await sql`UPDATE cartitem SET count = ${newCount} WHERE cartid = ${cartId} AND productid = ${productId}`;
      }
    }

    return new NextResponse("Item added to cart successfully", { status: 200 });
  }
  if (method === "remove") {
    const cartIdRequest =
      await sql`SELECT id FROM cart WHERE userid = ${userId}`;
    const cartId = cartIdRequest.rows[0].id;

    if (cartId.rowCount === 0) {
      return new NextResponse("Cart does not exist", { status: 400 });
    }
    const cartItemRequest =
      await sql`SELECT * FROM cartitem WHERE cartid = ${cartId} AND productid = ${productId}`;
    const cartItemId = cartItemRequest.rows[0].id;

    if (cartItemId.rowCount === 0) {
      return new NextResponse("Item does not exist in cart", { status: 400 });
    }
    // remove the amount of the product from the cart depending on the count
    const itemCount = cartItemRequest.rows[0].count;

    const newCount = itemCount - count;

    if (newCount <= 0) {
      await sql`DELETE FROM cartitem WHERE cartid = ${cartId} AND productid = ${productId}`;
    } else {
      await sql`UPDATE cartitem SET count = ${newCount} WHERE cartid = ${cartId} AND productid = ${productId}`;
    }

    return new NextResponse("Item removed from cart successfully", {
      status: 200,
    });
  }
}
