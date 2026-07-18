"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/translations";
import { 
  Search, Sprout, GraduationCap, HeartPulse, HandHelping, 
  Baby, Briefcase, Landmark, ShieldCheck, HelpCircle, 
  TrendingUp, Sparkles, AlertTriangle, ArrowRight, BookOpen,
  MapPin, ShieldAlert
} from "lucide-react";

interface HomeClientProps {
  stats: {
    centralCount: number;
    stateCount: number;
    servicesCount: number;
    categoriesCount: number;
    statesCount: number;
    verifiedCount: number;
  };
  popularServices: any[];
  categories: any[];
  states: any[];
  latestSchemes: any[];
}

export default function HomeClient({
  stats,
  popularServices,
  categories,
  states,
  latestSchemes
}: HomeClientProps) {
  const { language } = useApp();

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
            {t("discoverHeroTitle", language).split("Scheme")[0]}
            <span className="text-accent-saffron">
              {language === "hi" ? "सरकारी योजना" : "Government Scheme"}
            </span>
            {language === "hi" ? " की खोज करें" : "s in India"}
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            {t("discoverHeroSubtitle", language)}
          </p>

          {/* Hero Search Box */}
          <form action="/schemes" method="GET" className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch gap-2 bg-white/15 p-2 rounded-xl border border-white/20 backdrop-blur-lg shadow-2xl">
            <div className="flex-grow flex items-center bg-card rounded-lg px-3 py-2 text-foreground">
              <Search className="h-5 w-5 text-gray-400 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                name="search"
                placeholder={t("searchPlaceholder", language)}
                className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 font-medium py-1 text-foreground"
              />
            </div>
            <button
              type="submit"
              className="bg-accent-saffron hover:bg-accent-saffron/90 text-primary-navy font-bold text-sm px-6 py-3 rounded-lg shadow-md transition duration-150 flex items-center justify-center space-x-1"
            >
              <span>{t("searchBtn", language)}</span>
            </button>
          </form>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/schemes"
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-bold transition duration-150"
            >
              {t("exploreSchemesBtn", language)}
            </Link>
            <Link
              href="/eligibility-checker"
              className="px-5 py-2.5 rounded-full bg-accent-saffron text-primary-navy hover:bg-accent-saffron/95 text-sm font-bold shadow transition duration-150"
            >
              {t("checkEligibilityBtn", language)}
            </Link>
            <Link
              href="/ai-assistant"
              className="px-5 py-2.5 rounded-full bg-accent-green text-white hover:bg-accent-green/95 text-sm font-bold shadow transition duration-150 flex items-center space-x-1.5"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>{t("askAiAssistantBtn", language)}</span>
            </Link>
            <Link
              href="/states"
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-bold transition duration-150"
            >
              {t("browseByStateBtn", language)}
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
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">{t("statsCentralSchemes", language)}</p>
          </div>
          <div className="text-center p-3 border-r border-border last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-navy dark:text-accent-saffron">
              {stats.stateCount}+
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">{t("statsStateSchemes", language)} ({stats.statesCount} {language === "hi" ? "राज्य/UT" : "States/UTs"})</p>
          </div>
          <div className="text-center p-3 border-r border-border last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-navy dark:text-accent-saffron">
              {stats.categoriesCount}+
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">{t("statsSectors", language)}</p>
          </div>
          <div className="text-center p-3 last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-accent-green">
              {stats.verifiedCount}
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-muted mt-1">{t("statsVerified", language)}</p>
          </div>
        </div>
      </section>

      {/* 3. Popular Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              {t("popularServicesTitle", language)}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {t("popularServicesSubtitle", language)}
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-accent-blue hover:underline flex items-center space-x-1"
          >
            <span>{t("viewAllBtn", language)}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <div
              key={service.id}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-primary-navy/5 text-primary-navy dark:bg-card-secondary dark:text-accent-saffron border border-border">
                    {service.governmentLevel}
                  </span>
                  <span className="flex items-center text-[9px] text-accent-green font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5 mr-0.5" />
                    {t("verifiedBadge", language)}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2">
                  {service.shortDescription}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
                <Link
                  href={service.officialApplyUrl || "#"}
                  target="_blank"
                  className="text-xs font-bold text-accent-saffron hover:underline"
                >
                  {t("applyOnlineBtn", language)}
                </Link>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-accent-blue hover:underline"
                >
                  {t("detailsBtn", language)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              {t("browseCategoryTitle", language)}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {t("browseCategorySubtitle", language)}
            </p>
          </div>
          <Link
            href="/schemes"
            className="text-xs font-bold text-accent-blue hover:underline flex items-center space-x-1"
          >
            <span>{t("viewAllBtn", language)}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon || "Sprout"] || Sprout;
            const translatedCatName = t(category.slug, language) || category.name;
            return (
              <Link
                key={category.id}
                href={`/schemes?category=${category.id}`}
                className="bg-card border border-border rounded-xl p-5 hover:border-accent-saffron hover:shadow-sm transition text-center flex flex-col items-center justify-center space-y-3 group"
              >
                <div className="p-3.5 rounded-full bg-primary-navy/5 text-primary-navy group-hover:bg-accent-saffron/10 group-hover:text-accent-saffron transition-colors duration-200">
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="font-extrabold text-xs text-primary-navy dark:text-foreground group-hover:text-accent-saffron transition-colors duration-150 block line-clamp-2">
                  {translatedCatName}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Browse by State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              {t("browseStateTitle", language)}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {t("browseStateSubtitle", language)}
            </p>
          </div>
          <Link
            href="/states"
            className="text-xs font-bold text-accent-blue hover:underline flex items-center space-x-1"
          >
            <span>{t("viewAllBtn", language)}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {states.map((state) => {
            const translatedStateName = t(`state_${state.slug}`, language) || state.name;
            return (
              <Link
                key={state.id}
                href={`/states/${state.slug}`}
                className="bg-card border border-border rounded-xl p-4 hover:border-accent-green hover:shadow-sm transition flex items-center space-x-3 group"
              >
                <div className="p-2 rounded-lg bg-accent-green/10 text-accent-green">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="font-bold text-xs text-primary-navy dark:text-foreground group-hover:text-accent-green transition-colors duration-150 truncate">
                  {translatedStateName}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. Latest Schemes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
              {t("latestSchemesTitle", language)}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {t("latestSchemesSubtitle", language)}
            </p>
          </div>
          <Link
            href="/schemes"
            className="text-xs font-bold text-accent-blue hover:underline flex items-center space-x-1"
          >
            <span>{t("viewAllBtn", language)}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-navy/5 text-primary-navy dark:bg-card-secondary dark:text-accent-saffron border border-border">
                    {scheme.governmentLevel === "CENTRAL" ? "Central" : scheme.state?.name}
                  </span>
                  <span className="text-[10px] font-semibold text-text-muted flex items-center">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    {new Date(scheme.lastUpdated).toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground line-clamp-1">
                  {scheme.name}
                </h3>
                <p className="text-xs text-text-muted line-clamp-3 leading-relaxed">
                  {scheme.shortDescription}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-bold text-text-muted">{scheme.category?.name}</span>
                <Link
                  href={`/schemes/${scheme.slug}`}
                  className="text-xs font-bold text-accent-blue hover:underline flex items-center space-x-0.5"
                >
                  <span>{t("detailsBtn", language)}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-card-secondary border border-border rounded-2xl py-12 px-6 sm:px-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy dark:text-foreground">
            {t("howItWorksTitle", language)}
          </h2>
          <p className="text-sm text-text-muted">
            {t("howItWorksSubtitle", language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-6 rounded-xl text-center space-y-3">
            <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">
              {t("howStep1Title", language)}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {t("howStep1Desc", language)}
            </p>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl text-center space-y-3">
            <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">
              {t("howStep2Title", language)}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {t("howStep2Desc", language)}
            </p>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl text-center space-y-3">
            <h3 className="font-extrabold text-base text-primary-navy dark:text-foreground">
              {t("howStep3Title", language)}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {t("howStep3Desc", language)}
            </p>
          </div>
        </div>
      </section>

      {/* 8. AI Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-primary-navy to-[#15345d] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-white/10">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-accent-saffron">
              {t("aiCTATitle", language)}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-medium">
              {t("aiCTASubtitle", language)}
            </p>
          </div>
          <Link
            href="/ai-assistant"
            className="bg-accent-saffron text-primary-navy hover:bg-accent-saffron/90 font-bold px-6 py-3 rounded-lg text-sm transition shadow-md flex items-center space-x-2 flex-shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>{t("askAiAssistantBtn", language)}</span>
          </Link>
        </div>
      </section>

      {/* 9. Safety & Privacy Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-500 flex-shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-red-500 uppercase tracking-wider">
              {t("safetyTitle", language)}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed font-semibold">
              {t("safetyDesc", language)}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
