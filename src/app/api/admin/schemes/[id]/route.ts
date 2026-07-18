import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PUT to update a scheme by ID
export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;
    const body = await request.json();

    const {
      name,
      slug,
      type,
      governmentLevel,
      stateId,
      departmentId,
      categoryId,
      subcategory,
      beneficiaryTypes,
      shortDescription,
      fullDescription,
      benefits,
      eligibilitySummary,
      requiredDocuments,
      onlineApplicationSteps,
      offlineApplicationSteps,
      officialApplyUrl,
      officialWebsiteUrl,
      guidelinesPdfUrl,
      trackStatusUrl,
      helplineNumber,
      email,
      officeAddress,
      fees,
      processingTime,
      applicationStartDate,
      applicationDeadline,
      renewalDate,
      status,
      verificationStatus,
      sourceUrls,
      keywords,
      eligibilityRules
    } = body;

    // Check if scheme exists
    const existing = await prisma.scheme.findUnique({
      where: { id }
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Scheme not found" },
        { status: 404 }
      );
    }

    // Update main scheme properties
    const updatedScheme = await prisma.scheme.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        slug: slug !== undefined ? slug : existing.slug,
        type: type !== undefined ? type : existing.type,
        governmentLevel: governmentLevel !== undefined ? governmentLevel : existing.governmentLevel,
        stateId: stateId !== undefined ? (stateId || null) : existing.stateId,
        departmentId: departmentId !== undefined ? (departmentId || null) : existing.departmentId,
        categoryId: categoryId !== undefined ? (categoryId || null) : existing.categoryId,
        subcategory: subcategory !== undefined ? (subcategory || null) : existing.subcategory,
        beneficiaryTypes: beneficiaryTypes !== undefined ? beneficiaryTypes : existing.beneficiaryTypes,
        shortDescription: shortDescription !== undefined ? shortDescription : existing.shortDescription,
        fullDescription: fullDescription !== undefined ? fullDescription : existing.fullDescription,
        benefits: benefits !== undefined ? (typeof benefits === "string" ? benefits : JSON.stringify(benefits)) : existing.benefits,
        eligibilitySummary: eligibilitySummary !== undefined ? eligibilitySummary : existing.eligibilitySummary,
        requiredDocuments: requiredDocuments !== undefined ? (typeof requiredDocuments === "string" ? requiredDocuments : JSON.stringify(requiredDocuments)) : existing.requiredDocuments,
        onlineApplicationSteps: onlineApplicationSteps !== undefined ? (typeof onlineApplicationSteps === "string" ? onlineApplicationSteps : JSON.stringify(onlineApplicationSteps)) : existing.onlineApplicationSteps,
        offlineApplicationSteps: offlineApplicationSteps !== undefined ? (typeof offlineApplicationSteps === "string" ? offlineApplicationSteps : JSON.stringify(offlineApplicationSteps)) : existing.offlineApplicationSteps,
        officialApplyUrl: officialApplyUrl !== undefined ? (officialApplyUrl || null) : existing.officialApplyUrl,
        officialWebsiteUrl: officialWebsiteUrl !== undefined ? (officialWebsiteUrl || null) : existing.officialWebsiteUrl,
        guidelinesPdfUrl: guidelinesPdfUrl !== undefined ? (guidelinesPdfUrl || null) : existing.guidelinesPdfUrl,
        trackStatusUrl: trackStatusUrl !== undefined ? (trackStatusUrl || null) : existing.trackStatusUrl,
        helplineNumber: helplineNumber !== undefined ? (helplineNumber || null) : existing.helplineNumber,
        email: email !== undefined ? (email || null) : existing.email,
        officeAddress: officeAddress !== undefined ? (officeAddress || null) : existing.officeAddress,
        fees: fees !== undefined ? fees : existing.fees,
        processingTime: processingTime !== undefined ? (processingTime || null) : existing.processingTime,
        applicationStartDate: applicationStartDate !== undefined ? (applicationStartDate ? new Date(applicationStartDate) : null) : existing.applicationStartDate,
        applicationDeadline: applicationDeadline !== undefined ? (applicationDeadline ? new Date(applicationDeadline) : null) : existing.applicationDeadline,
        renewalDate: renewalDate !== undefined ? (renewalDate ? new Date(renewalDate) : null) : existing.renewalDate,
        status: status !== undefined ? status : existing.status,
        verificationStatus: verificationStatus !== undefined ? verificationStatus : existing.verificationStatus,
        sourceUrls: sourceUrls !== undefined ? (typeof sourceUrls === "string" ? sourceUrls : JSON.stringify(sourceUrls)) : existing.sourceUrls,
        keywords: keywords !== undefined ? (keywords || null) : existing.keywords,
        lastUpdated: new Date()
      }
    });

    // Update eligibility rules if provided
    if (eligibilityRules && Array.isArray(eligibilityRules)) {
      // Clear old rules
      await prisma.eligibilityRule.deleteMany({
        where: { schemeId: id }
      });

      // Add new rules
      for (const rule of eligibilityRules) {
        await prisma.eligibilityRule.create({
          data: {
            schemeId: id,
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

    return NextResponse.json({ success: true, scheme: updatedScheme });
  } catch (error: any) {
    console.error("Admin scheme update error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update scheme" },
      { status: 500 }
    );
  }
}

// DELETE a scheme by ID
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;

    // Check if scheme exists
    const existing = await prisma.scheme.findUnique({
      where: { id }
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Scheme not found" },
        { status: 404 }
      );
    }

    await prisma.scheme.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Scheme deleted successfully" });
  } catch (error: any) {
    console.error("Admin scheme delete error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete scheme" },
      { status: 500 }
    );
  }
}
