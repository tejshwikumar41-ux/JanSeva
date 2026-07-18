import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse filters
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || ""; // "SCHEME" or "SERVICE"
    const level = searchParams.get("level") || ""; // "CENTRAL", "STATE", "UT"
    const stateId = searchParams.get("stateId") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const departmentId = searchParams.get("departmentId") || "";
    const status = searchParams.get("status") || "";
    const sort = searchParams.get("sort") || "az";

    // Eligibility flags
    const gender = searchParams.get("gender") || "";
    const maxIncome = searchParams.get("maxIncome") ? parseFloat(searchParams.get("maxIncome")!) : null;
    const minAge = searchParams.get("age") ? parseInt(searchParams.get("age")!) : null;
    const caste = searchParams.get("caste") || "";
    const studentStatus = searchParams.get("student") === "true";
    const farmerStatus = searchParams.get("farmer") === "true";
    const disabledStatus = searchParams.get("disabled") === "true";
    const seniorStatus = searchParams.get("senior") === "true";
    const bplStatus = searchParams.get("bpl") === "true";
    const widowStatus = searchParams.get("widow") === "true";
    const minorityStatus = searchParams.get("minority") === "true";

    // Build Prisma query condition
    const where: any = {};

    if (type) {
      where.type = type;
    }
    if (level) {
      where.governmentLevel = level;
    }
    if (stateId) {
      where.stateId = stateId;
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (departmentId) {
      where.departmentId = departmentId;
    }
    if (status) {
      where.status = status;
    }

    // Text Search
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { shortDescription: { contains: search } },
        { fullDescription: { contains: search } },
        { keywords: { contains: search } }
      ];
    }

    // Build Eligibility Rule filters
    const eligibilityConditions: any[] = [];

    if (gender && gender !== "ANY") {
      eligibilityConditions.push({
        OR: [{ gender: "ANY" }, { gender: gender }]
      });
    }
    if (maxIncome !== null) {
      eligibilityConditions.push({
        OR: [{ maxIncome: null }, { maxIncome: { gte: maxIncome } }]
      });
    }
    if (minAge !== null) {
      eligibilityConditions.push({
        AND: [
          { OR: [{ minAge: null }, { minAge: { lte: minAge } }] },
          { OR: [{ maxAge: null }, { maxAge: { gte: minAge } }] }
        ]
      });
    }
    if (caste && caste !== "ANY") {
      eligibilityConditions.push({
        OR: [{ caste: "ANY" }, { caste: caste }]
      });
    }
    if (studentStatus) {
      eligibilityConditions.push({ OR: [{ studentStatus: null }, { studentStatus: true }] });
    }
    if (farmerStatus) {
      eligibilityConditions.push({ OR: [{ farmerStatus: null }, { farmerStatus: true }] });
    }
    if (disabledStatus) {
      eligibilityConditions.push({ OR: [{ disabledStatus: null }, { disabledStatus: true }] });
    }
    if (seniorStatus) {
      eligibilityConditions.push({ OR: [{ seniorStatus: null }, { seniorStatus: true }] });
    }
    if (bplStatus) {
      eligibilityConditions.push({ OR: [{ bplStatus: null }, { bplStatus: true }] });
    }
    if (widowStatus) {
      eligibilityConditions.push({ OR: [{ widowStatus: null }, { widowStatus: true }] });
    }
    if (minorityStatus) {
      eligibilityConditions.push({ OR: [{ minorityStatus: null }, { minorityStatus: true }] });
    }

    if (eligibilityConditions.length > 0) {
      where.eligibilityRules = {
        some: {
          AND: eligibilityConditions
        }
      };
    }

    // Build sorting condition
    let orderBy: any = {};
    if (sort === "az") {
      orderBy = { name: "asc" };
    } else if (sort === "newest") {
      orderBy = { createdAt: "desc" };
    } else if (sort === "recent") {
      orderBy = { lastUpdated: "desc" };
    } else if (sort === "popular") {
      // For mock, we can sort by name and updatedAt
      orderBy = { lastUpdated: "desc" };
    }

    // Execute query
    const schemes = await prisma.scheme.findMany({
      where,
      orderBy,
      include: {
        state: true,
        category: true,
        department: true,
        eligibilityRules: true
      }
    });

    return NextResponse.json({ success: true, count: schemes.length, schemes });
  } catch (error: any) {
    console.error("Error fetching schemes:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch schemes" },
      { status: 500 }
    );
  }
}
