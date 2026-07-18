import Link from "next/link";
import { prisma } from "@/lib/db";
import { ChevronRight, Landmark, ArrowRight, BookOpen } from "lucide-react";

async function getCentralMinistriesWithSchemes() {
  const ministries = await prisma.department.findMany({
    include: {
      schemes: {
        where: { governmentLevel: "CENTRAL", type: "SCHEME" },
        include: { category: true }
      }
    },
    orderBy: { name: "asc" }
  });
  return ministries;
}

export default async function CentralSchemesPage() {
  const ministries = await getCentralMinistriesWithSchemes();

  // Filter ministries that have schemes to present a clean layout,
  // but keep all of them so we can show empty states/add options.
  const populatedMinistries = ministries.filter(m => m.schemes.length > 0);
  const emptyMinistries = ministries.filter(m => m.schemes.length === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">Central Schemes</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-accent-saffron/10 via-[#0B1F3A]/5 to-[#0B1F3A]/10 border border-border p-8 rounded-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-saffron/5 rounded-full blur-2xl" />
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-navy dark:text-foreground">
          Central Government Schemes
        </h1>
        <p className="text-xs sm:text-sm text-text-muted max-w-3xl leading-relaxed">
          The Government of India sponsors and administers national welfare initiatives across various union ministries. Browse by ministry below to discover flagship subsidies, pensions, and financial plans.
        </p>
      </div>

      {/* Flagship Populated Ministries */}
      <div className="space-y-8">
        <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground flex items-center space-x-2 border-b border-border pb-2">
          <Landmark className="h-5 w-5 text-accent-saffron" />
          <span>Active Central Ministries ({populatedMinistries.length})</span>
        </h2>

        {populatedMinistries.map((ministry) => (
          <div key={ministry.id} className="space-y-4">
            <h3 className="font-extrabold text-base text-primary-navy dark:text-accent-saffron flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-accent-saffron rounded-full" />
              <span>{ministry.name}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ministry.schemes.map((scheme) => {
                const benefits = JSON.parse(scheme.benefits || "[]");
                return (
                  <div key={scheme.id} className="bg-card border border-border rounded-xl p-5 hover:shadow transition duration-150 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full uppercase">
                        {scheme.category?.name}
                      </span>
                      <h4 className="font-extrabold text-sm text-foreground line-clamp-1">
                        {scheme.name}
                      </h4>
                      <p className="text-xs text-text-muted line-clamp-2">
                        {scheme.shortDescription}
                      </p>
                      {benefits.length > 0 && (
                        <div className="text-[11px] text-text-muted pt-1">
                          <span className="font-bold text-accent-green">Benefit:</span> {benefits[0]}
                        </div>
                      )}
                    </div>
                    <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-text-muted">
                        Fees: <strong className="text-foreground">{scheme.fees}</strong>
                      </span>
                      <Link
                        href={`/schemes/${scheme.slug}`}
                        className="text-xs text-accent-blue font-extrabold hover:underline"
                      >
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Directory of all other Ministries */}
      {emptyMinistries.length > 0 && (
        <div className="space-y-4 border-t border-border pt-8">
          <h2 className="text-lg font-extrabold text-primary-navy dark:text-foreground">
            Other Ministries & Departments
          </h2>
          <p className="text-xs text-text-muted">
            The following departments are indexed in our database. We are actively cataloging their schemes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emptyMinistries.map((ministry) => (
              <div
                key={ministry.id}
                className="bg-card/50 border border-border p-4 rounded-xl flex items-center justify-between text-xs text-foreground"
              >
                <div className="space-y-0.5">
                  <span className="font-semibold">{ministry.name}</span>
                  <span className="text-[10px] text-text-muted block">0 active schemes listed</span>
                </div>
                <Link
                  href={`/admin?deptId=${ministry.id}`}
                  className="text-accent-blue font-bold hover:underline"
                >
                  + Add
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
