import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      stateId,
      age,
      gender,
      income,
      caste,
      occupation,
      student = false,
      farmer = false,
      senior = false,
      disabled = false,
      widow = false,
      bpl = false,
      minority = false,
      rural = false
    } = body;

    // Fetch all schemes with state and rules
    const schemes = await prisma.scheme.findMany({
      include: {
        state: true,
        category: true,
        department: true,
        eligibilityRules: true
      }
    });

    const matches: any[] = [];

    for (const scheme of schemes) {
      // 1. Level & State Check
      if (scheme.governmentLevel === "STATE" || scheme.governmentLevel === "UT") {
        if (stateId && scheme.stateId !== stateId) {
          continue; // State mismatch
        }
      }

      // If no rules defined, matches by default
      if (!scheme.eligibilityRules || scheme.eligibilityRules.length === 0) {
        matches.push({
          scheme,
          reasons: ["Scheme is open to all citizens matching the basic level."]
        });
        continue;
      }

      // Check each rule (if any rule matches, user is eligible)
      let eligible = false;
      const reasons: string[] = [];

      for (const rule of scheme.eligibilityRules) {
        let ruleMatch = true;
        const localReasons: string[] = [];

        // Age check
        if (age !== undefined && age !== null) {
          if (rule.minAge !== null && age < rule.minAge) {
            ruleMatch = false;
          } else if (rule.minAge !== null) {
            localReasons.push(`Age is at least ${rule.minAge} years.`);
          }

          if (rule.maxAge !== null && age > rule.maxAge) {
            ruleMatch = false;
          } else if (rule.maxAge !== null) {
            localReasons.push(`Age is below ${rule.maxAge} years.`);
          }
        }

        // Gender check
        if (gender && rule.gender && rule.gender !== "ANY") {
          if (gender !== rule.gender) {
            ruleMatch = false;
          } else {
            localReasons.push(`Gender matches (${gender}).`);
          }
        }

        // Income check
        if (income !== undefined && income !== null && rule.maxIncome !== null) {
          if (income > rule.maxIncome) {
            ruleMatch = false;
          } else {
            localReasons.push(`Family income (Rs. ${income}) is within the limit of Rs. ${rule.maxIncome}.`);
          }
        }

        // Caste check
        if (caste && rule.caste && rule.caste !== "ANY") {
          if (caste !== rule.caste) {
            ruleMatch = false;
          } else {
            localReasons.push(`Caste group matches (${caste}).`);
          }
        }

        // Boolean status checks
        if (rule.studentStatus === true && !student) ruleMatch = false;
        else if (rule.studentStatus === true) localReasons.push("Matches student status.");

        if (rule.farmerStatus === true && !farmer) ruleMatch = false;
        else if (rule.farmerStatus === true) localReasons.push("Matches farmer status.");

        if (rule.disabledStatus === true && !disabled) ruleMatch = false;
        else if (rule.disabledStatus === true) localReasons.push("Matches person with disability (PwD) criteria.");

        if (rule.seniorStatus === true && !senior) ruleMatch = false;
        else if (rule.seniorStatus === true) localReasons.push("Matches senior citizen status.");

        if (rule.bplStatus === true && !bpl) ruleMatch = false;
        else if (rule.bplStatus === true) localReasons.push("Matches Below Poverty Line (BPL) status.");

        if (rule.widowStatus === true && !widow) ruleMatch = false;
        else if (rule.widowStatus === true) localReasons.push("Matches widow status.");

        if (rule.minorityStatus === true && !minority) ruleMatch = false;
        else if (rule.minorityStatus === true) localReasons.push("Matches minority community criteria.");

        if (ruleMatch) {
          eligible = true;
          reasons.push(...localReasons);
          break; // Stop evaluating other rules for this scheme if one matches
        }
      }

      if (eligible) {
        if (reasons.length === 0) {
          reasons.push("You satisfy the general eligibility criteria of the scheme.");
        }
        matches.push({
          scheme,
          reasons
        });
      }
    }

    return NextResponse.json({ success: true, count: matches.length, matches });
  } catch (error: any) {
    console.error("Eligibility check error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process eligibility" },
      { status: 500 }
    );
  }
}
