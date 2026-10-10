"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  Edit3,
  FileText,
  Filter,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Stethoscope,
  Upload,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const professionalSkills = [
  "Data entry and validation",
  "Health records management",
  "Excel and data reporting",
  "Database fundamentals",
  "Data confidentiality",
  "Digital information management",
];

const summaryCards = [
  { label: "Total patient registrations", value: "2,483", accent: "bg-sky-100 text-sky-700" },
  { label: "Outpatient visits", value: "1,762", accent: "bg-emerald-100 text-emerald-700" },
  { label: "Inpatient admissions", value: "421", accent: "bg-violet-100 text-violet-700" },
  { label: "Records requiring verification", value: "94", accent: "bg-amber-100 text-amber-700" },
  { label: "Data completeness", value: "96.4%", accent: "bg-teal-100 text-teal-700" },
];

const monthlyRegistrations = [
  { month: "Jan", registrations: 180 },
  { month: "Feb", registrations: 220 },
  { month: "Mar", registrations: 260 },
  { month: "Apr", registrations: 290 },
  { month: "May", registrations: 345 },
  { month: "Jun", registrations: 330 },
  { month: "Jul", registrations: 390 },
  { month: "Aug", registrations: 420 },
];

const serviceCategoryData = [
  { name: "OPD", value: 660 },
  { name: "MCH", value: 540 },
  { name: "Laboratory", value: 470 },
  { name: "Pharmacy", value: 360 },
  { name: "Inpatient", value: 290 },
];

const departmentData = [
  { name: "Outpatient", value: 540 },
  { name: "Emergency", value: 420 },
  { name: "Maternity", value: 310 },
  { name: "Laboratory", value: 290 },
  { name: "Pharmacy", value: 220 },
];

const dashboardRows = [
  { id: 1, patientId: "PAT-0012", date: "2026-01-04", department: "Outpatient", service: "Consultation", visitType: "Outpatient", age: 32, sex: "Female", referral: "Self", verified: "Verified" },
  { id: 2, patientId: "PAT-0028", date: "2026-01-09", department: "Emergency", service: "Triage", visitType: "Emergency", age: 46, sex: "Male", referral: "Referred", verified: "Pending" },
  { id: 3, patientId: "PAT-0045", date: "2026-01-11", department: "Maternity", service: "ANC", visitType: "Follow-up", age: 28, sex: "Female", referral: "Self", verified: "Verified" },
  { id: 4, patientId: "PAT-0051", date: "2026-01-17", department: "Laboratory", service: "Blood test", visitType: "Outpatient", age: 55, sex: "Male", referral: "Referred", verified: "Requires review" },
  { id: 5, patientId: "PAT-0080", date: "2026-01-27", department: "Pharmacy", service: "Prescription refill", visitType: "Follow-up", age: 62, sex: "Female", referral: "Self", verified: "Verified" },
  { id: 6, patientId: "PAT-0109", date: "2026-02-02", department: "Outpatient", service: "Review", visitType: "Follow-up", age: 41, sex: "Other", referral: "Self", verified: "Pending" },
  { id: 7, patientId: "PAT-0134", date: "2026-02-15", department: "Emergency", service: "Observation", visitType: "Inpatient", age: 71, sex: "Male", referral: "Transfer", verified: "Verified" },
  { id: 8, patientId: "PAT-0146", date: "2026-02-21", department: "Maternity", service: "Delivery", visitType: "Inpatient", age: 24, sex: "Female", referral: "Referred", verified: "Verified" },
];

const reportRows = [
  { month: "Jan", department: "Outpatient", visits: 520, lab: 180, inpatients: 95 },
  { month: "Jan", department: "Emergency", visits: 340, lab: 110, inpatients: 68 },
  { month: "Feb", department: "Outpatient", visits: 560, lab: 210, inpatients: 102 },
  { month: "Feb", department: "Emergency", visits: 380, lab: 120, inpatients: 72 },
  { month: "Mar", department: "Outpatient", visits: 610, lab: 230, inpatients: 118 },
  { month: "Mar", department: "Emergency", visits: 420, lab: 135, inpatients: 84 },
];

