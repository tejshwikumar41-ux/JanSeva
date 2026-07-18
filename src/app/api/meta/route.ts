import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const states = await prisma.state.findMany({
      orderBy: { name: "asc" }
    });

    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
    });

    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" }
    });

    return NextResponse.json({
      success: true,
      states,
      categories,
      departments
    });
  } catch (error: any) {
    console.error("Meta fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}
