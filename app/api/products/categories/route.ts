import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryID = searchParams.get("categoryID");

  if (!categoryID) {
    const categories = await sql`SELECT * FROM categories`;
    const subcategories = await sql`SELECT * FROM subcategory`;

    // Create a category map
    const categoryMap = new Map<number, any>();

    // Initialize each category with an empty subcategories array
    categories.rows.forEach((category) => {
      categoryMap.set(category.id, { ...category, subcategories: [] });
    });

    // Assign subcategories to their respective categories
    subcategories.rows.forEach((subcategory) => {
      const parentCategory = categoryMap.get(subcategory.categoryid); // Ensure correct case

      if (parentCategory) {
        parentCategory.subcategories.push(subcategory);
      }
    });

    return NextResponse.json(Array.from(categoryMap.values()));
  }

  const category = await sql`SELECT * FROM categories WHERE id = ${categoryID}`;
  const subcategories =
    await sql`SELECT * FROM subcategory WHERE categoryID = ${categoryID}`;

  return NextResponse.json({
    category: category.rows[0],
    subcategories: subcategories.rows,
  });
}
