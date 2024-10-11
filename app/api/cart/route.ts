import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  //  console.log("json: ", req);
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    // Step 1: Get the cart for the user
    const cartResult = await sql`SELECT id FROM cart WHERE userid = ${userId}`;

    if (cartResult.rows.length === 0) {
      return NextResponse.json({
        status: 400,
        message: "Cart not found for this user",
      });
    }

    const cartId = cartResult.rows[0].id;

    // Step 2: Get all items in the cart with product details
    const cartItemsResult = await sql`
      SELECT
            p.id,
            p.name AS product_name,
            p.price,
            p.stock,
            p.material,
            p.createdat,
            p.categoryid,
            p.image_path,
            p.description,
            p.subcategoryid,
            ci.count
        FROM
            cartitem ci
        JOIN
            products p ON ci.productid = p.id
        WHERE
            ci.cartid =${cartId};`;

    if (cartItemsResult.rows.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json({ cartid: cartId, items: cartItemsResult.rows });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

export async function POST(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const method = searchParams.get("method");

  if (method === "add") {
    const { userId, productId, quantity } = await req.json();

    try {
      // Step 1: Check if the user has a cart
      const cartResult =
        await sql`SELECT id FROM cart WHERE userid = ${userId}`;
      let cartId: string;

      if (cartResult.rows.length === 0) {
        // No cart found, create a new cart
        const newCartResult =
          await sql`INSERT INTO cart (userid, createdat) VALUES (${userId}, NOW()) RETURNING id`;

        cartId = newCartResult.rows[0].id;
      } else {
        // Cart exists, get cart ID
        cartId = cartResult.rows[0].id;
      }

      // Step 2: Check if the product is already in the cart
      const cartItemResult =
        await sql`SELECT id, count FROM cartitem WHERE productid = ${productId} AND cartid = ${cartId}`;

      if (cartItemResult.rows.length > 0) {
        // Product already in the cart, update quantity
        const newQuantity = cartItemResult.rows[0].count + quantity;

        await sql`UPDATE cartitem SET count = ${newQuantity} WHERE productid = ${productId} AND cartid = ${cartId}`;
      } else {
        // Product not in the cart, insert new cart item
        await sql`
        INSERT INTO cartitem (count, productid, cartid) VALUES (${quantity}, ${productId}, ${cartId})`;
      }

      return NextResponse.json({ message: "Item added to cart successfully" });
    } catch (error) {
      return NextResponse.json({ status: 500, error: "Internal Server Error" });
    }
  } else if (method === "remove") {
    const productId = searchParams.get("productId");
    const cartId = searchParams.get("cartId");

    // Remove the product from the cart
    await sql`DELETE FROM cartitem WHERE productid = ${productId} AND cartid = ${cartId}`;

    return NextResponse.json({
      message: "Item removed from cart successfully",
    });
  } else {
    return NextResponse.json({ status: 400, error: "Invalid method" });
  }
}
