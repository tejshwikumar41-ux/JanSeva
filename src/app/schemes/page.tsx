"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Search, SlidersHorizontal, Grid, List, Landmark, 
  RefreshCw, MapPin, Calendar, CheckCircle2, UserCheck, 
  HelpCircle, ExternalLink, ChevronRight, X
} from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  slug: string;
  type: string;
  governmentLevel: string;
  state?: { name: string; slug: string } | null;
  department?: { name: string } | null;
  category?: { name: string } | null;
  shortDescription: string;
  benefits: string;
  requiredDocuments: string;
  eligibilitySummary: string;
  fees: string;
  status: string;
  verificationStatus: string;
  officialApplyUrl?: string | null;
  lastUpdated: string;
}

function SchemesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Loading States
  const [loading, setLoading] = useState(true);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  // Search & Filter State
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [level, setLevel] = useState("");
  const [stateId, setStateId] = useState(searchParams.get("stateId") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");
  const [deptId, setDeptId] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [sort, setSort] = useState("az");

  // Eligibility Filters
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [caste, setCaste] = useState("");
  const [farmer, setFarmer] = useState(false);
  const [student, setStudent] = useState(false);
  const [senior, setSenior] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bpl, setBpl] = useState(false);

  // Layout View Mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch Meta Filters Data
  useEffect(() => {
    async function fetchMeta() {
      try {
        const res = await fetch("/api/meta");
        const data = await res.json();
        if (data.success) {
          setStates(data.states);
          setCategories(data.categories);
          setDepartments(data.departments);
        }
      } catch (err) {
        console.error("Failed to load metadata", err);
      }
    }
    fetchMeta();
  }, []);

  // Fetch Schemes from API
  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (level) query.append("level", level);
      if (stateId) query.append("stateId", stateId);
      if (categoryId) query.append("categoryId", categoryId);
      if (deptId) query.append("departmentId", deptId);
      if (status) query.append("status", status);
      if (sort) query.append("sort", sort);
      if (gender) query.append("gender", gender);
      if (age) query.append("age", age);
      if (income) query.append("maxIncome", income);
      if (caste) query.append("caste", caste);
      if (farmer) query.append("farmer", "true");
      if (student) query.append("student", "true");
      if (senior) query.append("senior", "true");
      if (disabled) query.append("disabled", "true");
      if (bpl) query.append("bpl", "true");

      const res = await fetch(`/api/schemes?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes);
      }
    } catch (err) {
      console.error("Failed to load schemes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [
    search, level, stateId, categoryId, deptId, status, sort,
    gender, age, income, caste, farmer, student, senior, disabled, bpl
  ]);

  const resetFilters = () => {
    setSearch("");
    setLevel("");
    setStateId("");
    setCategoryId("");
    setDeptId("");
    setStatus("ACTIVE");
    setGender("");
    setAge("");
    setIncome("");
    setCaste("");
    setFarmer(false);
    setStudent(false);
    setSenior(false);
    setDisabled(false);
    setBpl(false);
    setSort("az");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">Schemes</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Filter Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 bg-card border border-border p-6 rounded-xl space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-extrabold text-base text-primary-navy dark:text-foreground flex items-center space-x-1.5">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter Options</span>
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-accent-blue font-bold hover:underline"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-4">
            {/* Gov Level */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Government Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              >
                <option value="">All Governments</option>
                <option value="CENTRAL">Central Government</option>
                <option value="STATE">State Government</option>
                <option value="UT">Union Territory</option>
              </select>
            </div>

            {/* State */}
            {(level === "STATE" || level === "UT" || !level) && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">State / UT</label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="">All States / UTs</option>
                  {states.map((st) => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Category / Sector</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Ministry / Department</label>
              <select
                value={deptId}
                onChange={(e) => setDeptId(e.target.value)}
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              >
                <option value="">All Ministries</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Your Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              />
            </div>

            {/* Income */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Annual Income (Rs.)</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter family income"
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              />
            </div>

            {/* Caste */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Category / Caste</label>
              <select
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              >
                <option value="">Any</option>
                <option value="GENERAL">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              >
                <option value="">Any</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="TRANSGENDER">Transgender</option>
              </select>
            </div>

            {/* Social status checkboxes */}
            <div className="space-y-2 border-t border-border pt-4">
              <span className="text-xs font-bold text-text-muted block">Demographic Status</span>
              
              <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={farmer}
                  onChange={(e) => setFarmer(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Farmer</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={student}
                  onChange={(e) => setStudent(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Student</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={senior}
                  onChange={(e) => setSenior(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Senior Citizen</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Disabled (PwD)</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={bpl}
                  onChange={(e) => setBpl(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Below Poverty Line (BPL)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Schemes Listings Area */}
        <section className="flex-grow w-full space-y-6">
          {/* Controls Bar */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Live Text Search */}
            <div className="flex-grow flex items-center bg-background border border-border px-3 py-2 rounded-lg">
              <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search Aadhaar, PM Kisan, scholarships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 text-foreground"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Layout Toggles & Sorting */}
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center space-x-1.5 border border-border rounded-lg p-1 bg-background">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition ${viewMode === "grid" ? "bg-card text-accent-saffron shadow-sm" : "text-gray-400 hover:text-foreground"}`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition ${viewMode === "list" ? "bg-card text-accent-saffron shadow-sm" : "text-gray-400 hover:text-foreground"}`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
              >
                <option value="az">A to Z</option>
                <option value="newest">Newest Added</option>
                <option value="recent">Recently Updated</option>
              </select>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden p-2 rounded-lg border border-border text-foreground hover:bg-card-secondary flex items-center space-x-1"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-xs font-bold">Filters</span>
              </button>
            </div>

          </div>

          {/* Listings */}
          {loading ? (
            /* Loading State Skeletons */
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4 rounded" />
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 w-5/6 rounded" />
                  </div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 w-full rounded pt-4" />
                </div>
              ))}
            </div>
          ) : schemes.length === 0 ? (
            /* Empty State */
            <div className="bg-card border border-border rounded-xl p-12 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-card-secondary text-gray-400 flex items-center justify-center">
                <HelpCircle className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-lg text-primary-navy dark:text-foreground">No Schemes Found</h3>
                <p className="text-sm text-text-muted max-w-md mx-auto">
                  We couldn't find any verified schemes matching your filter conditions. Try resetting or adjusting the sidebar options.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="bg-accent-saffron text-primary-navy hover:bg-accent-saffron/90 font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Card Grid or List */
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
              {schemes.map((scheme) => {
                const benefits = JSON.parse(scheme.benefits || "[]");
                return (
                  <div
                    key={scheme.id}
                    className={`bg-card border border-border rounded-xl p-6 transition-all duration-150 hover:shadow-md hover:border-accent-saffron/30 flex flex-col justify-between ${
                      viewMode === "list" ? "md:flex-row md:items-start md:space-x-6" : ""
                    }`}
                  >
                    <div className="space-y-3 flex-grow">
                      <div className="flex flex-wrap gap-1.5 items-center text-[10px] font-bold">
                        <span className="text-accent-saffron bg-accent-saffron/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {scheme.governmentLevel === "CENTRAL" ? "Central" : scheme.state?.name || "State"}
                        </span>
                        {scheme.category && (
                          <span className="text-[#64748B] dark:text-[#94A3B8] bg-card-secondary px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {scheme.category.name}
                          </span>
                        )}
                        {scheme.verificationStatus === "VERIFIED" && (
                          <span className="text-accent-green bg-accent-green/10 px-2.5 py-0.5 rounded-full flex items-center space-x-0.5">
                            <CheckCircle2 className="h-3 w-3 fill-current" />
                            <span>VERIFIED OFFICIAL LINK</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-lg text-primary-navy dark:text-foreground tracking-tight line-clamp-2">
                        {scheme.name}
                      </h3>

                      <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                        {scheme.shortDescription}
                      </p>

                      {/* Primary benefit tag */}
                      {benefits.length > 0 && (
                        <div className="pt-2">
                          <span className="text-xs font-semibold text-text-muted">
                            Main Benefit: <span className="font-extrabold text-accent-green">{benefits[0]}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={`pt-4 border-t border-border mt-4 flex items-center gap-2 ${
                      viewMode === "list" ? "md:pt-0 md:border-t-0 md:mt-0 md:flex-col md:w-44 md:justify-start md:items-stretch" : "justify-between"
                    }`}>
                      <Link
                        href={`/schemes/${scheme.slug}`}
                        className="flex-grow text-center text-xs bg-primary-navy text-white dark:bg-card-secondary dark:text-foreground dark:hover:bg-accent-saffron dark:hover:text-primary-navy py-2 px-3 rounded-lg font-bold hover:bg-primary-navy/95 transition duration-150"
                      >
                        Preview Scheme
                      </Link>
                      
                      {scheme.officialApplyUrl ? (
                        <a
                          href={scheme.officialApplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center text-xs border border-border hover:bg-card-secondary py-2 px-3 rounded-lg font-bold text-foreground transition duration-150 space-x-1"
                        >
                          <span>Apply</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-text-muted py-2 px-3 text-center bg-card-secondary rounded-lg">
                          Offline Only
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>

      {/* Mobile Drawer Slide-over Filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-card border-l border-border p-6 shadow-xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
              <span className="font-extrabold text-base text-primary-navy dark:text-foreground flex items-center space-x-1.5">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 pb-20">
              {/* Dynamic state, age, and income selectors (mimics desktop sidebar) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Government Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="">All Governments</option>
                  <option value="CENTRAL">Central Government</option>
                  <option value="STATE">State Government</option>
                  <option value="UT">Union Territory</option>
                </select>
              </div>

              {(level === "STATE" || level === "UT" || !level) && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">State / UT</label>
                  <select
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                    className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                  >
                    <option value="">All States / UTs</option>
                    {states.map((st) => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Category / Sector</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Your Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Annual Income (Rs.)</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Enter family income"
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Category / Caste</label>
                <select
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="">Any</option>
                  <option value="GENERAL">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="">Any</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="TRANSGENDER">Transgender</option>
                </select>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-bold text-text-muted block">Demographic Status</span>
                
                <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={farmer}
                    onChange={(e) => setFarmer(e.target.checked)}
                    className="rounded accent-accent-saffron h-4 w-4"
                  />
                  <span>Farmer</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={student}
                    onChange={(e) => setStudent(e.target.checked)}
                    className="rounded accent-accent-saffron h-4 w-4"
                  />
                  <span>Student</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={senior}
                    onChange={(e) => setSenior(e.target.checked)}
                    className="rounded accent-accent-saffron h-4 w-4"
                  />
                  <span>Senior Citizen</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                    className="rounded accent-accent-saffron h-4 w-4"
                  />
                  <span>Disabled (PwD)</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bpl}
                    onChange={(e) => setBpl(e.target.checked)}
                    className="rounded accent-accent-saffron h-4 w-4"
                  />
                  <span>BPL Status</span>
                </label>
              </div>

              <button
                onClick={() => {
                  resetFilters();
                  setMobileFiltersOpen(false);
                }}
                className="w-full text-center text-xs font-extrabold border border-border py-2.5 rounded-lg text-foreground hover:bg-card-secondary"
              >
                Clear All Filters
              </button>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full text-center text-xs font-extrabold bg-accent-saffron text-primary-navy py-2.5 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SchemesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-accent-saffron" />
        <p className="text-sm mt-2 text-text-muted">Loading Directory...</p>
      </div>
    }>
      <SchemesContent />
    </Suspense>
  );
}
