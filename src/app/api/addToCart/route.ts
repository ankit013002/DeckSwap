import { NextResponse } from "next/server";
import { PostCartItem } from "~/server/postCartItem";

export async function POST(request: Request) {
  const { productId } = (await request.json()) as { productId: string };

  console.log("got product:", productId);

  await PostCartItem();

  return NextResponse.json({ status: "ok" });
}
