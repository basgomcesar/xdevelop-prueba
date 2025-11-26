import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { action, ids, payload } = body;

  await new Promise((r) => setTimeout(r, 300));


  return NextResponse.json({ ok: true, action, ids, payload });
}
