import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { 
  CheckCircle2, ArrowLeft, ChevronRight, Phone, Mail, 
  MapPin, Clock, Info, ShieldCheck, CheckSquare, Sparkles,
  ExternalLink, FileText, CreditCard
} from "lucide-react";

async function getService(slug: string) {
  const service = await prisma.scheme.findUnique({
    where: { slug, type: "SERVICE" },
    include: {
      department: true,
      category: true
    }
  });
  return service;
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  // Parse JSON fields
  const benefits = JSON.parse(service.benefits || "[]");
  const documents = JSON.parse(service.requiredDocuments || "[]");
  const onlineSteps = JSON.parse(service.onlineApplicationSteps || "[]");
  const offlineSteps = JSON.parse(service.offlineApplicationSteps || "[]");
  const sourceUrls = JSON.parse(service.sourceUrls || "[]");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/services" className="hover:underline">Services</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground truncate max-w-xs">{service.name}</span>
      </nav>

      {/* Back to list */}
      <div className="mb-6">
        <Link href="/services" className="inline-flex items-center text-xs font-bold text-accent-blue hover:underline space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Services List</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-blue" />
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold text-accent-blue bg-accent-blue/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Central Registry Service
              </span>
              {service.verificationStatus === "VERIFIED" && (
                <span className="text-[10px] font-bold text-accent-green bg-accent-green/10 px-2.5 py-0.5 rounded-full flex items-center space-x-0.5 uppercase tracking-wider">
                  <CheckCircle2 className="h-3 w-3 fill-current" />
                  <span>Verified Direct Portal</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-primary-navy dark:text-foreground tracking-tight leading-tight">
              {service.name}
            </h1>

            <p className="text-sm font-bold text-text-muted">
              {service.department?.name}
            </p>
          </div>

          {/* Service Summary Info */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-extrabold text-lg text-primary-navy dark:text-foreground flex items-center space-x-2">
              <Info className="h-5 w-5 text-accent-blue" />
              <span>Service Summary</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-text-muted block">Processing Time</span>
                <span className="font-extrabold text-foreground text-sm flex items-center space-x-1 mt-0.5">
                  <Clock className="h-4 w-4 text-accent-blue" />
                  <span>{service.processingTime || "Instant / Dynamic"}</span>
                </span>
              </div>
              <div>
                <span className="font-bold text-text-muted block">Application Fees</span>
                <span className="font-extrabold text-foreground text-sm flex items-center space-x-1 mt-0.5">
                  <CreditCard className="h-4 w-4 text-accent-green" />
                  <span>{service.fees}</span>
                </span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">About the Service</h2>
            <p className="text-sm text-text-muted leading-relaxed text-justify whitespace-pre-line">
              {service.fullDescription}
            </p>
          </div>

          {/* Core Utilities / Benefits */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground font-black">Main Benefits & Utilities</h2>
            <ul className="grid grid-cols-1 gap-3">
              {benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2.5 bg-card border border-border p-3.5 rounded-lg text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent-green flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Eligibility</h2>
            <div className="bg-card border border-border rounded-xl p-5 text-sm text-foreground leading-relaxed font-semibold">
              {service.eligibilitySummary}
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Required Documents</h2>
            
            {/* Safety Warning */}
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start space-x-3">
              <ShieldCheck className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-foreground space-y-1">
                <span className="font-extrabold text-red-500 block">Critical Security Notice</span>
                <p>Do not share Aadhaar scans, PAN numbers, OTP codes or passwords with unofficial brokers or websites. JanSeva Bharat never prompts for document uploads.</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              {documents.map((doc: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-3 text-sm text-foreground">
                  <CheckSquare className="h-4 w-4 text-accent-saffron" />
                  <span className="font-semibold">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Apply */}
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Application Steps</h2>

            {/* Online Guide */}
            {onlineSteps.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-extrabold text-base text-accent-blue flex items-center space-x-1.5 border-b border-border pb-2">
                  <span className="px-2 py-0.5 bg-accent-blue/15 rounded text-xs">ONLINE</span>
                  <span>How to Apply Online</span>
                </h3>
                <div className="space-y-4">
                  {onlineSteps.map((step: string, idx: number) => (
                    <div key={idx} className="flex space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent-blue/10 text-accent-blue font-bold text-xs flex items-center justify-center rounded-full">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Guide */}
            {offlineSteps.length > 0 && offlineSteps[0] !== "Not applicable. DigiLocker is an exclusively online cloud service." && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-extrabold text-base text-accent-saffron flex items-center space-x-1.5 border-b border-border pb-2">
                  <span className="px-2 py-0.5 bg-accent-saffron/15 rounded text-xs text-accent-saffron">OFFLINE</span>
                  <span>How to Apply Offline</span>
                </h3>
                <div className="space-y-4">
                  {offlineSteps.map((step: string, idx: number) => (
                    <div key={idx} className="flex space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent-saffron/10 text-accent-saffron font-bold text-xs flex items-center justify-center rounded-full">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sources */}
          <div className="p-4 bg-card border border-border rounded-xl text-xs text-text-muted leading-relaxed">
            <span className="font-bold text-accent-saffron">Verified Source Notice: </span>
            This page is for informational guidance only. Data is collated from verified official portals:
            <ul className="list-disc pl-5 mt-1 font-semibold">
              {sourceUrls.map((url: string, index: number) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline break-all">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column: Sticky actions */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="font-extrabold text-base text-primary-navy dark:text-foreground border-b border-border pb-3">
              Apply Actions
            </h2>

            <div className="space-y-3">
              {service.officialApplyUrl && (
                <a
                  href={service.officialApplyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-blue hover:bg-accent-blue/95 text-white font-black text-center py-3.5 rounded-lg shadow-sm transition duration-150 flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {service.trackStatusUrl && (
                <a
                  href={service.trackStatusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-border hover:bg-card-secondary text-foreground text-center py-3 rounded-lg text-xs font-bold transition duration-150 flex items-center justify-center space-x-2"
                >
                  <span>Track Application Status</span>
                </a>
              )}
            </div>

            {/* Helpline contact */}
            {(service.helplineNumber || service.email) && (
              <div className="border-t border-border pt-4 mt-4 space-y-3">
                <span className="text-xs font-extrabold text-text-muted block uppercase tracking-wider">Helpline Contact</span>
                
                {service.helplineNumber && (
                  <div className="flex items-center space-x-2.5 text-xs text-foreground">
                    <Phone className="h-4 w-4 text-accent-green" />
                    <span className="font-semibold">{service.helplineNumber}</span>
                  </div>
                )}

                {service.email && (
                  <div className="flex items-center space-x-2.5 text-xs text-foreground">
                    <Mail className="h-4 w-4 text-accent-blue" />
                    <a href={`mailto:${service.email}`} className="font-semibold hover:underline truncate">
                      {service.email}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Chat Helper */}
            <div className="bg-gradient-to-r from-accent-saffron/10 to-accent-green/10 border border-border p-4 rounded-xl space-y-2">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-accent-saffron" />
                <span className="text-xs font-extrabold text-foreground">JanSeva AI Helper</span>
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed">
                Need details regarding card correction or fees? Chat with our AI.
              </p>
              <Link
                href={`/ai-assistant?search=${service.name}`}
                className="w-full block bg-white dark:bg-card border border-border text-center py-2 rounded-lg text-xs font-bold text-accent-blue"
              >
                Chat details
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
