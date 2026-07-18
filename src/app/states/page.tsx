import Link from "next/link";
import { prisma } from "@/lib/db";
import { ChevronRight, MapPin, Landmark, ArrowRight } from "lucide-react";

async function getStatesWithCount() {
  const states = await prisma.state.findMany({
    include: {
      _count: {
        select: { schemes: true }
      }
    },
    orderBy: { name: "asc" }
  });
  return states;
}

export default async function StatesDirectoryPage() {
  const states = await getStatesWithCount();

  // Split into States vs Union Territories
  const regularStates = states.filter(s => !s.isUT);
  const unionTerritories = states.filter(s => s.isUT);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">States & UTs</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-accent-green/10 via-[#0B1F3A]/5 to-accent-saffron/10 border border-border p-8 rounded-2xl space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-navy dark:text-foreground">State-Specific Welfare Programs</h1>
        <p className="text-xs sm:text-sm text-text-muted max-w-2xl leading-relaxed">
          Indian States and Union Territories administer dedicated pensions, housing incentives, and educational aids tailored to local residents. Select your residence state below.
        </p>
      </div>

      {/* 1. Indian States Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground flex items-center space-x-2 border-b border-border pb-2">
          <Landmark className="h-5 w-5 text-accent-saffron" />
          <span>Indian States</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regularStates.map((st) => (
            <Link
              key={st.id}
              href={`/states/${st.slug}`}
              className="bg-card border border-border rounded-xl p-5 hover:shadow hover:border-accent-saffron/30 hover:scale-[1.01] transition duration-150 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-accent-saffron/10 text-accent-saffron rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-extrabold text-sm text-primary-navy dark:text-foreground truncate max-w-[150px]">
                    {st.name}
                  </h3>
                  <span className="text-[10px] font-bold text-text-muted">
                    {st._count.schemes} Registered Schemes
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Union Territories Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground flex items-center space-x-2 border-b border-border pb-2">
          <Landmark className="h-5 w-5 text-accent-green" />
          <span>Union Territories</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {unionTerritories.map((st) => (
            <Link
              key={st.id}
              href={`/states/${st.slug}`}
              className="bg-card border border-border rounded-xl p-5 hover:shadow hover:border-accent-green/30 hover:scale-[1.01] transition duration-150 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-accent-green/10 text-accent-green rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-extrabold text-sm text-primary-navy dark:text-foreground truncate max-w-[150px]">
                    {st.name}
                  </h3>
                  <span className="text-[10px] font-bold text-text-muted">
                    {st._count.schemes} Registered Schemes
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  );
}
