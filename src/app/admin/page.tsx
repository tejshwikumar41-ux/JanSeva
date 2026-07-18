"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Landmark, Trash2, Edit, Plus, Search, ShieldCheck, 
  RefreshCw, LogOut, CheckCircle, BarChart3, Database,
  Eye, Save, X, Calendar, Lock, AlertCircle, FileText
} from "lucide-react";

interface AdminScheme {
  id: string;
  name: string;
  slug: string;
  type: string;
  governmentLevel: string;
  status: string;
  verificationStatus: string;
  fees: string;
  stateId?: string | null;
  categoryId?: string | null;
  departmentId?: string | null;
  shortDescription: string;
  fullDescription: string;
  benefits: string;
  requiredDocuments: string;
  onlineApplicationSteps: string;
  offlineApplicationSteps: string;
  officialApplyUrl?: string | null;
  officialWebsiteUrl?: string | null;
  guidelinesPdfUrl?: string | null;
  trackStatusUrl?: string | null;
  helplineNumber?: string | null;
  email?: string | null;
  officeAddress?: string | null;
  processingTime?: string | null;
  eligibilitySummary: string;
  sourceUrls: string;
  keywords?: string | null;
}

export default function AdminDashboardPage() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // CRUD States
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<AdminScheme[]>([]);
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  // Search filter inside table
  const [searchQuery, setSearchQuery] = useState("");

  // Form Panel Toggle: null = listing, "add" = add form, "edit" = edit form
  const [view, setView] = useState<null | "add" | "edit">(null);
  const [editingId, setEditingId] = useState("");

  // Scheme Form Inputs
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formType, setFormType] = useState("SCHEME");
  const [formLevel, setFormLevel] = useState("CENTRAL");
  const [formStateId, setFormStateId] = useState("");
  const [formDeptId, setFormDeptId] = useState("");
  const [formCatId, setFormCatId] = useState("");
  const [formShortDesc, setFormShortDesc] = useState("");
  const [formFullDesc, setFormFullDesc] = useState("");
  const [formEligibility, setFormEligibility] = useState("");
  const [formFees, setFormFees] = useState("Free");
  const [formProcessingTime, setFormProcessingTime] = useState("");
  const [formStatus, setFormStatus] = useState("ACTIVE");
  const [formVerify, setFormVerify] = useState("VERIFIED");
  const [formApplyUrl, setFormApplyUrl] = useState("");
  const [formWebsiteUrl, setFormWebsiteUrl] = useState("");
  const [formPdfUrl, setFormPdfUrl] = useState("");
  const [formTrackUrl, setFormTrackUrl] = useState("");
  const [formHelpline, setFormHelpline] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formKeywords, setFormKeywords] = useState("");

  // Array entries helpers
  const [benefitsInput, setBenefitsInput] = useState("");
  const [docsInput, setDocsInput] = useState("");
  const [onlineInput, setOnlineInput] = useState("");
  const [offlineInput, setOfflineInput] = useState("");
  const [sourcesInput, setSourcesInput] = useState("");

  // Check authentication status on mount
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token === "janseva-authorized") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch schemes & meta metadata
  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch Meta
      const metaRes = await fetch("/api/meta");
      const metaData = await metaRes.json();
      if (metaData.success) {
        setStates(metaData.states);
        setCategories(metaData.categories);
        setDepartments(metaData.departments);
      }

      // Fetch schemes
      const schemesRes = await fetch("/api/admin/schemes");
      const schemesData = await schemesRes.json();
      if (schemesData.success) {
        setSchemes(schemesData.schemes);
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "Password@123") {
      sessionStorage.setItem("adminToken", "janseva-authorized");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid username or password. Check seed credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this scheme? This action is irreversible.")) return;

    try {
      const res = await fetch(`/api/admin/schemes/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setSchemes(prev => prev.filter(s => s.id !== id));
      } else {
        alert("Failed to delete scheme: " + data.error);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const startAdd = () => {
    setView("add");
    setFormName("");
    setFormSlug("");
    setFormType("SCHEME");
    setFormLevel("CENTRAL");
    setFormStateId("");
    setFormDeptId("");
    setFormCatId("");
    setFormShortDesc("");
    setFormFullDesc("");
    setFormEligibility("");
    setFormFees("Free");
    setFormProcessingTime("");
    setFormStatus("ACTIVE");
    setFormVerify("VERIFIED");
    setFormApplyUrl("");
    setFormWebsiteUrl("");
    setFormPdfUrl("");
    setFormTrackUrl("");
    setFormHelpline("");
    setFormEmail("");
    setFormKeywords("");
    setBenefitsInput("");
    setDocsInput("");
    setOnlineInput("");
    setOfflineInput("");
    setSourcesInput("");
  };

  const startEdit = (s: AdminScheme) => {
    setView("edit");
    setEditingId(s.id);
    setFormName(s.name);
    setFormSlug(s.slug);
    setFormType(s.type);
    setFormLevel(s.governmentLevel);
    setFormStateId(s.stateId || "");
    setFormDeptId(s.departmentId || "");
    setFormCatId(s.categoryId || "");
    setFormShortDesc(s.shortDescription);
    setFormFullDesc(s.fullDescription);
    setFormEligibility(s.eligibilitySummary);
    setFormFees(s.fees);
    setFormProcessingTime(s.processingTime || "");
    setFormStatus(s.status);
    setFormVerify(s.verificationStatus);
    setFormApplyUrl(s.officialApplyUrl || "");
    setFormWebsiteUrl(s.officialWebsiteUrl || "");
    setFormPdfUrl(s.guidelinesPdfUrl || "");
    setFormTrackUrl(s.trackStatusUrl || "");
    setFormHelpline(s.helplineNumber || "");
    setFormEmail(s.email || "");
    setFormKeywords(s.keywords || "");

    // Format array strings back to multi-line input text
    setBenefitsInput(JSON.parse(s.benefits || "[]").join("\n"));
    setDocsInput(JSON.parse(s.requiredDocuments || "[]").join("\n"));
    setOnlineInput(JSON.parse(s.onlineApplicationSteps || "[]").join("\n"));
    setOfflineInput(JSON.parse(s.offlineApplicationSteps || "[]").join("\n"));
    setSourcesInput(JSON.parse(s.sourceUrls || "[]").join("\n"));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formName,
      slug: formSlug,
      type: formType,
      governmentLevel: formLevel,
      stateId: formStateId || undefined,
      departmentId: formDeptId || undefined,
      categoryId: formCatId || undefined,
      shortDescription: formShortDesc,
      fullDescription: formFullDesc,
      eligibilitySummary: formEligibility,
      fees: formFees,
      processingTime: formProcessingTime || undefined,
      status: formStatus,
      verificationStatus: formVerify,
      officialApplyUrl: formApplyUrl || undefined,
      officialWebsiteUrl: formWebsiteUrl || undefined,
      guidelinesPdfUrl: formPdfUrl || undefined,
      trackStatusUrl: formTrackUrl || undefined,
      helplineNumber: formHelpline || undefined,
      email: formEmail || undefined,
      keywords: formKeywords || undefined,
      
      // Map multi-line text boxes back to JSON array arrays
      benefits: benefitsInput.split("\n").map(s => s.trim()).filter(Boolean),
      requiredDocuments: docsInput.split("\n").map(s => s.trim()).filter(Boolean),
      onlineApplicationSteps: onlineInput.split("\n").map(s => s.trim()).filter(Boolean),
      offlineApplicationSteps: offlineInput.split("\n").map(s => s.trim()).filter(Boolean),
      sourceUrls: sourcesInput.split("\n").map(s => s.trim()).filter(Boolean),
    };

    try {
      const url = view === "add" ? "/api/admin/schemes" : `/api/admin/schemes/${editingId}`;
      const method = view === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        setView(null);
        fetchAdminData();
      } else {
        alert("Operation failed: " + data.error);
      }
    } catch (err) {
      console.error("Form submit error", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter schemes in listing view
  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    /* Login Form View */
    return (
      <div className="max-w-md mx-auto px-4 py-20 w-full">
        <form onSubmit={handleLogin} className="bg-card border border-border p-8 rounded-2xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary-navy text-accent-saffron flex items-center justify-center rounded-xl shadow-inner">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-extrabold text-primary-navy dark:text-foreground">
              JanSeva Admin Access
            </h1>
            <p className="text-xs text-text-muted">
              Secure administrative portal to manage schemes, services, and verify source urls.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-500 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-4 text-sm">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-navy text-white hover:bg-primary-navy/90 dark:bg-accent-saffron dark:text-primary-navy dark:hover:bg-accent-saffron/90 font-bold py-3 rounded-lg text-sm transition"
          >
            Authenticate Control Center
          </button>

          <div className="text-[10px] text-text-muted text-center pt-2 leading-relaxed">
            Demo Credentials:<br />
            <strong>Username:</strong> admin &bull; <strong>Password:</strong> Password@123
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center space-x-3">
          <Database className="h-6 w-6 text-accent-saffron" />
          <h1 className="text-2xl font-black text-primary-navy dark:text-foreground">
            Administrative Control Panel
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-1 border border-border hover:bg-card-secondary px-3 py-2 rounded-lg text-xs font-bold text-red-500 bg-card"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Panel</span>
        </button>
      </div>

      {view === null ? (
        /* LISTING VIEW */
        <div className="space-y-6">
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-card border border-border p-5 rounded-2xl shadow-sm">
            <div className="text-center p-2 border-r border-border last:border-0">
              <span className="text-2xl font-extrabold text-primary-navy dark:text-foreground block">{schemes.length}</span>
              <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Total Indexed</span>
            </div>
            <div className="text-center p-2 border-r border-border last:border-0">
              <span className="text-2xl font-extrabold text-accent-blue block">{schemes.filter(s => s.type === "SERVICE").length}</span>
              <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Services</span>
            </div>
            <div className="text-center p-2 border-r border-border last:border-0">
              <span className="text-2xl font-extrabold text-accent-green block">{schemes.filter(s => s.verificationStatus === "VERIFIED").length}</span>
              <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Verified Sources</span>
            </div>
            <div className="text-center p-2">
              <span className="text-2xl font-extrabold text-accent-saffron block">{schemes.filter(s => s.status === "ACTIVE").length}</span>
              <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Active Status</span>
            </div>
          </div>

          {/* Header Action Row */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Table Search */}
            <div className="flex-grow flex items-center bg-background border border-border px-3 py-2 rounded-lg max-w-md w-full">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search index by name or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-foreground"
              />
            </div>

            <button
              onClick={startAdd}
              className="bg-accent-saffron text-primary-navy font-extrabold text-xs px-5 py-2.5 rounded-lg flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Entry</span>
            </button>
          </div>

          {/* Schemes Management Table */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-card-secondary text-foreground uppercase tracking-wider border-b border-border text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Name / ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Gov Level</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Verification</th>
                    <th className="px-6 py-4 text-center">Control Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-semibold">
                  {filteredSchemes.map((s) => (
                    <tr key={s.id} className="hover:bg-card-secondary/25 transition">
                      <td className="px-6 py-4">
                        <div className="font-extrabold text-foreground">{s.name}</div>
                        <div className="text-[10px] text-text-muted font-normal mt-0.5">{s.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.type === "SERVICE" ? "bg-accent-blue/10 text-accent-blue" : "bg-card-secondary text-foreground"}`}>
                          {s.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 uppercase text-[10px] font-bold text-text-muted">
                        {s.governmentLevel}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-extrabold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded uppercase">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-extrabold bg-card-secondary px-2 py-0.5 rounded ${s.verificationStatus === "VERIFIED" ? "text-accent-green" : "text-text-muted"}`}>
                          {s.verificationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center space-x-2.5">
                        <button
                          onClick={() => startEdit(s)}
                          className="p-1.5 rounded-lg border border-border text-foreground hover:bg-card-secondary"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <Link
                          href={s.type === "SERVICE" ? `/services/${s.slug}` : `/schemes/${s.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-border text-foreground hover:bg-card-secondary"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg border border-border text-red-500 hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSchemes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-text-muted">
                        No entries match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-card border border-border rounded-xl text-xs text-text-muted leading-relaxed">
            <span className="font-extrabold text-accent-saffron">Coverage Note:</span> Admins can continuously append, draft, and publish schemes. Data is synced to local file database `prisma/dev.db` instantly.
          </div>

        </div>
      ) : (
        /* ADD OR EDIT FORM VIEW */
        <form onSubmit={handleFormSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="font-extrabold text-lg text-primary-navy dark:text-foreground">
              {view === "add" ? "Create New Scheme / Service Entry" : `Edit: ${formName}`}
            </span>
            <button
              type="button"
              onClick={() => setView(null)}
              className="text-gray-400 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content Scrollable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            
            {/* Core Fields */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-xs text-primary-navy dark:text-accent-saffron uppercase border-b border-border pb-1">Core Specifications</h3>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Scheme Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Atal Pension Yojana"
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">URL Slug (Unique identifier) *</label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="e.g. atal-pension-yojana"
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  >
                    <option value="SCHEME">Scheme</option>
                    <option value="SERVICE">Service</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Level</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  >
                    <option value="CENTRAL">Central</option>
                    <option value="STATE">State</option>
                    <option value="UT">UT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">State (If State level)</label>
                  <select
                    value={formStateId}
                    onChange={(e) => setFormStateId(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  >
                    <option value="">None / Central</option>
                    {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Category / Sector</label>
                  <select
                    value={formCatId}
                    onChange={(e) => setFormCatId(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  >
                    <option value="">None</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Department / Ministry</label>
                <select
                  value={formDeptId}
                  onChange={(e) => setFormDeptId(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                >
                  <option value="">None</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Keywords (Comma separated)</label>
                <input
                  type="text"
                  value={formKeywords}
                  onChange={(e) => setFormKeywords(e.target.value)}
                  placeholder="e.g. pension, senior, social security"
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>

            </div>

            {/* Descriptions & Summary */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-xs text-primary-navy dark:text-accent-saffron uppercase border-b border-border pb-1">Descriptions & Status</h3>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Short Description *</label>
                <textarea
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  rows={2}
                  placeholder="Brief summary displayed on listings..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Full Description *</label>
                <textarea
                  value={formFullDesc}
                  onChange={(e) => setFormFullDesc(e.target.value)}
                  rows={5}
                  placeholder="Detailed markdown description of the program..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Fees</label>
                  <input
                    type="text"
                    value={formFees}
                    onChange={(e) => setFormFees(e.target.value)}
                    placeholder="e.g. Free"
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Processing Time</label>
                  <input
                    type="text"
                    value={formProcessingTime}
                    onChange={(e) => setFormProcessingTime(e.target.value)}
                    placeholder="e.g. 15 working days"
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="CLOSED">Closed</option>
                    <option value="UPCOMING">Upcoming</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Verification Status</label>
                  <select
                    value={formVerify}
                    onChange={(e) => setFormVerify(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                  >
                    <option value="VERIFIED">Verified Source</option>
                    <option value="UNVERIFIED">Unverified</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Links & Helpline Contact Details */}
          <div className="space-y-4 border-t border-border pt-6 text-sm">
            <h3 className="font-extrabold text-xs text-primary-navy dark:text-accent-saffron uppercase border-b border-border pb-1">Helpline Contacts & Official Links</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Official Apply Link</label>
                <input
                  type="url"
                  value={formApplyUrl}
                  onChange={(e) => setFormApplyUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Official Homepage URL</label>
                <input
                  type="url"
                  value={formWebsiteUrl}
                  onChange={(e) => setFormWebsiteUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Guidelines PDF Document URL</label>
                <input
                  type="url"
                  value={formPdfUrl}
                  onChange={(e) => setFormPdfUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Track Status URL</label>
                <input
                  type="url"
                  value={formTrackUrl}
                  onChange={(e) => setFormTrackUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Helpline Phone Number</label>
                <input
                  type="text"
                  value={formHelpline}
                  onChange={(e) => setFormHelpline(e.target.value)}
                  placeholder="e.g. 1800115526"
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Ministry Email</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. support@gov.in"
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {/* List and Checklist Textareas */}
          <div className="space-y-4 border-t border-border pt-6 text-sm">
            <h3 className="font-extrabold text-xs text-primary-navy dark:text-accent-saffron uppercase border-b border-border pb-1">
              Beneficiary Lists & Step-by-Step guides (Enter each entry on a new line)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">🌟 Key Benefits List</label>
                <textarea
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  rows={4}
                  placeholder="Benefit 1&#10;Benefit 2..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">📂 Required Documents List</label>
                <textarea
                  value={docsInput}
                  onChange={(e) => setDocsInput(e.target.value)}
                  rows={4}
                  placeholder="Aadhaar Card&#10;Income Certificate..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">💻 Online Application Steps</label>
                <textarea
                  value={onlineInput}
                  onChange={(e) => setOnlineInput(e.target.value)}
                  rows={4}
                  placeholder="Visit official portal&#10;Fill the details..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">🔌 Offline Application Steps</label>
                <textarea
                  value={offlineInput}
                  onChange={(e) => setOfflineInput(e.target.value)}
                  rows={4}
                  placeholder="Visit nearest Anganwadi&#10;Submit document duplicates..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">🔗 Official Reference / Source URLs</label>
              <textarea
                value={sourcesInput}
                onChange={(e) => setSourcesInput(e.target.value)}
                rows={2}
                placeholder="https://myscheme.gov.in&#10;https://india.gov.in"
                className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted">📋 Eligibility Criteria Summary</label>
              <textarea
                value={formEligibility}
                onChange={(e) => setFormEligibility(e.target.value)}
                rows={3}
                placeholder="Summarized qualification rules (e.g. Small farmers having families under Rs 2 Lakh income)..."
                className="w-full bg-background border border-border px-3 py-2 rounded-lg text-foreground outline-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-border flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setView(null)}
              className="border border-border hover:bg-card-secondary px-5 py-2.5 rounded-lg text-xs font-bold text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent-saffron text-primary-navy font-extrabold text-xs px-6 py-2.5 rounded-lg flex items-center space-x-1.5 shadow-sm"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Entry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
