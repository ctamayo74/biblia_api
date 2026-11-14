import { NextRequest, NextResponse } from "next/server";
import { searchBible } from "@/lib/bible";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bibleId = searchParams.get("bibleId");
    const q = searchParams.get("q");

    if (!bibleId || !bibleId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'bibleId' es obligatorio." },
        { status: 400 }
      );
    }

    if (!q || !q.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'q' (término de búsqueda) es obligatorio." },
        { status: 400 }
      );
    }

    const searchResult = await searchBible(bibleId.trim(), q.trim());
    return NextResponse.json({ data: searchResult }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    const status = message.includes("BIBLE_API_KEY")
      ? 500
      : message.includes("API.Bible")
      ? 502
      : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
