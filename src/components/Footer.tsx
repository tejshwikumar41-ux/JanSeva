"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/translations";
import { Landmark, ShieldAlert, Heart } from "lucide-react";

export default function Footer() {
  const { language } = useApp();

  return (
    <footer className="w-full bg-[#0B1F3A] text-[#E2E8F0] border-t border-[#1E293B] mt-auto">
      {/* Tricolor line for footer accent */}
      <div className="tricolor-strip w-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info & Safety Notice */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded bg-white text-[#0B1F3A] flex items-center justify-center">
                <Landmark className="h-5 w-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                {t("brandName", language)}
              </span>
            </div>
            
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md">
              {t("tagline", language)}
            </p>
            
            {/* Safety Warning */}
            <div className="p-4 rounded-lg bg-[#0F172A]/50 border border-[#334155]/60 flex items-start space-x-3 max-w-md">
              <ShieldAlert className="h-5 w-5 text-accent-saffron flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#CBD5E1] space-y-1">
                <span className="font-bold text-accent-saffron block">Privacy and Safety Notice</span>
                <p>{t("verifyNotice", language)}</p>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-extrabold uppercase text-white tracking-wider mb-4 border-b border-[#334155] pb-2">
              Platform Sections
            </h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link href="/" className="hover:text-accent-saffron transition duration-150">
                  {t("home", language)}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-accent-saffron transition duration-150">
                  {t("schemes", language)}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-saffron transition duration-150">
                  {t("services", language)}
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-accent-saffron transition duration-150">
                  {t("states", language)}
                </Link>
              </li>
              <li>
                <Link href="/eligibility-checker" className="hover:text-accent-saffron transition duration-150">
                  {t("eligibilityChecker", language)}
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-accent-saffron transition duration-150">
                  {t("aiAssistant", language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h3 className="text-sm font-extrabold uppercase text-white tracking-wider mb-4 border-b border-[#334155] pb-2">
              Official Portals
            </h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <a href="https://www.myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-saffron transition duration-150 block">
                  myScheme Portal
                </a>
              </li>
              <li>
                <a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-saffron transition duration-150 block">
                  National Services Portal
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-saffron transition duration-150 block">
                  National Portal of India
                </a>
              </li>
              <li>
                <a href="https://digilocker.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-saffron transition duration-150 block">
                  DigiLocker India
                </a>
              </li>
              <li>
                <a href="https://web.umang.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-saffron transition duration-150 block">
                  UMANG App
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Disclaimer Area */}
        <div className="mt-8 pt-8 border-t border-[#1E293B] text-xs text-[#94A3B8] text-justify space-y-4">
          <p className="leading-relaxed bg-[#0F172A]/30 p-4 rounded border border-[#1E293B]">
            <span className="font-extrabold text-accent-saffron">DISCLAIMER: </span>
            {t("disclaimerText", language)}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-[11px] text-[#64748B]">
            <span>
              &copy; {new Date().getFullYear()} JanSeva Bharat. Independent Informational Platform.
            </span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>for the citizens of India.</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
