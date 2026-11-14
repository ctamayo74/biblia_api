import { NextRequest, NextResponse } from "next/server";
import { getVerse } from "@/lib/bible";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bibleId = searchParams.get("bibleId");
    const verseId = searchParams.get("verseId");

    if (!bibleId || !bibleId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'bibleId' es obligatorio." },
        { status: 400 }
      );
    }

    if (!verseId || !verseId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'verseId' es obligatorio." },
        { status: 400 }
      );
    }

    const verse = await getVerse(bibleId.trim(), verseId.trim());
    return NextResponse.json({ data: verse }, { status: 200 });
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
