import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all schemes (including drafts) for admin dashboard
export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany({
      include: {
        state: true,
        category: true,
        department: true
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ success: true, schemes });
  } catch (error: any) {
    console.error("Admin schemes fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch schemes" },
      { status: 500 }
    );
  }
}

// POST to create a new scheme
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      slug,
      type = "SCHEME",
      governmentLevel = "CENTRAL",
      stateId,
      departmentId,
      categoryId,
      subcategory,
      beneficiaryTypes = "All Citizens",
      shortDescription,
      fullDescription,
      benefits = "[]",
      eligibilitySummary,
      requiredDocuments = "[]",
      onlineApplicationSteps = "[]",
      offlineApplicationSteps = "[]",
      officialApplyUrl,
      officialWebsiteUrl,
      guidelinesPdfUrl,
      trackStatusUrl,
      helplineNumber,
      email,
      officeAddress,
      fees = "Free",
      processingTime,
      applicationStartDate,
      applicationDeadline,
      renewalDate,
      status = "ACTIVE",
      verificationStatus = "VERIFIED",
      sourceUrls = "[]",
      keywords,
      eligibilityRules // optional array
    } = body;

    if (!name || !slug || !shortDescription || !fullDescription) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, slug, shortDescription, fullDescription)" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.scheme.findUnique({
      where: { slug }
    });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Slug '${slug}' is already taken.` },
        { status: 400 }
      );
    }

    // Create scheme
    const newScheme = await prisma.scheme.create({
      data: {
        name,
        slug,
        type,
        governmentLevel,
        stateId: stateId || null,
        departmentId: departmentId || null,
        categoryId: categoryId || null,
        subcategory: subcategory || null,
        beneficiaryTypes,
        shortDescription,
        fullDescription,
        benefits: typeof benefits === "string" ? benefits : JSON.stringify(benefits),
        eligibilitySummary,
        requiredDocuments: typeof requiredDocuments === "string" ? requiredDocuments : JSON.stringify(requiredDocuments),
        onlineApplicationSteps: typeof onlineApplicationSteps === "string" ? onlineApplicationSteps : JSON.stringify(onlineApplicationSteps),
        offlineApplicationSteps: typeof offlineApplicationSteps === "string" ? offlineApplicationSteps : JSON.stringify(offlineApplicationSteps),
        officialApplyUrl: officialApplyUrl || null,
        officialWebsiteUrl: officialWebsiteUrl || null,
        guidelinesPdfUrl: guidelinesPdfUrl || null,
        trackStatusUrl: trackStatusUrl || null,
        helplineNumber: helplineNumber || null,
        email: email || null,
        officeAddress: officeAddress || null,
        fees,
        processingTime: processingTime || null,
        applicationStartDate: applicationStartDate ? new Date(applicationStartDate) : null,
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
        renewalDate: renewalDate ? new Date(renewalDate) : null,
        status,
        verificationStatus,
        sourceUrls: typeof sourceUrls === "string" ? sourceUrls : JSON.stringify(sourceUrls),
        keywords: keywords || null,
      }
    });

    // Create eligibility rules if provided
    if (eligibilityRules && Array.isArray(eligibilityRules)) {
      for (const rule of eligibilityRules) {
        await prisma.eligibilityRule.create({
          data: {
            schemeId: newScheme.id,
            minAge: rule.minAge ? parseInt(rule.minAge) : null,
            maxAge: rule.maxAge ? parseInt(rule.maxAge) : null,
            gender: rule.gender || "ANY",
            maxIncome: rule.maxIncome ? parseFloat(rule.maxIncome) : null,
            caste: rule.caste || "ANY",
            studentStatus: rule.studentStatus === true || rule.studentStatus === "true",
            farmerStatus: rule.farmerStatus === true || rule.farmerStatus === "true",
            disabledStatus: rule.disabledStatus === true || rule.disabledStatus === "true",
            seniorStatus: rule.seniorStatus === true || rule.seniorStatus === "true",
            bplStatus: rule.bplStatus === true || rule.bplStatus === "true",
            widowStatus: rule.widowStatus === true || rule.widowStatus === "true",
            minorityStatus: rule.minorityStatus === true || rule.minorityStatus === "true",
          }
        });
      }
    }

    return NextResponse.json({ success: true, scheme: newScheme });
  } catch (error: any) {
    console.error("Admin scheme create error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create scheme" },
      { status: 500 }
    );
  }
}
