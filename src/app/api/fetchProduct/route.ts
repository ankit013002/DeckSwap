import { NextResponse } from "next/server";
import { GetProduct } from "~/server/getProduct";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product");

  if (!productId) {
    return NextResponse.json(
      { success: false, error: "No existing product Id" },
      { status: 404 },
    );
  }

  const product = await GetProduct(BigInt(productId));
  if (!product) {
    return NextResponse.json(
      { success: false, error: "Can't find product" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: product }, { status: 200 });
}
