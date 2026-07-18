import Link from "next/link";
import { prisma } from "@/lib/db";
import { 
  Landmark, ShieldCheck, CheckCircle2, Search, ArrowRight,
  Clock, CreditCard, ChevronRight, Bookmark
} from "lucide-react";

async function getServices() {
  const services = await prisma.scheme.findMany({
    where: { type: "SERVICE" },
    include: {
      department: true,
      category: true
    },
    orderBy: { name: "asc" }
  });
  return services;
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">Services</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-navy to-[#1E293B] text-white p-8 sm:p-10 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-2xl" />
        <h1 className="text-3xl font-extrabold tracking-tight">Public Registry & Identity Services</h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
          Access verified step-by-step guidelines, list of required documents, fees, processing times, and official apply links for vital Indian public documents and registrations.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const benefits = JSON.parse(service.benefits || "[]");
          return (
            <div key={service.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-accent-blue/30 transition duration-150 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {service.department?.name || "Central Government"}
                  </span>
                  {service.verificationStatus === "VERIFIED" && (
                    <span className="text-[10px] font-bold text-accent-green bg-accent-green/10 px-2.5 py-0.5 rounded-full flex items-center space-x-0.5 uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3 fill-current" />
                      <span>Verified Portal</span>
                    </span>
                  )}
                </div>

                <h2 className="font-extrabold text-lg text-primary-navy dark:text-foreground line-clamp-1">
                  {service.name}
                </h2>

                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Quick Info Checklist */}
                <div className="space-y-2 border-t border-border pt-4 text-xs text-text-muted">
                  <div className="flex items-center justify-between">
                    <span>Processing Time:</span>
                    <span className="font-extrabold text-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-accent-blue" />
                      <span>{service.processingTime || "Variable"}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Application Fee:</span>
                    <span className="font-extrabold text-foreground flex items-center space-x-1">
                      <CreditCard className="h-3 w-3 text-accent-green" />
                      <span>{service.fees}</span>
                    </span>
                  </div>
                </div>

                {benefits.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-text-muted block">Primary Utility:</span>
                    <span className="text-xs font-bold text-foreground line-clamp-1">{benefits[0]}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border mt-6 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs bg-card-secondary hover:bg-accent-blue hover:text-white text-primary-navy dark:text-foreground font-bold px-4 py-2 rounded-lg transition duration-150 flex items-center space-x-1"
                >
                  <span>Verify Documents & Apply</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-accent-saffron/15 text-accent-saffron rounded-lg mt-0.5">
            <Bookmark className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-foreground">Apply Safely through Official Portals</h3>
            <p className="text-xs text-text-muted max-w-2xl leading-relaxed">
              We list the official URLs of UIDAI, Income Tax Department, NSDL, Passport Seva, and other apex authorities. Do not upload certificates or pay fees on unofficial copycat websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
