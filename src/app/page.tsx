import Link from "next/link";
import { prisma } from "@/lib/db";
import { 
  Search, Sprout, GraduationCap, HeartPulse, HandHelping, 
  Baby, Briefcase, Landmark, ShieldCheck, HelpCircle, 
  TrendingUp, Sparkles, AlertTriangle, ArrowRight, BookOpen,
  MapPin, ShieldAlert
} from "lucide-react";

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

  // Map icon strings to Lucide components
  const iconMap: Record<string, any> = {
    Sprout: Sprout,
    GraduationCap: GraduationCap,
    HeartPulse: HeartPulse,
    HandHelping: HandHelping,
    Baby: Baby,
    Briefcase: Briefcase
  };

  return (
    <div className="w-full flex flex-col space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-primary-navy via-[#0c284b] to-[#113867] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shadow-xl overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-saffron/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-accent-saffron">
            <Sparkles className="h-4 w-4 text-accent-saffron" />
            <span>Discover. Learn. Apply.</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Every Government <br className="hidden sm:inline" />
            <span className="text-accent-saffron">Scheme in India</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            Search Central and State Government schemes, benefits, services, required documents, eligibility rules, and official direct application links — all in one unified platform.
          </p>

          {/* Hero Search Box */}
          <form action="/schemes" method="GET" className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch gap-2 bg-white/15 p-2 rounded-xl border border-white/20 backdrop-blur-lg shadow-2xl">
            <div className="flex-grow flex items-center bg-card rounded-lg px-3 py-2 text-foreground">
              <Search className="h-5 w-5 text-gray-400 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                name="search"
                placeholder="Search Aadhaar, PM Kisan, scholarships, pension, ration card..."
                className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 font-medium py-1"
              />
            </div>
            <button
              type="submit"
              className="bg-accent-saffron hover:bg-accent-saffron/90 text-primary-navy font-bold text-sm px-6 py-3 rounded-lg shadow-md transition duration-150 flex items-center justify-center space-x-1"
            >
              <span>Search</span>
            </button>
          </form>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/schemes"
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-bold transition duration-150"
            >
              Explore Schemes
            </Link>
            <Link
              href="/eligibility-checker"
              className="px-5 py-2.5 rounded-full bg-accent-saffron text-primary-navy hover:bg-accent-saffron/95 text-sm font-bold shadow transition duration-150"
            >
              Check Eligibility
            </Link>
            <Link
              href="/ai-assistant"
              className="px-5 py-2.5 rounded-full bg-accent-green text-white hover:bg-accent-green/95 text-sm font-bold shadow transition duration-150 flex items-center space-x-1.5"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Ask AI Assistant</span>
            </Link>
            <Link
              href="/states"
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-bold transition duration-150"
            >
              Browse by State
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-20 sm:-mt-24 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-card border border-border p-6 rounded-2xl shadow-xl transition-all duration-200">
          <div className="text-center p-3 border-r border-border last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-navy dark:text-accent-saffron">
              {stats.centralCount}+
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">Central Schemes</p>
          </div>
          <div className="text-center p-3 border-r border-border last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-navy dark:text-accent-saffron">
              {stats.stateCount}+
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">State Schemes ({stats.statesCount} States/UTs)</p>
          </div>
          <div className="text-center p-3 border-r border-border last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-navy dark:text-accent-saffron">
              {stats.categoriesCount}+
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">Sectors & Categories</p>
          </div>
          <div className="text-center p-3 last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-accent-green">
              {stats.verifiedCount}
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">Verified Official Links</p>
          </div>
        </div>
      </section>

      {/* 3. Popular Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              Popular Public Services
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Apply for cards, certificates, and registers directly via official national portals.
            </p>
          </div>
          <Link href="/services" className="text-accent-blue hover:underline text-sm font-bold flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <div key={service.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-accent-blue/30 transition duration-150 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full inline-block">
                  {service.department?.name || "Central Service"}
                </div>
                <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-xs text-text-muted line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>
              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded">
                  {service.fees}
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs text-accent-blue font-extrabold hover:underline"
                >
                  Apply Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
            Browse Schemes by Sector
          </h2>
          <p className="text-sm text-text-muted">
            Explore specific financial benefits, pensions, and subsidies grouped by departmental sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon || "Landmark"] || Landmark;
            return (
              <Link
                key={cat.id}
                href={`/schemes?categoryId=${cat.id}`}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-accent-saffron/30 transition duration-150 flex items-start space-x-4"
              >
                <div className="p-3 rounded-lg bg-card-secondary text-primary-navy dark:text-accent-saffron group-hover:bg-accent-saffron group-hover:text-primary-navy transition duration-150">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground group-hover:text-accent-saffron transition duration-150">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/schemes"
            className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-lg border border-border text-sm font-bold text-foreground hover:bg-card-secondary transition duration-150"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. Schemes for You & Eligibility Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-accent-saffron/10 via-[#0B1F3A]/5 to-accent-green/10 border border-border rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent-saffron/20 border border-accent-saffron/30 text-xs font-bold text-primary-navy dark:text-accent-saffron">
              <TrendingUp className="h-4 w-4" />
              <span>Personalized Discovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground leading-tight">
              Not sure which schemes you qualify for?
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Answer a few simple questions regarding your age, occupation, income, and residence, and our engine will filter matching benefits instantly.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/eligibility-checker"
              className="inline-flex items-center justify-center bg-primary-navy text-white hover:bg-primary-navy/90 dark:bg-accent-saffron dark:text-primary-navy dark:hover:bg-accent-saffron/90 font-black text-base px-8 py-4 rounded-xl shadow-lg transition duration-150"
            >
              Launch Eligibility Checker
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Browse by State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              Browse by State / UT
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Find schemes tailored to your specific residence state or union territory.
            </p>
          </div>
          <Link href="/states" className="text-accent-blue hover:underline text-sm font-bold flex items-center space-x-1">
            <span>All States</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {states.map((st) => (
            <Link
              key={st.id}
              href={`/states/${st.slug}`}
              className="bg-card border border-border rounded-xl p-4 text-center hover:shadow hover:border-accent-green/30 hover:scale-[1.02] transition duration-150 flex flex-col justify-between h-28"
            >
              <div className="mx-auto p-2 bg-card-secondary text-accent-green rounded-full">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-xs text-primary-navy dark:text-foreground mt-2 line-clamp-1">
                {st.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Latest Updated Schemes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
            Latest Updated Schemes
          </h2>
          <p className="text-sm text-text-muted mt-1">
            Recent updates, revisions, and modifications in public schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-card border border-border rounded-xl p-6 hover:shadow transition duration-150 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-accent-saffron bg-accent-saffron/10 px-2 py-0.5 rounded">
                    {scheme.governmentLevel === "CENTRAL" ? "Central Government" : scheme.state?.name || "State Scheme"}
                  </span>
                  <span className="text-text-muted">
                    Updated {new Date(scheme.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground line-clamp-1">
                  {scheme.name}
                </h3>
                <p className="text-xs text-text-muted line-clamp-3">
                  {scheme.shortDescription}
                </p>
              </div>
              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-text-muted">
                  Category: <span className="font-bold text-foreground">{scheme.category?.name}</span>
                </span>
                <Link
                  href={`/schemes/${scheme.slug}`}
                  className="text-xs text-accent-blue font-extrabold hover:underline"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              How JanSeva Bharat Works
            </h2>
            <p className="text-sm text-text-muted">
              We guide you through the process of discovering and applying for official benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-4">
              <div className="mx-auto w-12 h-12 bg-accent-saffron/15 text-accent-saffron font-black text-lg flex items-center justify-center rounded-full border border-accent-saffron/20">
                1
              </div>
              <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">Search and Filter</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Use the search box or sidebar filters to pinpoint schemes matching your location, age, and occupation.
              </p>
            </div>
            
            <div className="text-center space-y-3 p-4">
              <div className="mx-auto w-12 h-12 bg-accent-blue/15 text-accent-blue font-black text-lg flex items-center justify-center rounded-full border border-accent-blue/20">
                2
              </div>
              <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">Verify Eligibility & Docs</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Check exact qualifying criteria and gather required checklists (like Aadhaar card, income certificate, etc.).
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="mx-auto w-12 h-12 bg-accent-green/15 text-accent-green font-black text-lg flex items-center justify-center rounded-full border border-accent-green/20">
                3
              </div>
              <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">Apply on Official Portals</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Follow our step-by-step guides and click verified links to apply securely on the government's official portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Safety, Privacy and Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Warning Card */}
        <div className="bg-card border border-border p-6 rounded-xl flex items-start space-x-4">
          <div className="p-3 bg-red-500/10 text-red-500 rounded-lg flex-shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">
              Privacy and Safety Commitment
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We take your privacy seriously. JanSeva Bharat **never** stores or requests sensitive details such as your Aadhaar number, PAN number, bank accounts, passwords, or OTPs. We do not support direct file uploads of personal documents.
            </p>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-card border border-border p-6 rounded-xl flex items-start space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg flex-shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">
              Independent Platform Disclaimer
            </h3>
            <p className="text-xs text-text-muted leading-relaxed text-justify">
              **JanSeva Bharat is an independent informational platform and not an official government website.** While we pull data from official sources, you must verify scheme updates and file applications only through official state/central government websites.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