const qualityExamples = [
  { id: "Q-101", patientId: "PAT-0345", category: "Missing required field", status: "Open", severity: "High", proposedFix: "Add missing registration date and department name" },
  { id: "Q-102", patientId: "PAT-0109", category: "Duplicate identifier", status: "Open", severity: "High", proposedFix: "Merge duplicate record with latest verified entry" },
  { id: "Q-103", patientId: "PAT-0418", category: "Invalid date", status: "Resolved", severity: "Moderate", proposedFix: "Reformat to ISO date and verify against source register" },
  { id: "Q-104", patientId: "PAT-0237", category: "Inconsistent department name", status: "Open", severity: "Moderate", proposedFix: "Standardize to 'Laboratory'" },
  { id: "Q-105", patientId: "PAT-0191", category: "Invalid age", status: "Open", severity: "High", proposedFix: "Replace 185 with valid age from birth date or source form" },
  { id: "Q-106", patientId: "PAT-0263", category: "Incomplete record", status: "Open", severity: "Moderate", proposedFix: "Capture missing referral status and verification field" },
];

const projectCards = [
  {
    title: "Hospital Patient Registration Demo",
    summary: "A synthetic patient registration workflow designed to show how a Data Clerk verifies required fields and prevents duplicate identifiers.",
    tags: ["Registration workflow", "Validation", "Demo record search"],
  },
  {
    title: "Health Data Quality Checker",
    summary: "A quality lab that flags missing entries, duplicate identifiers, invalid dates, and inconsistent department names before review.",
    tags: ["Data quality", "Error review", "CSV export"],
  },
  {
    title: "Monthly Hospital Reporting Dashboard",
    summary: "A hospital activity dashboard comparing service categories, department volumes, and monthly reporting patterns using demo data.",
    tags: ["Dashboard", "Charts", "Reporting"],
  },
  {
    title: "HMIS Reporting Workflow",
    summary: "A demonstration of routine reporting steps from source documents to completeness checks, aggregation, and authorised submission.",
    tags: ["HMIS", "Completeness", "Submission workflow"],
  },
];

const timelineEducation = [
  { period: "September 2023 – August 2026", title: "Bachelor of Science in Information Technology", subtitle: "Mount Kenya University" },
  { period: "7 January 2026 – 6 April 2026", title: "Intern, Moi Referral Hospital", subtitle: "Practical hospital data and record support experience" },
];

type PatientFormValues = {
  patientId: string;
  registrationDate: string;
  age: number;
  sex: string;
  department: string;
  visitType: string;
  referralStatus: string;
  verificationStatus: string;
};

const patientSchema: z.ZodType<PatientFormValues> = z.object({
  patientId: z.string().min(3, "Demo patient identifier is required."),
  registrationDate: z.string().min(1, "Registration date is required."),
  age: z.coerce.number().min(0, "Age must be 0 or higher.").max(120, "Age must be realistic."),
  sex: z.string().min(1, "Select a sex value."),
  department: z.string().min(1, "Department is required."),
  visitType: z.string().min(1, "Select visit type."),
  referralStatus: z.string().min(1, "Select referral status."),
  verificationStatus: z.string().min(1, "Select verification status."),
});

const skillConcern = [
  { label: "Attention to detail", value: "Strong record review and consistency checks" },
  { label: "Confidentiality", value: "Respect for minimum necessary access and privacy" },
  { label: "Reporting", value: "Monthly summary and routine data preparation" },
  { label: "Digital workflow", value: "Excel, records, database concepts, and reporting" },
];

