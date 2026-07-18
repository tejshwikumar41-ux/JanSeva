import { prisma } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

// Server action or direct DB query inside Server Component
async function getStats() {
  const centralCount = await prisma.scheme.count({ where: { governmentLevel: "CENTRAL", type: "SCHEME" } });
  const stateCount = await prisma.scheme.count({ where: { governmentLevel: { in: ["STATE", "UT"] }, type: "SCHEME" } });
  const servicesCount = await prisma.scheme.count({ where: { type: "SERVICE" } });
  const categoriesCount = await prisma.category.count();
  const statesCount = await prisma.state.count();
  const verifiedCount = await prisma.scheme.count({ where: { verificationStatus: "VERIFIED" } });

  return {
    centralCount,
    stateCount,
    servicesCount,
    categoriesCount,
    statesCount,
    verifiedCount
  };
}

export default async function HomePage() {
  const stats = await getStats();

  // Fetch popular services
  const popularServices = await prisma.scheme.findMany({
    where: { type: "SERVICE" },
    take: 4,
    include: { department: true }
  });

  // Fetch categories
  const categories = await prisma.category.findMany({
    take: 6,
    orderBy: { name: "asc" }
  });

  // Fetch a few states
  const states = await prisma.state.findMany({
    where: { slug: { in: ["maharashtra", "karnataka", "uttar-pradesh", "gujarat", "delhi", "bihar"] } },
    take: 6
  });

  // Latest schemes
  const latestSchemes = await prisma.scheme.findMany({
    where: { type: "SCHEME" },
    orderBy: { lastUpdated: "desc" },
    take: 3,
    include: { state: true, category: true }
  });

  // Serialize dates to prevent SSR errors
  const serializedLatestSchemes = latestSchemes.map(s => ({
    ...s,
    lastUpdated: s.lastUpdated.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    applicationStartDate: s.applicationStartDate?.toISOString() || null,
    applicationDeadline: s.applicationDeadline?.toISOString() || null,
    renewalDate: s.renewalDate?.toISOString() || null,
  }));

  const serializedPopularServices = popularServices.map(s => ({
    ...s,
    lastUpdated: s.lastUpdated.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    applicationStartDate: s.applicationStartDate?.toISOString() || null,
    applicationDeadline: s.applicationDeadline?.toISOString() || null,
    renewalDate: s.renewalDate?.toISOString() || null,
  }));

  return (
    <HomeClient
      stats={stats}
      popularServices={serializedPopularServices}
      categories={categories}
      states={states}
      latestSchemes={serializedLatestSchemes}
    />
  );
}
