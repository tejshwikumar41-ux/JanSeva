"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Landmark, CheckCircle2, ChevronRight, RefreshCw, 
  HelpCircle, ArrowRight, Sparkles, AlertTriangle, ShieldCheck
} from "lucide-react";

interface MatchResult {
  scheme: {
    id: string;
    name: string;
    slug: string;
    governmentLevel: string;
    shortDescription: string;
    fees: string;
    state?: { name: string } | null;
  };
  reasons: string[];
}

export default function EligibilityCheckerPage() {
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);

  // Form Fields State
  const [stateId, setStateId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("ANY");
  const [income, setIncome] = useState("");
  const [caste, setCaste] = useState("ANY");
  const [student, setStudent] = useState(false);
  const [farmer, setFarmer] = useState(false);
  const [senior, setSenior] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bpl, setBpl] = useState(false);
  const [widow, setWidow] = useState(false);
  const [minority, setMinority] = useState(false);

  // Fetch States list for dropdown
  useEffect(() => {
    async function fetchMeta() {
      try {
        const res = await fetch("/api/meta");
        const data = await res.json();
        if (data.success) {
          setStates(data.states);
        }
      } catch (err) {
        console.error("Failed to load states", err);
      }
    }
    fetchMeta();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        stateId: stateId || undefined,
        age: age ? parseInt(age) : undefined,
        gender: gender !== "ANY" ? gender : undefined,
        income: income ? parseFloat(income) : undefined,
        caste: caste !== "ANY" ? caste : undefined,
        student,
        farmer,
        senior,
        disabled,
        bpl,
        widow,
        minority
      };

      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.matches);
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to check eligibility", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStateId("");
    setAge("");
    setGender("ANY");
    setIncome("");
    setCaste("ANY");
    setStudent(false);
    setFarmer(false);
    setSenior(false);
    setDisabled(false);
    setBpl(false);
    setWidow(false);
    setMinority(false);
    setResults([]);
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">Eligibility Checker</span>
      </nav>

      {/* Header Info */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-navy dark:text-foreground">
          Eligibility Checker Engine
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          Input your details below to calculate which Central or State schemes you qualify for. We respect your privacy and do not save your inputted details on any server.
        </p>
      </div>

      {!submitted ? (
        /* Form Card */
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Left: General Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-primary-navy dark:text-accent-saffron uppercase tracking-wider border-b border-border pb-2">
                1. General Profile
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Residence State / UT</label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                  required
                >
                  <option value="">Choose State</option>
                  {states.map((st) => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Your Age (in Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age (e.g. 28)"
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                  min="0"
                  max="150"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="ANY">Any / Choose not to say</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="TRANSGENDER">Transgender</option>
                </select>
              </div>
            </div>

            {/* Right: Socio-Economic Profile */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-primary-navy dark:text-accent-saffron uppercase tracking-wider border-b border-border pb-2">
                2. Socio-Economic Profile
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Annual Family Income (Rs.)</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Enter annual income"
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                  min="0"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted">Social Category / Caste</label>
                <select
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm outline-none"
                >
                  <option value="ANY">General / Unspecified</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>

          </div>

          {/* Demographic checkboxes */}
          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-sm font-extrabold text-primary-navy dark:text-accent-saffron uppercase tracking-wider">
              3. Check all statuses that apply to you
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={farmer}
                  onChange={(e) => setFarmer(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Farmer</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={student}
                  onChange={(e) => setStudent(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Student</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={senior}
                  onChange={(e) => setSenior(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Senior Citizen</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Disabled (PwD)</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={bpl}
                  onChange={(e) => setBpl(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>BPL Status</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={widow}
                  onChange={(e) => setWidow(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Widow</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer border border-border p-3 rounded-lg hover:bg-card-secondary transition select-none">
                <input
                  type="checkbox"
                  checked={minority}
                  onChange={(e) => setMinority(e.target.checked)}
                  className="rounded accent-accent-saffron h-4 w-4"
                />
                <span>Minority Group</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-text-muted max-w-sm">
              Note: Result is calculated client-side in real-time. No personal information is compiled.
            </span>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-accent-saffron hover:bg-accent-saffron/90 text-primary-navy font-extrabold text-sm px-8 py-3 rounded-lg shadow-sm transition duration-150 flex items-center space-x-1.5"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Evaluate Schemes</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Results Section */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
            <span className="font-extrabold text-base text-foreground">
              We found <strong className="text-accent-green text-lg">{results.length}</strong> matching schemes for you:
            </span>
            <button
              onClick={handleReset}
              className="text-xs font-extrabold text-accent-blue hover:underline"
            >
              Check Again / Reset
            </button>
          </div>

          {results.length === 0 ? (
            <div className="bg-card border border-border p-12 rounded-xl text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-card-secondary text-gray-400 flex items-center justify-center">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-base text-foreground">No Schemes Matched</h3>
              <p className="text-xs text-text-muted max-w-md mx-auto">
                Based on the specifications provided, you don't directly match any seeded scheme. Try increasing age/income boundaries or browse states.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((res) => (
                <div key={res.scheme.id} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4 hover:border-accent-saffron/30 transition">
                  <div className="flex flex-wrap items-center justify-between text-xs font-bold gap-2">
                    <span className="text-accent-saffron bg-accent-saffron/10 px-2 py-0.5 rounded">
                      {res.scheme.governmentLevel === "CENTRAL" ? "Central Government" : res.scheme.state?.name}
                    </span>
                    <span className="text-text-muted">Fee: {res.scheme.fees}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-primary-navy dark:text-foreground">
                    {res.scheme.name}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {res.scheme.shortDescription}
                  </p>

                  <div className="bg-card-secondary border border-border p-4 rounded-lg space-y-2">
                    <span className="text-xs font-extrabold text-accent-green block uppercase tracking-wider">Why you are eligible:</span>
                    <ul className="space-y-1.5 text-xs text-foreground font-semibold">
                      {res.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="h-4 w-4 text-accent-green flex-shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-end">
                    <Link
                      href={`/schemes/${res.scheme.slug}`}
                      className="bg-primary-navy text-white dark:bg-card dark:text-foreground font-bold text-xs py-2 px-4 rounded-lg hover:bg-primary-navy/95 transition flex items-center space-x-1"
                    >
                      <span>Read How to Apply</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Advisory Note */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-2">
        <div className="flex items-center space-x-2 text-xs font-extrabold text-amber-500">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <span>Important Indicative Disclaimer</span>
        </div>
        <p className="text-xs text-text-muted leading-relaxed text-justify">
          **Eligibility results are purely indicative and generated client-side for informational guidance only.** Actual eligibility is determined exclusively by the respective administrative ministries or verified registrars at the time of official application filing. Always cross-reference scheme guidelines PDFs.
        </p>
      </div>

    </div>
  );
}
