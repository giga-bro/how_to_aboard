import { NextResponse } from "next/server";

import universities from '../../data/universities.json';


export async function POST(request: Request) {

  return NextResponse.json({ data:universities });
}