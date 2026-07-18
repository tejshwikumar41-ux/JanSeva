import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { 
  Landmark, CheckCircle2, AlertTriangle, HelpCircle, 
  ExternalLink, FileText, ChevronRight, Phone, Mail, 
  MapPin, Clock, Info, ShieldCheck, CheckSquare, Sparkles,
  ArrowLeft
} from "lucide-react";

async function getScheme(slug: string) {
  const scheme = await prisma.scheme.findUnique({
    where: { slug },
    include: {
      state: true,
      category: true,
      department: true,
      faqs: true,
      eligibilityRules: true
    }
  });

  return scheme;
}

async function getRelatedSchemes(categoryId: string | null, stateId: string | null, excludeId: string) {
  if (!categoryId && !stateId) return [];

  const OR_CONDITIONS: any[] = [];
  if (categoryId) OR_CONDITIONS.push({ categoryId });
  if (stateId) OR_CONDITIONS.push({ stateId });

  const schemes = await prisma.scheme.findMany({
    where: {
      AND: [
        { OR: OR_CONDITIONS },
        { NOT: { id: excludeId } }
      ]
    },
    take: 3,
    include: {
      state: true,
      category: true
    }
  });

  return schemes;
}

export default async function SchemeDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const scheme = await getScheme(params.slug);

  if (!scheme) {
    notFound();
  }

  const related = await getRelatedSchemes(scheme.categoryId, scheme.stateId, scheme.id);

  // Parse JSON fields
  const benefits = JSON.parse(scheme.benefits || "[]");
  const documents = JSON.parse(scheme.requiredDocuments || "[]");
  const onlineSteps = JSON.parse(scheme.onlineApplicationSteps || "[]");
  const offlineSteps = JSON.parse(scheme.offlineApplicationSteps || "[]");
  const sourceUrls = JSON.parse(scheme.sourceUrls || "[]");

  const isCentral = scheme.governmentLevel === "CENTRAL";
  const stateLabel = isCentral ? "Central Government" : scheme.state?.name || "State Government";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/schemes" className="hover:underline">Schemes</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground truncate max-w-xs">{scheme.name}</span>
      </nav>

      {/* Back to schemes directory */}
      <div className="mb-6">
        <Link href="/schemes" className="inline-flex items-center text-xs font-bold text-accent-blue hover:underline space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Scheme Directory</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Scheme Details Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Scheme Header Card */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-saffron" />
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold text-accent-saffron bg-accent-saffron/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {scheme.governmentLevel} Govt
              </span>
              <span className="text-[10px] font-bold text-accent-blue bg-accent-blue/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {scheme.category?.name || "Welfare"}
              </span>
              {scheme.verificationStatus === "VERIFIED" && (
                <span className="text-[10px] font-bold text-accent-green bg-accent-green/10 px-2.5 py-0.5 rounded-full flex items-center space-x-0.5 uppercase tracking-wider">
                  <CheckCircle2 className="h-3 w-3 fill-current animate-pulse" />
                  <span>Verified Source</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-primary-navy dark:text-foreground tracking-tight leading-tight">
              {scheme.name}
            </h1>

            <p className="text-sm font-bold text-text-muted">
              {scheme.department?.name} &bull; {stateLabel}
            </p>

            <div className="flex items-center justify-between text-xs text-text-muted border-t border-border pt-4 mt-4">
              <span>Status: <span className="font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded">{scheme.status}</span></span>
              <span>Updated: <span className="font-bold text-foreground">{new Date(scheme.lastUpdated).toLocaleDateString("en-IN")}</span></span>
            </div>
          </div>

          {/* Quick Summary Box */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-extrabold text-lg text-primary-navy dark:text-foreground flex items-center space-x-2">
              <Info className="h-5 w-5 text-accent-blue" />
              <span>Quick Scheme Summary</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="border-b border-border sm:border-b-0 pb-2 sm:pb-0">
                <span className="font-bold text-text-muted block">Main Benefit</span>
                <span className="font-extrabold text-accent-green text-sm">{benefits[0] || "Financial support"}</span>
              </div>
              <div className="border-b border-border sm:border-b-0 pb-2 sm:pb-0">
                <span className="font-bold text-text-muted block">Application Mode</span>
                <span className="font-extrabold text-foreground text-sm uppercase">{scheme.officialApplyUrl ? "Online / Offline" : "Offline Only"}</span>
              </div>
              <div className="border-b border-border sm:border-b-0 pb-2 sm:pb-0">
                <span className="font-bold text-text-muted block">Application Fee</span>
                <span className="font-extrabold text-foreground text-sm">{scheme.fees}</span>
              </div>
              <div>
                <span className="font-bold text-text-muted block">Processing Time</span>
                <span className="font-extrabold text-foreground text-sm">{scheme.processingTime || "Variable"}</span>
              </div>
            </div>
          </div>

          {/* About/Description */}
          <div className="space-y-3" id="overview">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">About the Scheme</h2>
            <p className="text-sm text-text-muted leading-relaxed text-justify whitespace-pre-line">
              {scheme.fullDescription}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-4" id="benefits">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Key Benefits & Coverage</h2>
            <ul className="grid grid-cols-1 gap-3">
              {benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2.5 bg-card border border-border p-3.5 rounded-lg text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent-green flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility Criteria */}
          <div className="space-y-4" id="eligibility">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Eligibility Criteria</h2>
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <p className="text-sm text-foreground font-semibold leading-relaxed">
                {scheme.eligibilitySummary}
              </p>
              
              {/* Show structured rules if available */}
              {scheme.eligibilityRules && scheme.eligibilityRules.length > 0 && (
                <div className="border-t border-border pt-4 mt-2 space-y-3">
                  <span className="text-xs font-extrabold text-primary-navy dark:text-accent-saffron block uppercase tracking-wider">
                    Structured Qualification Rules:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {scheme.eligibilityRules.map((rule) => (
                      <React.Fragment key={rule.id}>
                        {rule.minAge && <div>&bull; Minimum Age: <strong className="text-foreground">{rule.minAge} Years</strong></div>}
                        {rule.maxAge && <div>&bull; Maximum Age: <strong className="text-foreground">{rule.maxAge} Years</strong></div>}
                        {rule.gender && rule.gender !== "ANY" && <div>&bull; Gender: <strong className="text-foreground">{rule.gender}</strong></div>}
                        {rule.maxIncome && <div>&bull; Income Limit: <strong className="text-foreground">Below Rs. {rule.maxIncome}</strong></div>}
                        {rule.caste && rule.caste !== "ANY" && <div>&bull; Category: <strong className="text-foreground">{rule.caste}</strong></div>}
                        {rule.farmerStatus && <div>&bull; Profession: <strong className="text-foreground">Farmer</strong></div>}
                        {rule.studentStatus && <div>&bull; Academic: <strong className="text-foreground">Student</strong></div>}
                        {rule.disabledStatus && <div>&bull; PwD: <strong className="text-foreground">Disabled Citizen</strong></div>}
                        {rule.bplStatus && <div>&bull; Ration Card: <strong className="text-foreground">BPL Card Holder</strong></div>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4" id="documents">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Required Documents</h2>
            
            {/* Safety Warning */}
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start space-x-3">
              <ShieldCheck className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5 animate-bounce" />
              <div className="text-xs text-foreground space-y-1">
                <span className="font-extrabold text-red-500 block">Critical Safety Notice</span>
                <p>Do not upload or share Aadhaar, PAN, bank passbooks, or OTP codes on third-party, unofficial sites. Prepare these documents to submit only on verified official portals listed below.</p>
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
          <div className="space-y-6" id="apply">
            <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Step-by-Step Application Guide</h2>

            {/* Online Guide */}
            {onlineSteps.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-extrabold text-base text-accent-blue flex items-center space-x-1.5 border-b border-border pb-2">
                  <span className="px-2 py-0.5 bg-accent-blue/15 rounded text-xs">ONLINE</span>
                  <span>Online Application Process</span>
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
                  <span>Offline Application Process</span>
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

          {/* FAQs */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div className="space-y-4" id="faqs">
              <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {scheme.faqs.map((faq) => (
                  <details key={faq.id} className="group bg-card border border-border rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                      <h3 className="text-sm font-extrabold text-primary-navy dark:text-foreground flex items-center space-x-2">
                        <HelpCircle className="h-4 w-4 text-accent-blue" />
                        <span>{faq.question}</span>
                      </h3>
                      <span className="transition group-open:-rotate-185 text-text-muted">
                        &darr;
                      </span>
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-muted leading-relaxed pl-6 border-l border-accent-blue/30 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related Schemes */}
          {related.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-primary-navy dark:text-foreground">Related Schemes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/schemes/${rel.slug}`}
                    className="bg-card border border-border p-4 rounded-xl hover:shadow hover:border-accent-saffron/30 transition block"
                  >
                    <span className="text-[10px] font-bold text-accent-saffron block mb-1">
                      {rel.governmentLevel === "CENTRAL" ? "Central" : rel.state?.name}
                    </span>
                    <h3 className="font-extrabold text-xs text-primary-navy dark:text-foreground line-clamp-2">
                      {rel.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Banner */}
          <div className="p-4 bg-card border border-border rounded-xl text-xs text-text-muted leading-relaxed text-justify">
            <span className="font-bold text-accent-saffron">Information Source Notice: </span>
            This page is for informational guidance only. Data is collated from verified official government sources: 
            <ul className="list-disc pl-5 mt-1 font-semibold">
              {sourceUrls.map((url: string, index: number) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline break-all">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-justify">
              Always verify guidelines and apply through the official portals listed under official links. JanSeva Bharat does not process files or collect commissions.
            </p>
          </div>

        </div>

        {/* Right Column: Sticky Quick Action Card */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* Quick Actions Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="font-extrabold text-base text-primary-navy dark:text-foreground border-b border-border pb-3">
              Application Action Center
            </h2>

            <div className="space-y-3">
              {scheme.officialApplyUrl ? (
                <a
                  href={scheme.officialApplyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-saffron hover:bg-accent-saffron/90 text-primary-navy font-black text-center py-3.5 rounded-lg shadow-sm transition duration-150 flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Apply Online (Official)</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <div className="w-full bg-card-secondary text-text-muted text-center py-3 rounded-lg text-sm font-bold border border-dashed border-border">
                  Apply Offline Only
                </div>
              )}

              {scheme.guidelinesPdfUrl && (
                <a
                  href={scheme.guidelinesPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-border hover:bg-card-secondary text-foreground text-center py-3 rounded-lg text-xs font-bold transition duration-150 flex items-center justify-center space-x-2"
                >
                  <FileText className="h-4 w-4 text-red-500" />
                  <span>Scheme Guidelines (PDF)</span>
                </a>
              )}

              {scheme.trackStatusUrl && (
                <a
                  href={scheme.trackStatusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-border hover:bg-card-secondary text-foreground text-center py-3 rounded-lg text-xs font-bold transition duration-150 flex items-center justify-center space-x-2"
                >
                  <span>Track Status</span>
                </a>
              )}
            </div>

            {/* Helpline and Contact */}
            {(scheme.helplineNumber || scheme.email) && (
              <div className="border-t border-border pt-4 mt-4 space-y-3">
                <span className="text-xs font-extrabold text-text-muted block uppercase tracking-wider">Helpline & Support</span>
                
                {scheme.helplineNumber && (
                  <div className="flex items-center space-x-2.5 text-xs text-foreground">
                    <Phone className="h-4 w-4 text-accent-green" />
                    <span className="font-semibold">{scheme.helplineNumber}</span>
                  </div>
                )}

                {scheme.email && (
                  <div className="flex items-center space-x-2.5 text-xs text-foreground">
                    <Mail className="h-4 w-4 text-accent-blue" />
                    <a href={`mailto:${scheme.email}`} className="font-semibold hover:underline truncate">
                      {scheme.email}
                    </a>
                  </div>
                )}
                
                {scheme.officeAddress && (
                  <div className="flex items-start space-x-2.5 text-xs text-foreground">
                    <MapPin className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{scheme.officeAddress}</span>
                  </div>
                )}
              </div>
            )}

            {/* Ask AI Shortcut */}
            <div className="bg-gradient-to-r from-accent-saffron/10 to-accent-green/10 border border-border p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-accent-saffron animate-pulse" />
                <span className="text-xs font-extrabold text-primary-navy dark:text-foreground">Have questions about this?</span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Our AI helper can answer questions about eligibility, documents, or steps for this scheme.
              </p>
              <Link
                href={`/ai-assistant?search=${scheme.name}`}
                className="w-full block bg-white dark:bg-card border border-border text-center py-2 rounded-lg text-xs font-bold text-accent-blue hover:shadow-sm"
              >
                Chat with JanSeva AI
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