function downloadCsv(filename: string, rows: string[]) {
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function Home() {
  const [dashboardRecords, setDashboardRecords] = useState(dashboardRows);
  const [selectedDepartment, setSelectedDepartment] = useState("All departments");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-03-31");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "date", direction: "asc" });
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formSuccess, setFormSuccess] = useState("");
  const [qualityFilter, setQualityFilter] = useState("All");
  const [qualityRun, setQualityRun] = useState(false);
  const [qualityRecords, setQualityRecords] = useState(qualityExamples);
  const [pendingCorrection, setPendingCorrection] = useState<{ id: string; proposedFix: string; category: string } | null>(null);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema as never) as never,
    defaultValues: {
      patientId: "",
      registrationDate: "",
      age: 0,
      sex: "Female",
      department: "Outpatient",
      visitType: "Outpatient",
      referralStatus: "Self",
      verificationStatus: "Pending",
    },
  });

  const departmentOptions = ["All departments", "Outpatient", "Emergency", "Maternity", "Laboratory", "Pharmacy"];

  const filteredDashboardRows = useMemo(() => {
    const normalized = searchTerm.toLowerCase();
    return [...dashboardRecords]
      .filter((entry) => {
        const matchesDepartment = selectedDepartment === "All departments" || entry.department === selectedDepartment;
        const matchesDate = entry.date >= fromDate && entry.date <= toDate;
        const matchesSearch =
          !normalized ||
          entry.patientId.toLowerCase().includes(normalized) ||
          entry.department.toLowerCase().includes(normalized) ||
          entry.service.toLowerCase().includes(normalized);
        return matchesDepartment && matchesDate && matchesSearch;
      })
      .sort((a, b) => {
        const dir = sortConfig.direction === "asc" ? 1 : -1;
        const left = a[sortConfig.key as keyof typeof a];
        const right = b[sortConfig.key as keyof typeof b];
        return typeof left === "string" ? String(left).localeCompare(String(right)) * dir : ((Number(left) || 0) - (Number(right) || 0)) * dir;
      });
  }, [dashboardRecords, fromDate, searchTerm, selectedDepartment, sortConfig, toDate]);

  const totalPageCount = Math.max(1, Math.ceil(filteredDashboardRows.length / 5));
  const visibleRows = filteredDashboardRows.slice((page - 1) * 5, page * 5);

  const qualitySummary = useMemo(() => {
    if (!qualityRun) {
      return { total: qualityRecords.length, errors: 0, score: 100, categories: [] };
    }

    const categoryCounts: Record<string, number> = {};
    qualityRecords.forEach((item) => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    const errorCount = Object.values(categoryCounts).reduce((sum, value) => sum + value, 0);
    const score = Math.max(0, 100 - errorCount * 6);

    return {
      total: qualityRecords.length,
      errors: errorCount,
      score,
      categories: Object.entries(categoryCounts).map(([name, count]) => ({ name, count })),
    };
  }, [qualityRun, qualityRecords]);

  const filteredQualityRows = useMemo(() => {
    if (qualityFilter === "All") return qualityRecords;
    return qualityRecords.filter((item) => item.category === qualityFilter);
  }, [qualityFilter, qualityRecords]);

  const handleSubmitRecord = (values: PatientFormValues) => {
    const normalizedId = values.patientId.trim();
    const duplicate = dashboardRecords.find((entry) => entry.patientId.toLowerCase() === normalizedId.toLowerCase() && entry.id !== editingId);

    if (duplicate) {
      form.setError("patientId", { type: "manual", message: "Duplicate demo identifier detected. Please choose a unique patient ID." });
      return;
    }

    const entry = {
      id: editingId ?? Math.max(0, ...dashboardRecords.map((row) => row.id)) + 1,
      patientId: normalizedId,
      date: values.registrationDate,
      department: values.department,
      service: values.department,
      visitType: values.visitType,
      age: Number(values.age),
      sex: values.sex,
      referral: values.referralStatus,
      verified: values.verificationStatus,
    };

    if (editingId) {
      setDashboardRecords((current) => current.map((row) => (row.id === editingId ? entry : row)));
      setFormSuccess("Demo record updated successfully.");
    } else {
      setDashboardRecords((current) => [entry, ...current]);
      setFormSuccess("Demo record registered successfully. Synthetic data stored for review.");
    }

    setEditingId(null);
    form.reset();
  };

  const handleEdit = (entry: (typeof dashboardRows)[number]) => {
    setEditingId(entry.id);
    form.reset({
      patientId: entry.patientId,
      registrationDate: entry.date,
      age: entry.age,
      sex: entry.sex,
      department: entry.department,
      visitType: entry.visitType,
      referralStatus: entry.referral,
      verificationStatus: entry.verified,
    });
    setFormSuccess("Editing selected demo record. Update and save when ready.");
  };

  const resetDemoData = () => {
    setDashboardRecords(dashboardRows);
    form.reset();
    setEditingId(null);
    setFormSuccess("Demo data has been reset to the original synthetic dataset.");
  };

  const exportDashboard = () => {
    const csvHeader = ["patientId", "date", "department", "service", "visitType", "age", "sex", "referral", "verified"];
    const csvRows = filteredDashboardRows.map((entry) => [
      entry.patientId,
      entry.date,
      entry.department,
      entry.service,
      entry.visitType,
      entry.age,
      entry.sex,
      entry.referral,
      entry.verified,
    ].join(","));
    downloadCsv("hospital-demo-data.csv", [csvHeader.join(","), ...csvRows]);
  };

  const validateData = () => {
    setQualityRun(true);
  };

  const openCorrection = (issue: { id: string; category: string; proposedFix: string }) => {
    setPendingCorrection(issue);
  };

  const applyCorrection = () => {
    if (!pendingCorrection) return;

    setQualityRecords((current) =>
      current.map((item) =>
        item.id === pendingCorrection.id
          ? { ...item, status: "Resolved", category: pendingCorrection.category }
          : item,
      ),
    );
    setPendingCorrection(null);
  };

  const qualityCsv = () => {
    const header = ["id", "patientId", "category", "status", "severity", "proposedFix"];
    const rows = qualityRecords.map((item) => [item.id, item.patientId, item.category, item.status, item.severity, item.proposedFix].join(","));
    downloadCsv("hospital-data-quality-report.csv", [header.join(","), ...rows]);
  };

  const contactSummary = [
    { icon: Mail, label: "Email", value: "ruoplual@gmail.com" },
    { icon: Phone, label: "Phone", value: "+254 115 448 177" },
    { icon: MapPin, label: "Location", value: "South Sudan / Kenya" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Joseph Bigoah Puok Ruop</p>
            <p className="text-sm text-slate-600">Data Clerk | Health Information Management</p>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#about" className="hover:text-teal-700">About</a>
            <a href="#dashboard" className="hover:text-teal-700">Dashboard</a>
            <a href="#quality" className="hover:text-teal-700">Data quality</a>
            <a href="#experience" className="hover:text-teal-700">Experience</a>
            <a href="#contact" className="hover:text-teal-700">Contact</a>
          </nav>
          <a href="#contact" className="rounded-full bg-sky-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800">Contact me</a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              <Stethoscope className="h-3.5 w-3.5" />
              Health information management portfolio
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Accurate Health Data. Reliable Reporting. Better Healthcare Decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              I am an Information Technology graduate focused on accurate data entry, health information management, data quality, digital recordkeeping, and reporting to support efficient healthcare delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#dashboard" className="inline-flex items-center gap-2 rounded-full bg-sky-900 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-800">
                View my portfolio <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/Joseph-Bigoah-Puok-Ruop-CV.pdf" download className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                <Download className="h-4 w-4" /> Download CV
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                <Mail className="h-4 w-4" /> Contact me
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {professionalSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_50px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Professional profile</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Joseph Bigoah Puok Ruop</h2>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-700 to-teal-500 text-xl font-bold text-white">
                JBR
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Professional title</p>
                <p>Data Clerk | Health Information Management | Information Technology</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Career objective</p>
                <p>To contribute to reliable hospital data management, accurate reporting, digital recordkeeping, and improved health information systems.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Education</p>
                  <p className="mt-2 font-medium text-slate-800">BSc Information Technology</p>
                  <p className="text-slate-600">Mount Kenya University</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Experience</p>
                  <p className="mt-2 font-medium text-slate-800">Intern</p>
                  <p className="text-slate-600">Moi Referral Hospital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-sky-100 p-2 text-sky-700"><Building2 className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">About me</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">
              I am a graduate in Information Technology with a strong interest in healthcare information systems, data quality, and accurate digital recordkeeping. My academic training has strengthened my ability to work carefully with data, maintain organised records, and support reliable reporting for health services and public health programmes.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              I understand that good hospital data supports decisions, accountability, patient safety, and efficient service delivery. I am committed to confidentiality, accuracy, and maintaining consistent records that can be trusted for reporting and operational planning.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {skillConcern.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-sky-950 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Career focus</p>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 text-teal-300" /><span>Support accurate hospital and health programme entry, validation, and reconciliation.</span></li>
              <li className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 text-teal-300" /><span>Maintain confidentiality, complete records, and consistent filing in line with operational standards.</span></li>
              <li className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 text-teal-300" /><span>Prepare summaries, departmental reports, and routine health information submissions.</span></li>
              <li className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 text-teal-300" /><span>Assist with digital tools that improve recordkeeping and reporting quality.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-teal-100 p-2 text-teal-700"><BarChart3 className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Interactive hospital data management dashboard</h2>
        </div>
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Demonstration data only. These figures are synthetic and should not be interpreted as actual hospital statistics.
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${card.accent}`}>{card.label}</div>
              <p className="mt-4 text-3xl font-bold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-slate-900">Registrations over time</h3>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">Synthetic monthly trend</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="registrations" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Service categories</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Records by department</h3>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">Demo allocation</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={88} paddingAngle={3}>
                    {departmentData.map((entry, index) => (
                      <Cell key={entry.name} fill={['#0ea5e9', '#14b8a6', '#f59e0b', '#8b5cf6', '#22c55e'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Filter demo data</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Department
                <select value={selectedDepartment} onChange={(e) => { setSelectedDepartment(e.target.value); setPage(1); }} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  {departmentOptions.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                From date
                <input type="date" value={fromDate} onChange={(e) => { setFromDate(e.target.value); setPage(1); }} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                To date
                <input type="date" value={toDate} onChange={(e) => { setToDate(e.target.value); setPage(1); }} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" />
              </label>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2"><Filter className="h-4 w-4" /> Matching records</span>
                <span className="font-bold">{filteredDashboardRows.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Synthetic patient records</h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} placeholder="Search by patient ID or department" className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2 text-sm focus:border-teal-500 focus:outline-none sm:w-64" />
              </div>
              <button onClick={exportDashboard} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
                <Download className="h-4 w-4" /> Export as CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  {['patientId','date','department','service','visitType','age','sex','referral','verified'].map((header) => (
                    <th key={header} className="px-3 py-3 font-semibold">
                      <button className="flex items-center gap-1" onClick={() => setSortConfig({ key: header, direction: sortConfig.key === header && sortConfig.direction === "asc" ? "desc" : "asc" })}>
                        {header}
                      </button>
                    </th>
                  ))}
                  <th className="px-3 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((entry) => (
                  <tr key={entry.id} className="border-b border-slate-200">
                    <td className="px-3 py-3 font-medium text-slate-900">{entry.patientId}</td>
                    <td className="px-3 py-3">{entry.date}</td>
                    <td className="px-3 py-3">{entry.department}</td>
                    <td className="px-3 py-3">{entry.service}</td>
                    <td className="px-3 py-3">{entry.visitType}</td>
                    <td className="px-3 py-3">{entry.age}</td>
                    <td className="px-3 py-3">{entry.sex}</td>
                    <td className="px-3 py-3">{entry.referral}</td>
                    <td className="px-3 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{entry.verified}</span></td>
                    <td className="px-3 py-3"><button onClick={() => handleEdit(entry)} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"><Edit3 className="h-3.5 w-3.5" /> Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-slate-600">Page {page} of {totalPageCount}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage((cur) => Math.max(1, cur - 1))} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">Previous</button>
              <button onClick={() => setPage((cur) => Math.min(totalPageCount, cur + 1))} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700"><ClipboardCheck className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Patient registration demonstration</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={form.handleSubmit(handleSubmitRecord as never)} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Demo patient identifier
                <input {...form.register("patientId")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" placeholder="PAT-0155" />
                {form.formState.errors.patientId && <span className="mt-1 block text-xs text-red-600">{form.formState.errors.patientId.message}</span>}
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Registration date
                <input type="date" {...form.register("registrationDate")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" />
                {form.formState.errors.registrationDate && <span className="mt-1 block text-xs text-red-600">{form.formState.errors.registrationDate.message}</span>}
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Age
                <input type="number" {...form.register("age")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" placeholder="29" />
                {form.formState.errors.age && <span className="mt-1 block text-xs text-red-600">{form.formState.errors.age.message}</span>}
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Sex
                <select {...form.register("sex")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Department or service
                <input {...form.register("department")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" placeholder="Outpatient" />
                {form.formState.errors.department && <span className="mt-1 block text-xs text-red-600">{form.formState.errors.department.message}</span>}
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Visit type
                <select {...form.register("visitType")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  <option value="Outpatient">Outpatient</option>
                  <option value="Inpatient">Inpatient</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Referral status
                <select {...form.register("referralStatus")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  <option value="Self">Self</option>
                  <option value="Referred">Referred</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Record verification status
                <select {...form.register("verificationStatus")} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Requires review">Requires review</option>
                </select>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-sky-900 px-4 py-2.5 font-semibold text-white hover:bg-sky-800">
                <Upload className="h-4 w-4" /> {editingId ? "Update record" : "Register record"}
              </button>
              <button type="button" onClick={resetDemoData} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Reset demo data</button>
            </div>

            {formSuccess && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{formSuccess}</p>}
          </form>

          <div className="rounded-3xl border border-slate-200 bg-sky-950 p-5 text-white shadow-sm">
            <h3 className="text-xl font-semibold">Registration workflow</h3>
            <ol className="mt-5 space-y-4 text-sm text-sky-100">
              <li className="rounded-2xl bg-white/5 p-3"><span className="font-semibold text-white">1.</span> Capture a fictional patient identifier and registration date.</li>
              <li className="rounded-2xl bg-white/5 p-3"><span className="font-semibold text-white">2.</span> Review age, sex, service area, and referral details for completeness.</li>
              <li className="rounded-2xl bg-white/5 p-3"><span className="font-semibold text-white">3.</span> Check whether the identifier is a duplicate before recording the visit.</li>
              <li className="rounded-2xl bg-white/5 p-3"><span className="font-semibold text-white">4.</span> Mark the record as verified or in need of review for reporting.</li>
            </ol>
            <p className="mt-6 text-sm text-sky-100">This demonstration does not connect to a live hospital information system or process real patient data.</p>
          </div>
        </div>
      </section>

      <section id="quality" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-2 text-amber-700"><AlertTriangle className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Data quality and validation laboratory</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Total records reviewed</p><p className="mt-2 text-3xl font-bold text-slate-900">{qualitySummary.total}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Detected errors</p><p className="mt-2 text-3xl font-bold text-slate-900">{qualitySummary.errors}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Data quality score</p><p className="mt-2 text-3xl font-bold text-slate-900">{qualitySummary.score || 100}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Error categories</p><p className="mt-2 text-3xl font-bold text-slate-900">{qualitySummary.categories.length || 0}</p></div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Quality validation review</h3>
              <p className="mt-1 text-sm text-slate-600">A quality check helps identify missing, duplicate, and inconsistent data before reports are approved.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={validateData} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">Run validation</button>
              <button onClick={qualityCsv} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Download report</button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Filter by error type
                <select value={qualityFilter} onChange={(e) => setQualityFilter(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  <option value="All">All</option>
                  <option value="Missing required field">Missing required field</option>
                  <option value="Duplicate identifier">Duplicate identifier</option>
                  <option value="Invalid date">Invalid date</option>
                  <option value="Inconsistent department name">Inconsistent department name</option>
                  <option value="Invalid age">Invalid age</option>
                  <option value="Incomplete record">Incomplete record</option>
                </select>
              </label>

              {qualitySummary.categories.length > 0 && (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">Error categories</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {qualitySummary.categories.map((item) => (
                      <li key={item.name} className="flex items-center justify-between"><span>{item.name}</span><span className="font-semibold text-slate-900">{item.count}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900">
                <p className="font-semibold">Why this matters</p>
                <p className="mt-2 leading-6">Accurate, complete, consistent, and timely data matter because hospital reporting, funding requests, service planning, patient follow-up, and quality monitoring all depend on trustworthy records.</p>
              </div>
            </div>

            <div className="space-y-4">
              {filteredQualityRows.map((issue) => (
                <div key={issue.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{issue.id}</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">{issue.patientId}</p>
                    </div>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">{issue.severity}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-slate-700">{issue.category}</span>
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-slate-700">{issue.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">Proposed correction: <span className="font-medium text-slate-900">{issue.proposedFix}</span></p>
                  <button onClick={() => openCorrection(issue)} className="mt-4 rounded-lg bg-sky-900 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800">Review and apply correction</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {pendingCorrection && (
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-lg font-semibold text-amber-900">Confirm proposed correction</p>
            <p className="mt-2 text-sm text-amber-900">The record will not be silently modified. Review this correction before applying it to the synthetic dataset.</p>
            <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700">
              <p><span className="font-semibold">Issue type:</span> {pendingCorrection.category}</p>
              <p className="mt-2"><span className="font-semibold">Suggested fix:</span> {pendingCorrection.proposedFix}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={applyCorrection} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">Apply correction</button>
              <button onClick={() => setPendingCorrection(null)} className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100">Cancel</button>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-sky-100 p-2 text-sky-700"><FileText className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Excel and reporting portfolio</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Sample spreadsheet tasks</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>• Data cleaning and standardisation of department names.</li>
              <li>• Removing duplicate identifiers before monthly summary preparation.</li>
              <li>• Identifying missing values and validating date formats.</li>
              <li>• Sorting and filtering for service-level reporting by month.</li>
              <li>• Calculating totals, percentages, and monthly activity summaries.</li>
              <li>• Pivot-table-style review of service activity across departments.</li>
            </ul>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Example formulas</p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs">=COUNTIF(A:A,&quot;Outpatient&quot;)
=COUNTIFS(C:C,&quot;Maternity&quot;,D:D,&quot;Follow-up&quot;)
=SUM(E:E)
=IF(F2&gt;0, G2/F2, 0)
=ROUND((H2/I2)*100,2)</pre>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Monthly hospital activity report</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-3 py-3">Month</th>
                    <th className="px-3 py-3">Outpatient</th>
                    <th className="px-3 py-3">Emergency</th>
                    <th className="px-3 py-3">Inpatient</th>
                    <th className="px-3 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportRows.slice(0, 3).map((row) => (
                    <tr key={`${row.month}-${row.department}`} className="border-b border-slate-200">
                      <td className="px-3 py-3 font-medium text-slate-900">{row.month}</td>
                      <td className="px-3 py-3">{row.visits}</td>
                      <td className="px-3 py-3">{row.lab}</td>
                      <td className="px-3 py-3">{row.inpatients}</td>
                      <td className="px-3 py-3">{row.visits + row.lab + row.inpatients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-violet-100 p-2 text-violet-700"><Activity className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">HMIS and DHIS2 reporting demonstration</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Typical reporting workflow</h3>
            <ol className="mt-5 space-y-4 text-sm text-slate-700">
              <li><span className="font-semibold text-slate-900">1.</span> Collect data from approved source documents and facility registers.</li>
              <li><span className="font-semibold text-slate-900">2.</span> Check completeness, consistency, and proper data capture.</li>
              <li><span className="font-semibold text-slate-900">3.</span> Validate and reconcile discrepancies before reporting.</li>
              <li><span className="font-semibold text-slate-900">4.</span> Aggregate by reporting period and service area.</li>
              <li><span className="font-semibold text-slate-900">5.</span> Prepare routine reports and review them before submission.</li>
              <li><span className="font-semibold text-slate-900">6.</span> Maintain confidentiality and an audit trail for reporting records.</li>
            </ol>
            <p className="mt-5 text-sm text-slate-600">This is a clearly labelled DHIS2-style demonstration only. It does not imply an official DHIS2 deployment or real data integration.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Monthly indicator summary</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-3 py-3">Indicator</th>
                    <th className="px-3 py-3">Period</th>
                    <th className="px-3 py-3">Value</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Outpatient visits", "2026-Jan", "520", "Submitted"],
                    ["Inpatient admissions", "2026-Jan", "118", "Reviewed"],
                    ["Antenatal visits", "2026-Jan", "220", "Complete"],
                    ["Delivery cases", "2026-Jan", "76", "Pending verification"],
                  ].map(([indicator, period, value, status]) => (
                    <tr key={indicator} className="border-b border-slate-200">
                      <td className="px-3 py-3">{indicator}</td>
                      <td className="px-3 py-3">{period}</td>
                      <td className="px-3 py-3 font-medium text-slate-900">{value}</td>
                      <td className="px-3 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700"><Database className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Database and records management</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Relational database concept</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Patient registry</p>
                <p className="mt-2 text-sm text-slate-600">patient_id (PK), age, sex, registration_date</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Visits</p>
                <p className="mt-2 text-sm text-slate-600">visit_id (PK), patient_id (FK), department_id (FK), visit_type</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Departments</p>
                <p className="mt-2 text-sm text-slate-600">department_id (PK), department_name</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Reporting periods</p>
                <p className="mt-2 text-sm text-slate-600">period_id (PK), month, year, submitted_by</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-100">
              <p className="font-semibold text-white">Example SQL</p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs">SELECT department, COUNT(*) AS visits
FROM visits
GROUP BY department;

SELECT patient_id, COUNT(*)
FROM visits
GROUP BY patient_id
HAVING COUNT(*) &gt; 1;

SELECT * FROM patient_registry
WHERE age IS NULL OR registration_date IS NULL;</pre>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-sky-950 p-5 text-white shadow-sm">
            <h3 className="text-xl font-semibold">Records management principles</h3>
            <ul className="mt-5 space-y-4 text-sm text-sky-100">
              <li className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 text-teal-300" /><span>Use unique identifiers to avoid confusion and duplicate records.</span></li>
              <li className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 text-teal-300" /><span>Store information in a standard, readable format to support reporting and analysis.</span></li>
              <li className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 text-teal-300" /><span>Check for incomplete records before monthly aggregation and submissions.</span></li>
              <li className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 text-teal-300" /><span>Keep an audit trail and authorised access controls for sensitive information.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-2 text-red-700"><ShieldCheck className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Confidentiality, security, and backup procedures</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Responsible data handling</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li>• Minimum necessary access and role-based access control concepts.</li>
              <li>• Strong passwords and multi-factor authentication before system access.</li>
              <li>• Secure storage, authorised sharing, and safe handling of printed records.</li>
              <li>• Backup and recovery procedures to reduce data loss risk.</li>
              <li>• Incident reporting and escalation when problems are identified.</li>
              <li>• Accountability and audit trails that support review and trust.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Backup and recovery workflow</h3>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700"><span>1. Collect source data</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700"><span>2. Validate and secure files</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700"><span>3. Copy to backup storage</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm text-slate-700"><span>4. Restore in an authorised test or controlled environment</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
            </div>
            <p className="mt-4 text-sm text-slate-600">The portfolio demonstrations do not process real patient data and should never be treated as a certified medical records system.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-100 p-2 text-indigo-700"><HeartPulse className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Professional projects</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projectCards.map((project) => (
            <div key={project.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Portfolio prototype</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-slate-200 p-2 text-slate-700"><ClipboardCheck className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Experience and education</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Education timeline</h3>
            {timelineEducation.map((item) => (
              <div key={item.title} className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.period}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Editable placeholders</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li>• Internship responsibilities: [Add the actual duties you performed at Moi Referral Hospital.]</li>
              <li>• Systems used: [List any records, spreadsheet, or digital tools you actually used.]</li>
              <li>• Tasks performed: [Describe the data entry, filing, sorting, or summary work you completed.]</li>
              <li>• Practical achievements: [Add any real improvements or learning outcomes you can verify.]</li>
              <li>• Supervisor or reference details: [Complete only if authorised and appropriate.]</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-2 text-blue-700"><FileText className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">CV and application resources</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Professional summary</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">I am a motivated Information Technology graduate with a focus on healthcare data management, accurate recordkeeping, reporting, and digital information systems. I am interested in supporting hospitals, clinics, and health programmes with dependable data quality, confidentiality, and consistent reporting.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/Joseph-Bigoah-Puok-Ruop-CV.pdf" download className="inline-flex items-center gap-2 rounded-xl bg-sky-900 px-4 py-2.5 font-semibold text-white hover:bg-sky-800"><Download className="h-4 w-4" /> Download sample CV</a>
              <button onClick={() => downloadCsv("portfolio-project-report.csv", ["project","summary","status","notes", "Hospital Patient Registration Demo,Registration workflow for synthetic records,Ready for review,Portfolio prototype"])} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"><Download className="h-4 w-4" /> Download project report</button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Core skills</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {professionalSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{skill}</span>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Application note</p>
              <p className="mt-2">If a real CV PDF is not supplied, this template can be reviewed and completed by the applicant before being shared with employers.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-teal-100 p-2 text-teal-700"><Mail className="h-5 w-5" /></div>
          <h2 className="text-3xl font-bold text-slate-900">Contact and job application</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-sky-950 p-5 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-200">Recruitment contact</p>
            <p className="mt-4 text-lg leading-7 text-sky-50">I am interested in Data Clerk and health information management opportunities across hospitals, clinics, NGOs, and public health programmes.</p>
            <div className="mt-6 space-y-4">
              {contactSummary.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                  <Icon className="h-5 w-5 text-teal-300" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-sky-200">{label}</p>
                    <p className="mt-1 font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:ruoplual@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-sky-400 bg-white/5 px-4 py-2.5 font-semibold text-white hover:bg-white/10">Email me</a>
              <a href="tel:+254115448177" className="inline-flex items-center gap-2 rounded-xl border border-sky-400 bg-white/5 px-4 py-2.5 font-semibold text-white hover:bg-white/10">Call now</a>
            </div>
          </div>

          <form className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Full name
                <input className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" placeholder="Your name" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Email address
                <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" placeholder="name@example.com" />
              </label>
              <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                Target role or organisation
                <select className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none">
                  <option>Tambura Hospital</option>
                  <option>Ezo Hospital</option>
                  <option>Maridi Hospital</option>
                  <option>Other hospital or organisation</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                Message
                <textarea rows={5} className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus:border-teal-500 focus:outline-none" placeholder="I would like to discuss data clerk and health information management opportunities." />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className="rounded-xl bg-sky-900 px-4 py-2.5 font-semibold text-white hover:bg-sky-800">Send enquiry</button>
              <a href="mailto:ruoplual@gmail.com?subject=Request%20for%20CV" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Request CV</a>
            </div>
            <p className="mt-4 text-sm text-slate-600">This contact form is presented as a front-end demo. If server-side delivery is later configured, the form can be connected securely to an email or application backend.</p>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Joseph Bigoah Puok Ruop | Hospital Data Clerk Portfolio</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:ruoplual@gmail.com" className="hover:text-sky-700">ruoplual@gmail.com</a>
            <a href="tel:+254115448177" className="hover:text-sky-700">+254 115 448 177</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
