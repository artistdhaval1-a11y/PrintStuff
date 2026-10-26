import { NextResponse } from "next/server";
import { products } from "../../../lib/catalogue";

// This endpoint is the storefront's single catalogue source.
// It intentionally serves the existing local catalogue until Qikink confirms
// a supported product API or webhook for custom stores.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { source: "local", synced: false, products },
    { headers: { "Cache-Control": "no-store" } }
  );
}
