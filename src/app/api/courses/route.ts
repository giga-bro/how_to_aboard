import { NextResponse } from "next/server";
import courses from '../../data/data.json';

export async function POST(request: Request) {

  return NextResponse.json({ data:courses });
}