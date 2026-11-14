import { NextRequest, NextResponse } from "next/server";
import { getChapter } from "@/lib/bible";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bibleId = searchParams.get("bibleId");
    const chapterId = searchParams.get("chapterId");

    if (!bibleId || !bibleId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'bibleId' es obligatorio." },
        { status: 400 }
      );
    }

    if (!chapterId || !chapterId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'chapterId' es obligatorio." },
        { status: 400 }
      );
    }

    const chapter = await getChapter(bibleId.trim(), chapterId.trim());
    return NextResponse.json({ data: chapter }, { status: 200 });
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
