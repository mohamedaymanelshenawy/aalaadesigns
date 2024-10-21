import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  // Get the user's cart
  const cart = await sql`SELECT * FROM cart WHERE userid = ${userId}`;

  if (cart.rows.length === 0) {
    return NextResponse.json({
      status: 404,
      message: "Cart not found for this user",
    });
  }
  const cartId = cart.rows[0].id;

  // Get cart items with product details
  const cartItems = await sql`
      SELECT ci.id as cart_item_id, ci.count, p.id as product_id, p.name, p.price
      FROM cartitem ci
      JOIN products p ON ci.productid = p.id
      WHERE ci.id = ${cartId}
    `;

  if (cartItems.rows.length === 0) {
    return NextResponse.json({ status: 404, message: "No items in cart" });
  }

  // Calculate total amount
  const totalAmount = cartItems.rows.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  // Create a new order
  const newOrder = await sql`
      INSERT INTO orders (userid, status, totalamount)
      VALUES (${userId}, 'pending', ${totalAmount})
      RETURNING id
    `;
  const orderId = newOrder.rows[0].id;

  // Create order items
  for (const item of cartItems.rows) {
    await sql`
        INSERT INTO orderitems (orderid, productid, quantity, price)
        VALUES (${orderId}, ${item.product_id}, ${item.count}, ${item.price})
      `;
  }

  // Clear the cart
  await sql`DELETE FROM cartitem WHERE id = ${cartId}`;

  return NextResponse.json({
    status: 200,
    message: "Order created successfully",
    orderId: orderId,
    totalAmount: totalAmount,
  });
}
