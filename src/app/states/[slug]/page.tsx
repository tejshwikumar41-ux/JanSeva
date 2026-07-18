import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ChevronRight, ArrowLeft, MapPin, Landmark, ExternalLink, HelpCircle } from "lucide-react";

async function getStateWithSchemes(slug: string) {
  const state = await prisma.state.findUnique({
    where: { slug },
    include: {
      schemes: {
        include: {
          category: true,
          department: true
        }
      }
    }
  });
  return state;
}

export default async function StateDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const state = await getStateWithSchemes(params.slug);

  if (!state) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/states" className="hover:underline">States</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">{state.name}</span>
      </nav>

      {/* Back button */}
      <div>
        <Link href="/states" className="inline-flex items-center text-xs font-bold text-accent-blue hover:underline space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to States List</span>
        </Link>
      </div>

      {/* State Header Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-green" />
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-accent-green font-bold text-sm uppercase tracking-wider">
            <Landmark className="h-5 w-5" />
            <span>{state.isUT ? "Union Territory" : "State"} of India</span>
          </div>
          <h1 className="text-3xl font-black text-primary-navy dark:text-foreground tracking-tight">
            {state.name}
          </h1>
          <p className="text-xs text-text-muted">
            Explore verified government schemes, subsidies, and cards administered specifically in {state.name}.
          </p>
        </div>

        {state.portalUrl && (
          <a
            href={state.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary-navy text-white hover:bg-primary-navy/95 dark:bg-card-secondary dark:text-foreground dark:hover:bg-accent-green dark:hover:text-primary-navy py-3 px-5 rounded-lg text-xs font-bold shadow-sm transition duration-150 space-x-1.5"
          >
            <span>Visit State Govt Portal</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground border-b border-border pb-2">
          Active State Schemes
        </h2>

        {state.schemes.length === 0 ? (
          <div className="bg-card border border-border p-10 rounded-xl text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-card-secondary text-gray-400 flex items-center justify-center">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-foreground">No Schemes Added Yet</h3>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                We are continuously indexing state-level programs. Add schemes for {state.name} in the Admin Panel or explore other state schemes.
              </p>
            </div>
            <div className="flex justify-center space-x-3">
              <Link
                href="/admin"
                className="bg-accent-saffron text-primary-navy font-bold text-xs px-4 py-2 rounded-lg"
              >
                + Add Scheme
              </Link>
              <Link
                href="/schemes"
                className="border border-border text-foreground hover:bg-card-secondary font-bold text-xs px-4 py-2 rounded-lg"
              >
                View General Directory
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.schemes.map((scheme) => {
              const benefits = JSON.parse(scheme.benefits || "[]");
              return (
                <div key={scheme.id} className="bg-card border border-border rounded-xl p-6 hover:shadow transition duration-150 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded uppercase">
                        {scheme.category?.name || "State Scheme"}
                      </span>
                      {scheme.verificationStatus === "VERIFIED" && (
                        <span className="text-accent-green bg-accent-green/10 px-2 py-0.5 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground line-clamp-1">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {scheme.shortDescription}
                    </p>
                    {benefits.length > 0 && (
                      <div className="pt-1">
                        <span className="text-xs font-semibold text-text-muted">Benefit: </span>
                        <span className="text-xs font-bold text-accent-green">{benefits[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      Fee: <strong className="text-foreground">{scheme.fees}</strong>
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
        )}
      </div>

    </div>
  );
}
