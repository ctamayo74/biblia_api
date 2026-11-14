import { NextRequest, NextResponse } from "next/server";
import { getPassage } from "@/lib/bible";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bibleId = searchParams.get("bibleId");
    const passageId = searchParams.get("passageId");

    if (!bibleId || !bibleId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'bibleId' es obligatorio." },
        { status: 400 }
      );
    }

    if (!passageId || !passageId.trim()) {
      return NextResponse.json(
        { error: "El parámetro de consulta 'passageId' es obligatorio." },
        { status: 400 }
      );
    }

    const passage = await getPassage(bibleId.trim(), passageId.trim());
    return NextResponse.json({ data: passage }, { status: 200 });
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
