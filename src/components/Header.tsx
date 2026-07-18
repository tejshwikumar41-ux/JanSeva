"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp, Language } from "@/context/AppContext";
import { languageNames, t } from "@/lib/translations";
import { Sun, Moon, Languages, Menu, X, Landmark, Type } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, toggleTheme, language, setLanguage, largeFont, toggleLargeFont } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: t("home", language), href: "/" },
    { name: t("schemes", language), href: "/schemes" },
    { name: t("services", language), href: "/services" },
    { name: t("states", language), href: "/states" },
    { name: t("eligibilityChecker", language), href: "/eligibility-checker" },
    { name: t("aiAssistant", language), href: "/ai-assistant" }
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-card border-b border-border transition-colors duration-200">
      {/* Tricolor Strip */}
      <div className="tricolor-strip w-full" />

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-primary-navy text-accent-saffron flex items-center justify-center shadow-inner">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-primary-navy dark:text-foreground">
                  {t("brandName", language)}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-text-muted dark:text-text-muted hidden md:inline truncate max-w-[300px]">
                  {t("tagline", language)}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-150 ${
                  isActive(link.href)
                    ? "bg-primary-navy text-white dark:bg-accent-saffron dark:text-primary-navy shadow"
                    : "text-foreground hover:bg-card-secondary hover:text-primary-navy dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions (Language, Theme, Font, Mobile Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Accessibility Font Size Toggle */}
            <button
              onClick={toggleLargeFont}
              title={t("textLarge", language)}
              className={`p-2 rounded-full border transition-all duration-150 ${
                largeFont
                  ? "bg-accent-saffron text-primary-navy border-accent-saffron"
                  : "border-border text-foreground hover:bg-card-secondary"
              }`}
              aria-label="Toggle Font Size"
            >
              <Type className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "light" ? t("themeDark", language) : t("themeLight", language)}
              className="p-2 rounded-full border border-border text-foreground hover:bg-card-secondary transition-all duration-150"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-navy" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-accent-saffron" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-border text-foreground hover:bg-card-secondary transition-all duration-150"
                aria-label="Select Language"
              >
                <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-accent-blue" />
                <span className="text-xs font-bold uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border ring-1 ring-black ring-opacity-5 z-20 max-h-80 overflow-y-auto">
                    <div className="py-1">
                      {(Object.keys(languageNames) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageChange(lang)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-card-secondary ${
                            language === lang
                              ? "font-extrabold text-accent-blue bg-card-secondary"
                              : "text-foreground"
                          }`}
                        >
                          {languageNames[lang]}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md border border-border text-foreground hover:bg-card-secondary"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-card border-t border-border px-4 py-3 space-y-1 shadow-inner transition-all duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-bold transition-all duration-150 ${
                isActive(link.href)
                  ? "bg-primary-navy text-white dark:bg-accent-saffron dark:text-primary-navy"
                  : "text-foreground hover:bg-card-secondary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
