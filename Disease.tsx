import React from "react";
import { 
  Activity, 
  AlertTriangle, 
  Brain, 
  Heart, 
  Dna, 
  Microscope,
  Search,
  Filter,
  ChevronDown,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  Info,
  ArrowRight,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Constants
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

// Enhanced mock data for disease categories
const diseaseCategories = [
  {
    id: "1",
    name: "Cardiovascular Diseases",
    count: 156,
    genes: ["BRCA1", "TP53", "APOE"],
    confidence: 0.89,
    severity: "High",
    color: "from-red-500 to-red-600",
    description: "Diseases affecting the heart and blood vessels",
    prevalence: "31.5%",
    mortality: "17.9M/year",
    riskFactors: ["Hypertension", "High Cholesterol", "Smoking"],
    treatments: ["Statins", "Beta-blockers", "ACE inhibitors"]
  },
  {
    id: "2",
    name: "Neurological Disorders",
    count: 243,
    genes: ["SNCA", "HTT", "APP"],
    confidence: 0.92,
    severity: "High",
    color: "from-blue-500 to-blue-600",
    description: "Disorders affecting the nervous system",
    prevalence: "15.2%",
    mortality: "9.0M/year",
    riskFactors: ["Age", "Genetics", "Environmental factors"],
    treatments: ["Antidepressants", "Antipsychotics", "Cognitive therapy"]
  },
  {
    id: "3",
    name: "Metabolic Disorders",
    count: 187,
    genes: ["CFTR", "HFE", "G6PD"],
    confidence: 0.85,
    severity: "Medium",
    color: "from-green-500 to-green-600",
    description: "Disorders affecting metabolism",
    prevalence: "12.8%",
    mortality: "4.2M/year",
    riskFactors: ["Obesity", "Poor diet", "Physical inactivity"],
    treatments: ["Insulin therapy", "Diet modification", "Exercise"]
  },
  {
    id: "4",
    name: "Autoimmune Diseases",
    count: 134,
    genes: ["HLA-DRB1", "PTPN22", "CTLA4"],
    confidence: 0.88,
    severity: "High",
    color: "from-purple-500 to-purple-600",
    description: "Diseases where the immune system attacks the body",
    prevalence: "7.6%",
    mortality: "2.8M/year",
    riskFactors: ["Genetics", "Environmental triggers", "Hormones"],
    treatments: ["Immunosuppressants", "Anti-inflammatory drugs", "Biologics"]
  }
];

// Enhanced mock data for datasets
const datasets = [
  {
    id: "1",
    name: "Human Disease Network",
    description: "Comprehensive network of human diseases and associated genes",
    size: "2.3GB",
    lastUpdated: "2024-02-15",
    confidence: 0.95,
    diseases: 1250,
    genes: 4500,
    coverage: "98%",
    quality: "High",
    sources: ["PubMed", "OMIM", "ClinVar"],
    lastValidation: "2024-02-10"
  },
  {
    id: "2",
    name: "Disease-Gene Associations",
    description: "Curated database of disease-gene relationships",
    size: "1.8GB",
    lastUpdated: "2024-02-10",
    confidence: 0.92,
    diseases: 980,
    genes: 3200,
    coverage: "95%",
    quality: "High",
    sources: ["GWAS Catalog", "DisGeNET", "Orphanet"],
    lastValidation: "2024-02-05"
  },
  {
    id: "3",
    name: "Clinical Variants Database",
    description: "Collection of clinically relevant genetic variants",
    size: "3.1GB",
    lastUpdated: "2024-02-18",
    confidence: 0.89,
    diseases: 1500,
    genes: 5200,
    coverage: "92%",
    quality: "Medium",
    sources: ["ClinVar", "HGMD", "COSMIC"],
    lastValidation: "2024-02-15"
  },
  {
    id: "4",
    name: "Disease Pathways",
    description: "Integrated pathways and molecular interactions",
    size: "2.7GB",
    lastUpdated: "2024-02-12",
    confidence: 0.91,
    diseases: 1100,
    genes: 3800,
    coverage: "94%",
    quality: "High",
    sources: ["KEGG", "Reactome", "WikiPathways"],
    lastValidation: "2024-02-08"
  }
];

// Add dataset-specific visualization data
const datasetVisualizations = {
  "1": { // Human Disease Network
    diseaseDistribution: [
      { category: "Cardiovascular", count: 180, percentage: 32, trend: "+2.5%" },
      { category: "Neurological", count: 150, percentage: 27, trend: "+1.8%" },
      { category: "Metabolic", count: 120, percentage: 21, trend: "+3.2%" },
      { category: "Genetic", count: 110, percentage: 20, trend: "+1.2%" }
    ],
    diseaseTrends: [
      { year: "2020", cardiovascular: 150, neurological: 120, metabolic: 90, genetic: 80 },
      { year: "2021", cardiovascular: 155, neurological: 125, metabolic: 95, genetic: 85 },
      { year: "2022", cardiovascular: 160, neurological: 130, metabolic: 100, genetic: 90 },
      { year: "2023", cardiovascular: 165, neurological: 135, metabolic: 105, genetic: 95 },
      { year: "2024", cardiovascular: 170, neurological: 140, metabolic: 110, genetic: 100 }
    ],
    geneExpression: [
      { timePoint: "T1", expression: 1.2, confidence: 0.96 },
      { timePoint: "T2", expression: 2.8, confidence: 0.94 },
      { timePoint: "T3", expression: 3.5, confidence: 0.92 },
      { timePoint: "T4", expression: 3.0, confidence: 0.93 },
      { timePoint: "T5", expression: 1.8, confidence: 0.95 }
    ]
  },
  "2": { // Disease-Gene Associations
    diseaseDistribution: [
      { category: "Neurological", count: 200, percentage: 35, trend: "+3.1%" },
      { category: "Autoimmune", count: 150, percentage: 26, trend: "+2.2%" },
      { category: "Metabolic", count: 120, percentage: 21, trend: "+1.9%" },
      { category: "Other", count: 100, percentage: 18, trend: "+0.8%" }
    ],
    diseaseTrends: [
      { year: "2020", neurological: 180, autoimmune: 130, metabolic: 100, other: 80 },
      { year: "2021", neurological: 185, autoimmune: 135, metabolic: 105, other: 85 },
      { year: "2022", neurological: 190, autoimmune: 140, metabolic: 110, other: 90 },
      { year: "2023", neurological: 195, autoimmune: 145, metabolic: 115, other: 95 },
      { year: "2024", neurological: 200, autoimmune: 150, metabolic: 120, other: 100 }
    ],
    geneExpression: [
      { timePoint: "T1", expression: 1.5, confidence: 0.94 },
      { timePoint: "T2", expression: 3.0, confidence: 0.92 },
      { timePoint: "T3", expression: 3.8, confidence: 0.90 },
      { timePoint: "T4", expression: 3.2, confidence: 0.91 },
      { timePoint: "T5", expression: 2.0, confidence: 0.93 }
    ]
  },
  "3": { // Clinical Variants Database
    diseaseDistribution: [
      { category: "Cancer", count: 250, percentage: 40, trend: "+2.8%" },
      { category: "Cardiovascular", count: 150, percentage: 24, trend: "+1.5%" },
      { category: "Neurological", count: 120, percentage: 19, trend: "+1.2%" },
      { category: "Other", count: 100, percentage: 17, trend: "+0.9%" }
    ],
    diseaseTrends: [
      { year: "2020", cancer: 220, cardiovascular: 130, neurological: 100, other: 80 },
      { year: "2021", cancer: 225, cardiovascular: 135, neurological: 105, other: 85 },
      { year: "2022", cancer: 230, cardiovascular: 140, neurological: 110, other: 90 },
      { year: "2023", cancer: 235, cardiovascular: 145, neurological: 115, other: 95 },
      { year: "2024", cancer: 240, cardiovascular: 150, neurological: 120, other: 100 }
    ],
    geneExpression: [
      { timePoint: "T1", expression: 1.8, confidence: 0.93 },
      { timePoint: "T2", expression: 3.5, confidence: 0.91 },
      { timePoint: "T3", expression: 4.2, confidence: 0.89 },
      { timePoint: "T4", expression: 3.5, confidence: 0.90 },
      { timePoint: "T5", expression: 2.2, confidence: 0.92 }
    ]
  },
  "4": { // Disease Pathways
    diseaseDistribution: [
      { category: "Autoimmune", count: 180, percentage: 33, trend: "+2.7%" },
      { category: "Inflammatory", count: 150, percentage: 27, trend: "+2.1%" },
      { category: "Metabolic", count: 120, percentage: 22, trend: "+1.8%" },
      { category: "Other", count: 100, percentage: 18, trend: "+1.0%" }
    ],
    diseaseTrends: [
      { year: "2020", autoimmune: 160, inflammatory: 130, metabolic: 100, other: 80 },
      { year: "2021", autoimmune: 165, inflammatory: 135, metabolic: 105, other: 85 },
      { year: "2022", autoimmune: 170, inflammatory: 140, metabolic: 110, other: 90 },
      { year: "2023", autoimmune: 175, inflammatory: 145, metabolic: 115, other: 95 },
      { year: "2024", autoimmune: 180, inflammatory: 150, metabolic: 120, other: 100 }
    ],
    geneExpression: [
      { timePoint: "T1", expression: 1.6, confidence: 0.95 },
      { timePoint: "T2", expression: 3.2, confidence: 0.93 },
      { timePoint: "T3", expression: 4.0, confidence: 0.91 },
      { timePoint: "T4", expression: 3.3, confidence: 0.92 },
      { timePoint: "T5", expression: 2.1, confidence: 0.94 }
    ]
  }
};

// Add trend visualization data after the datasetVisualizations object
const trendVisualizations = {
  "1": {
    yearlyTrends: [
      { year: "2020", cardiovascular: 150, neurological: 120, metabolic: 90, genetic: 80 },
      { year: "2021", cardiovascular: 155, neurological: 125, metabolic: 95, genetic: 85 },
      { year: "2022", cardiovascular: 160, neurological: 130, metabolic: 100, genetic: 90 },
      { year: "2023", cardiovascular: 165, neurological: 135, metabolic: 105, genetic: 95 },
      { year: "2024", cardiovascular: 170, neurological: 140, metabolic: 110, genetic: 100 }
    ],
    monthlyTrends: [
      { month: "Jan", cases: 120, mortality: 35, recovery: 85 },
      { month: "Feb", cases: 125, mortality: 33, recovery: 92 },
      { month: "Mar", cases: 130, mortality: 32, recovery: 98 },
      { month: "Apr", cases: 135, mortality: 31, recovery: 104 },
      { month: "May", cases: 140, mortality: 30, recovery: 110 },
      { month: "Jun", cases: 145, mortality: 29, recovery: 116 }
    ],
    regionalTrends: [
      { region: "North", cases: 180, prevalence: 0.32, mortality: 45 },
      { region: "South", cases: 150, prevalence: 0.28, mortality: 38 },
      { region: "East", cases: 120, prevalence: 0.25, mortality: 32 },
      { region: "West", cases: 100, prevalence: 0.22, mortality: 28 }
    ]
  },
  "2": {
    yearlyTrends: [
      { year: "2020", neurological: 180, autoimmune: 130, metabolic: 100, other: 80 },
      { year: "2021", neurological: 185, autoimmune: 135, metabolic: 105, other: 85 },
      { year: "2022", neurological: 190, autoimmune: 140, metabolic: 110, other: 90 },
      { year: "2023", neurological: 195, autoimmune: 145, metabolic: 115, other: 95 },
      { year: "2024", neurological: 200, autoimmune: 150, metabolic: 120, other: 100 }
    ],
    monthlyTrends: [
      { month: "Jan", cases: 150, mortality: 40, recovery: 110 },
      { month: "Feb", cases: 155, mortality: 38, recovery: 117 },
      { month: "Mar", cases: 160, mortality: 37, recovery: 123 },
      { month: "Apr", cases: 165, mortality: 36, recovery: 129 },
      { month: "May", cases: 170, mortality: 35, recovery: 135 },
      { month: "Jun", cases: 175, mortality: 34, recovery: 141 }
    ],
    regionalTrends: [
      { region: "North", cases: 200, prevalence: 0.35, mortality: 50 },
      { region: "South", cases: 170, prevalence: 0.30, mortality: 42 },
      { region: "East", cases: 140, prevalence: 0.28, mortality: 35 },
      { region: "West", cases: 120, prevalence: 0.25, mortality: 30 }
    ]
  },
  "3": {
    yearlyTrends: [
      { year: "2020", cancer: 220, cardiovascular: 130, neurological: 100, other: 80 },
      { year: "2021", cancer: 225, cardiovascular: 135, neurological: 105, other: 85 },
      { year: "2022", cancer: 230, cardiovascular: 140, neurological: 110, other: 90 },
      { year: "2023", cancer: 235, cardiovascular: 145, neurological: 115, other: 95 },
      { year: "2024", cancer: 240, cardiovascular: 150, neurological: 120, other: 100 }
    ],
    monthlyTrends: [
      { month: "Jan", cases: 180, mortality: 45, recovery: 135 },
      { month: "Feb", cases: 185, mortality: 43, recovery: 142 },
      { month: "Mar", cases: 190, mortality: 42, recovery: 148 },
      { month: "Apr", cases: 195, mortality: 41, recovery: 154 },
      { month: "May", cases: 200, mortality: 40, recovery: 160 },
      { month: "Jun", cases: 205, mortality: 39, recovery: 166 }
    ],
    regionalTrends: [
      { region: "North", cases: 250, prevalence: 0.40, mortality: 60 },
      { region: "South", cases: 220, prevalence: 0.35, mortality: 52 },
      { region: "East", cases: 190, prevalence: 0.32, mortality: 45 },
      { region: "West", cases: 160, prevalence: 0.30, mortality: 40 }
    ]
  },
  "4": {
    yearlyTrends: [
      { year: "2020", autoimmune: 160, inflammatory: 130, metabolic: 100, other: 80 },
      { year: "2021", autoimmune: 165, inflammatory: 135, metabolic: 105, other: 85 },
      { year: "2022", autoimmune: 170, inflammatory: 140, metabolic: 110, other: 90 },
      { year: "2023", autoimmune: 175, inflammatory: 145, metabolic: 115, other: 95 },
      { year: "2024", autoimmune: 180, inflammatory: 150, metabolic: 120, other: 100 }
    ],
    monthlyTrends: [
      { month: "Jan", cases: 140, mortality: 38, recovery: 102 },
      { month: "Feb", cases: 145, mortality: 36, recovery: 109 },
      { month: "Mar", cases: 150, mortality: 35, recovery: 115 },
      { month: "Apr", cases: 155, mortality: 34, recovery: 121 },
      { month: "May", cases: 160, mortality: 33, recovery: 127 },
      { month: "Jun", cases: 165, mortality: 32, recovery: 133 }
    ],
    regionalTrends: [
      { region: "North", cases: 180, prevalence: 0.33, mortality: 48 },
      { region: "South", cases: 150, prevalence: 0.29, mortality: 40 },
      { region: "East", cases: 130, prevalence: 0.27, mortality: 35 },
      { region: "West", cases: 110, prevalence: 0.25, mortality: 30 }
    ]
  }
};

// Add new mock data for detailed disease information
const diseaseProfiles = {
  cardiovascular: {
    overview: {
      name: "Cardiovascular Diseases",
      description: "A class of diseases affecting the heart and blood vessels, including coronary artery disease, heart failure, and arrhythmias.",
      prevalence: "31.5% of global population",
      mortality: "17.9M deaths annually",
      riskFactors: [
        { name: "Hypertension", impact: "High", prevalence: "46% of adults" },
        { name: "High Cholesterol", impact: "High", prevalence: "39% of adults" },
        { name: "Smoking", impact: "High", prevalence: "20% of adults" },
        { name: "Obesity", impact: "Medium", prevalence: "42% of adults" },
        { name: "Physical Inactivity", impact: "Medium", prevalence: "60% of adults" }
      ],
      geneticMarkers: [
        { gene: "APOE", function: "Lipid metabolism", impact: "High" },
        { gene: "PCSK9", function: "Cholesterol regulation", impact: "High" },
        { gene: "LDLR", function: "LDL receptor", impact: "Medium" }
      ],
      modernTreatments: [
        { name: "Statins", mechanism: "Cholesterol synthesis inhibition", effectiveness: "85%" },
        { name: "PCSK9 Inhibitors", mechanism: "LDL receptor regulation", effectiveness: "90%" },
        { name: "ACE Inhibitors", mechanism: "Blood pressure regulation", effectiveness: "80%" }
      ],
      biomarkers: [
        { name: "Troponin", normal: "0-0.04 ng/mL", elevated: ">0.04 ng/mL" },
        { name: "BNP", normal: "<100 pg/mL", elevated: ">100 pg/mL" },
        { name: "CRP", normal: "<3 mg/L", elevated: ">3 mg/L" }
      ]
    },
    trends: {
      historical: [
        { year: 2015, cases: 100, mortality: 35 },
        { year: 2016, cases: 105, mortality: 33 },
        { year: 2017, cases: 110, mortality: 32 },
        { year: 2018, cases: 115, mortality: 31 },
        { year: 2019, cases: 120, mortality: 30 },
        { year: 2020, cases: 125, mortality: 29 },
        { year: 2021, cases: 130, mortality: 28 },
        { year: 2022, cases: 135, mortality: 27 },
        { year: 2023, cases: 140, mortality: 26 }
      ],
      projections: [
        { year: 2024, cases: 145, mortality: 25 },
        { year: 2025, cases: 150, mortality: 24 },
        { year: 2026, cases: 155, mortality: 23 }
      ]
    }
  },
  neurological: {
    overview: {
      name: "Neurological Disorders",
      description: "Disorders affecting the nervous system, including neurodegenerative diseases, movement disorders, and cognitive impairments.",
      prevalence: "15.2% of global population",
      mortality: "9.0M deaths annually",
      riskFactors: [
        { name: "Age", impact: "High", prevalence: "Increasing with age" },
        { name: "Genetics", impact: "High", prevalence: "Varies by condition" },
        { name: "Environmental Factors", impact: "Medium", prevalence: "Widespread" },
        { name: "Lifestyle", impact: "Medium", prevalence: "Variable" }
      ],
      geneticMarkers: [
        { gene: "SNCA", function: "Alpha-synuclein", impact: "High" },
        { gene: "HTT", function: "Huntingtin protein", impact: "High" },
        { gene: "APP", function: "Amyloid precursor", impact: "High" }
      ],
      modernTreatments: [
        { name: "Deep Brain Stimulation", mechanism: "Neural modulation", effectiveness: "75%" },
        { name: "Gene Therapy", mechanism: "Genetic modification", effectiveness: "60%" },
        { name: "Stem Cell Therapy", mechanism: "Cell replacement", effectiveness: "50%" }
      ],
      biomarkers: [
        { name: "Tau Protein", normal: "<300 pg/mL", elevated: ">300 pg/mL" },
        { name: "Beta-Amyloid", normal: "<450 pg/mL", elevated: ">450 pg/mL" },
        { name: "Alpha-Synuclein", normal: "<100 pg/mL", elevated: ">100 pg/mL" }
      ]
    },
    trends: {
      historical: [
        { year: 2015, cases: 150, mortality: 45 },
        { year: 2016, cases: 155, mortality: 44 },
        { year: 2017, cases: 160, mortality: 43 },
        { year: 2018, cases: 165, mortality: 42 },
        { year: 2019, cases: 170, mortality: 41 },
        { year: 2020, cases: 175, mortality: 40 },
        { year: 2021, cases: 180, mortality: 39 },
        { year: 2022, cases: 185, mortality: 38 },
        { year: 2023, cases: 190, mortality: 37 }
      ],
      projections: [
        { year: 2024, cases: 195, mortality: 36 },
        { year: 2025, cases: 200, mortality: 35 },
        { year: 2026, cases: 205, mortality: 34 }
      ]
    }
  }
};

// Add type for disease type
type DiseaseType = "cardiovascular" | "neurological";

// Add type for AI analysis data
type AIAnalysisData = {
  riskAssessment: {
    overallRisk: string;
    factors: Array<{
      name: string;
      score: number;
      impact: string;
    }>;
    recommendations: string[];
  };
  treatmentPredictions: Array<{
    treatment: string;
    predictedEffectiveness: number;
    confidence: number;
    timeline: string;
    sideEffects: string[];
    alternatives: string[];
  }>;
  researchInsights: Array<{
    title: string;
    description: string;
    confidence: number;
    impact: string;
    timeline: string;
  }>;
};

// Update AI analysis data with proper typing
const aiAnalysis: Record<DiseaseType, AIAnalysisData> = {
  cardiovascular: {
    riskAssessment: {
      overallRisk: "Moderate",
      factors: [
        { name: "Genetic Predisposition", score: 0.75, impact: "High" },
        { name: "Lifestyle Factors", score: 0.65, impact: "Medium" },
        { name: "Environmental Factors", score: 0.45, impact: "Low" }
      ],
      recommendations: [
        "Regular cardiovascular screening",
        "Lifestyle modifications",
        "Preventive medication"
      ]
    },
    treatmentPredictions: [
      {
        treatment: "Statins",
        predictedEffectiveness: 0.85,
        confidence: 0.92,
        timeline: "6-12 months",
        sideEffects: ["Muscle pain", "Liver issues"],
        alternatives: ["PCSK9 inhibitors", "Ezetimibe"]
      },
      {
        treatment: "ACE Inhibitors",
        predictedEffectiveness: 0.80,
        confidence: 0.88,
        timeline: "3-6 months",
        sideEffects: ["Cough", "Dizziness"],
        alternatives: ["ARBs", "Calcium channel blockers"]
      }
    ],
    researchInsights: [
      {
        title: "Novel Gene Therapy Approach",
        description: "New gene editing technique shows promise in reducing cholesterol levels",
        confidence: 0.88,
        impact: "High",
        timeline: "2-3 years"
      },
      {
        title: "AI-Powered Risk Prediction",
        description: "Machine learning model improves early detection accuracy by 25%",
        confidence: 0.92,
        impact: "Medium",
        timeline: "1-2 years"
      }
    ]
  },
  neurological: {
    riskAssessment: {
      overallRisk: "Low",
      factors: [
        { name: "Genetic Markers", score: 0.35, impact: "Medium" },
        { name: "Age-related Factors", score: 0.25, impact: "Low" },
        { name: "Environmental Triggers", score: 0.15, impact: "Low" }
      ],
      recommendations: [
        "Cognitive assessment",
        "Neurological monitoring",
        "Preventive measures"
      ]
    },
    treatmentPredictions: [
      {
        treatment: "Deep Brain Stimulation",
        predictedEffectiveness: 0.75,
        confidence: 0.85,
        timeline: "12-24 months",
        sideEffects: ["Infection", "Hardware issues"],
        alternatives: ["Gene therapy", "Stem cell therapy"]
      },
      {
        treatment: "Antidepressants",
        predictedEffectiveness: 0.70,
        confidence: 0.82,
        timeline: "4-8 weeks",
        sideEffects: ["Weight gain", "Sexual dysfunction"],
        alternatives: ["Psychotherapy", "TMS"]
      }
    ],
    researchInsights: [
      {
        title: "Stem Cell Breakthrough",
        description: "New stem cell therapy shows potential for neural regeneration",
        confidence: 0.85,
        impact: "High",
        timeline: "3-4 years"
      },
      {
        title: "Biomarker Discovery",
        description: "New protein markers identified for early disease detection",
        confidence: 0.90,
        impact: "Medium",
        timeline: "1-2 years"
      }
    ]
  }
};

// Update AIAnalysisReport component with proper error handling
const AIAnalysisReport = ({ diseaseType }: { diseaseType: DiseaseType }) => {
  const [activeTab, setActiveTab] = React.useState("risk");
  const analysis = aiAnalysis[diseaseType];

  if (!analysis || !analysis.riskAssessment) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">No Analysis Available</CardTitle>
          <CardDescription>
            Please select a valid disease type for analysis
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">AI Analysis Report</CardTitle>
            <CardDescription>
              AI-powered insights and predictions for {diseaseType} diseases
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            Generated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="treatment">Treatment Predictions</TabsTrigger>
            <TabsTrigger value="research">Research Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">Risk Level:</span>
                      <Badge variant={analysis.riskAssessment.overallRisk === "High" ? "destructive" : "default"}>
                        {analysis.riskAssessment.overallRisk}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {analysis.riskAssessment.factors.map((factor) => (
                        <div key={factor.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{factor.name}</span>
                            <span className="font-medium">{Math.round(factor.score * 100)}%</span>
                          </div>
                          <Progress value={factor.score * 100} className="h-2" />
                          <div className="flex justify-end">
                            <Badge variant="outline" className="text-xs">
                              {factor.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.riskAssessment.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.treatmentPredictions.map((treatment) => (
                <Card key={treatment.treatment}>
                  <CardHeader>
                    <CardTitle>{treatment.treatment}</CardTitle>
                    <CardDescription>
                      Predicted Effectiveness: {Math.round(treatment.predictedEffectiveness * 100)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence</span>
                          <span className="font-medium">{Math.round(treatment.confidence * 100)}%</span>
                        </div>
                        <Progress value={treatment.confidence * 100} className="h-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                        <p className="font-medium">{treatment.timeline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Potential Side Effects</p>
                        <div className="flex flex-wrap gap-1">
                          {treatment.sideEffects.map((effect) => (
                            <Badge key={effect} variant="secondary" className="text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Alternative Treatments</p>
                        <div className="flex flex-wrap gap-1">
                          {treatment.alternatives.map((alt) => (
                            <Badge key={alt} variant="outline" className="text-xs">
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.researchInsights.map((insight) => (
                <Card key={insight.title}>
                  <CardHeader>
                    <CardTitle>{insight.title}</CardTitle>
                    <CardDescription>{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <Badge variant="outline">
                          {Math.round(insight.confidence * 100)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Impact:</span>
                        <Badge variant={insight.impact === "High" ? "destructive" : "default"}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{insight.timeline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Add new component for disease profile
const DiseaseProfile = ({ disease }) => {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">{disease.overview.name}</CardTitle>
        <CardDescription>{disease.overview.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="genetics">Genetics</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prevalence</span>
                    <span className="font-medium">{disease.overview.prevalence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mortality</span>
                    <span className="font-medium">{disease.overview.mortality}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Risk Factors</h3>
                <div className="space-y-2">
                  {disease.overview.riskFactors.map((factor) => (
                    <div key={factor.name} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{factor.name}</span>
                      <Badge variant={factor.impact === "High" ? "destructive" : "secondary"}>
                        {factor.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="genetics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Genetic Markers</h3>
                <div className="space-y-2">
                  {disease.overview.geneticMarkers.map((marker) => (
                    <Card key={marker.gene}>
                      <CardHeader className="py-2">
                        <CardTitle className="text-base">{marker.gene}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{marker.function}</p>
                          <Badge variant={marker.impact === "High" ? "destructive" : "secondary"}>
                            {marker.impact} Impact
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Gene Expression</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datasetVisualizations["1"].geneExpression}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timePoint" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="expression" name="Expression" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {disease.overview.modernTreatments.map((treatment) => (
                <Card key={treatment.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{treatment.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{treatment.mechanism}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Effectiveness:</span>
                        <Progress value={parseInt(treatment.effectiveness)} className="h-2" />
                        <span className="text-sm font-medium">{treatment.effectiveness}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="biomarkers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {disease.overview.biomarkers.map((marker) => (
                <Card key={marker.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{marker.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Normal Range</span>
                        <span className="font-medium">{marker.normal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Elevated</span>
                        <span className="font-medium text-red-500">{marker.elevated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={disease.trends.historical}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cases" name="Cases" stroke="#8884d8" />
                        <Line type="monotone" dataKey="mortality" name="Mortality" stroke="#ff8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Future Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={disease.trends.projections}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cases" name="Projected Cases" stroke="#8884d8" />
                        <Line type="monotone" dataKey="mortality" name="Projected Mortality" stroke="#ff8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Add dataset-specific disease information
const datasetDiseases = {
  "1": { // Human Disease Network
    diseases: [
      {
        name: "Coronary Artery Disease",
        genes: ["APOB", "LDLR", "PCSK9"],
        prevalence: "6.7%",
        confidence: 0.95,
        lastUpdated: "2024-02-15",
        publications: 1250,
        variants: 450
      },
      {
        name: "Alzheimer's Disease",
        genes: ["APP", "PSEN1", "PSEN2"],
        prevalence: "5.8%",
        confidence: 0.93,
        lastUpdated: "2024-02-14",
        publications: 980,
        variants: 320
      },
      {
        name: "Type 2 Diabetes",
        genes: ["TCF7L2", "PPARG", "KCNJ11"],
        prevalence: "8.5%",
        confidence: 0.91,
        lastUpdated: "2024-02-13",
        publications: 850,
        variants: 280
      }
    ]
  },
  "2": { // Disease-Gene Associations
    diseases: [
      {
        name: "Parkinson's Disease",
        genes: ["SNCA", "LRRK2", "PARK2"],
        prevalence: "0.3%",
        confidence: 0.92,
        lastUpdated: "2024-02-10",
        publications: 750,
        variants: 250
      },
      {
        name: "Multiple Sclerosis",
        genes: ["HLA-DRB1", "IL2RA", "IL7R"],
        prevalence: "0.1%",
        confidence: 0.90,
        lastUpdated: "2024-02-09",
        publications: 680,
        variants: 220
      },
      {
        name: "Rheumatoid Arthritis",
        genes: ["PTPN22", "CTLA4", "TNF"],
        prevalence: "1.0%",
        confidence: 0.89,
        lastUpdated: "2024-02-08",
        publications: 620,
        variants: 190
      }
    ]
  },
  "3": { // Clinical Variants Database
    diseases: [
      {
        name: "Breast Cancer",
        genes: ["BRCA1", "BRCA2", "TP53"],
        prevalence: "12.9%",
        confidence: 0.89,
        lastUpdated: "2024-02-18",
        publications: 1500,
        variants: 520
      },
      {
        name: "Colorectal Cancer",
        genes: ["APC", "KRAS", "BRAF"],
        prevalence: "4.2%",
        confidence: 0.88,
        lastUpdated: "2024-02-17",
        publications: 1200,
        variants: 480
      },
      {
        name: "Lung Cancer",
        genes: ["EGFR", "KRAS", "ALK"],
        prevalence: "2.1%",
        confidence: 0.87,
        lastUpdated: "2024-02-16",
        publications: 1100,
        variants: 450
      }
    ]
  },
  "4": { // Disease Pathways
    diseases: [
      {
        name: "Inflammatory Bowel Disease",
        genes: ["NOD2", "IL23R", "ATG16L1"],
        prevalence: "0.5%",
        confidence: 0.91,
        lastUpdated: "2024-02-12",
        publications: 900,
        variants: 380
      },
      {
        name: "Psoriasis",
        genes: ["IL12B", "IL23R", "TNIP1"],
        prevalence: "2.0%",
        confidence: 0.90,
        lastUpdated: "2024-02-11",
        publications: 850,
        variants: 350
      },
      {
        name: "Asthma",
        genes: ["IL13", "IL4", "ADAM33"],
        prevalence: "7.7%",
        confidence: 0.89,
        lastUpdated: "2024-02-10",
        publications: 800,
        variants: 320
      }
    ]
  }
};

// Add new component for dataset diseases
const DatasetDiseases = ({ datasetId }) => {
  const dataset = datasets.find(d => d.id === datasetId);
  const diseases = datasetDiseases[datasetId]?.diseases || [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diseases.map((disease) => (
          <Card key={disease.name} className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{disease.name}</CardTitle>
              <CardDescription>
                Last updated: {disease.lastUpdated}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Prevalence
                  </span>
                  <span className="font-medium">{disease.prevalence}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium">{Math.round(disease.confidence * 100)}%</span>
                  </div>
                  <Progress value={disease.confidence * 100} className="h-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Associated Genes</p>
                  <div className="flex flex-wrap gap-1">
                    {disease.genes.map((gene) => (
                      <Badge key={gene} variant="secondary" className="text-xs">
                        {gene}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Publications</span>
                    <p className="font-medium">{disease.publications}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Variants</span>
                    <p className="font-medium">{disease.variants}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Info className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Disease = () => {
  const [selectedDataset, setSelectedDataset] = React.useState("1");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = React.useState("cardiovascular");
  const [selectedDiseaseType, setSelectedDiseaseType] = React.useState<DiseaseType>("cardiovascular");

  // Get current dataset's visualization data
  const currentVisualizationData = datasetVisualizations[selectedDataset] || datasetVisualizations["1"];

  // Get current dataset's trend data
  const currentTrendData = trendVisualizations[selectedDataset] || trendVisualizations["1"];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleDiseaseTypeChange = (value: string) => {
    if (value === "cardiovascular" || value === "neurological") {
      setSelectedDiseaseType(value as DiseaseType);
    }
  };

  // Update disease categories based on selected dataset
  const getDatasetDiseaseCategories = () => {
    const dataset = datasets.find(d => d.id === selectedDataset);
    const diseases = datasetDiseases[selectedDataset]?.diseases || [];
    
    return diseases.map((disease, index) => ({
      id: String(index + 1),
      name: disease.name,
      count: disease.variants,
      genes: disease.genes,
      confidence: disease.confidence,
      severity: disease.confidence > 0.9 ? "High" : "Medium",
      color: `from-${COLORS[index % COLORS.length]}-500 to-${COLORS[index % COLORS.length]}-600`,
      description: `${disease.name} - ${disease.prevalence} prevalence`,
      prevalence: disease.prevalence,
      mortality: `${Math.round(disease.variants * 0.1)}K/year`,
      riskFactors: disease.genes.map(gene => `${gene} mutation`),
      treatments: ["Standard treatment", "Experimental therapy", "Supportive care"]
    }));
  };

  const currentDiseaseCategories = getDatasetDiseaseCategories();

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Disease Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis of disease-gene associations and patterns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search diseases, genes, or pathways..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedDataset} onValueChange={setSelectedDataset}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select dataset" />
          </SelectTrigger>
          <SelectContent>
            {datasets.map((dataset) => (
              <SelectItem key={dataset.id} value={dataset.id}>
                {dataset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profiles">Disease Profiles</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentDiseaseCategories.map((category) => (
              <Card key={category.id} className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {category.count} associated genes
                      </span>
                      <Badge variant="outline" className={category.severity === "High" ? "text-red-500" : "text-yellow-500"}>
                        {category.severity} Risk
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.genes.map((gene) => (
                        <Badge key={gene} variant="secondary" className="text-xs">
                          {gene}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Prevalence</span>
                        <span className="font-medium">{category.prevalence}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Mortality</span>
                        <span className="font-medium">{category.mortality}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${category.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(category.confidence * 100)}%
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => toggleCategory(category.id)}
                    >
                      {expandedCategory === category.id ? (
                        <Minus className="w-4 h-4 mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      {expandedCategory === category.id ? "Show Less" : "Show More"}
                    </Button>
                    {expandedCategory === category.id && (
                      <div className="space-y-3 pt-2 border-t">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Risk Factors</h4>
                          <div className="flex flex-wrap gap-1">
                            {category.riskFactors.map((factor) => (
                              <Badge key={factor} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Treatments</h4>
                          <div className="flex flex-wrap gap-1">
                            {category.treatments.map((treatment) => (
                              <Badge key={treatment} variant="outline" className="text-xs">
                                {treatment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Disease Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={currentVisualizationData.diseaseDistribution}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Count">
                        {currentVisualizationData.diseaseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disease Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currentVisualizationData.diseaseTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {Object.keys(currentVisualizationData.diseaseTrends[0])
                        .filter(key => key !== 'year')
                        .map((key, index) => (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            name={key.charAt(0).toUpperCase() + key.slice(1)}
                            stroke={COLORS[index % COLORS.length]}
                          />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={selectedDisease} onValueChange={setSelectedDisease}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select disease" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiovascular">Cardiovascular Diseases</SelectItem>
                <SelectItem value="neurological">Neurological Disorders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DiseaseProfile disease={diseaseProfiles[selectedDisease]} />
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <div className="flex gap-4 mb-6">
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                {datasets.map((dataset) => (
                  <SelectItem key={dataset.id} value={dataset.id}>
                    {dataset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {datasets.find(d => d.id === selectedDataset)?.name}
                    </CardTitle>
                    <CardDescription>
                      {datasets.find(d => d.id === selectedDataset)?.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {datasets.find(d => d.id === selectedDataset)?.quality}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.coverage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diseases</p>
                    <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.diseases}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Score</span>
                    <span className="font-medium">
                      {Math.round(datasets.find(d => d.id === selectedDataset)?.confidence * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={datasets.find(d => d.id === selectedDataset)?.confidence * 100} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Data Sources</p>
                  <div className="flex flex-wrap gap-1">
                    {datasets.find(d => d.id === selectedDataset)?.sources.map((source) => (
                      <Badge key={source} variant="secondary" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Diseases in Dataset</h2>
              <DatasetDiseases datasetId={selectedDataset} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="flex gap-4 mb-6">
            <Select value={selectedDiseaseType} onValueChange={handleDiseaseTypeChange}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select disease type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiovascular">Cardiovascular Diseases</SelectItem>
                <SelectItem value="neurological">Neurological Disorders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AIAnalysisReport diseaseType={selectedDiseaseType} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Yearly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Yearly Disease Trends</CardTitle>
                <CardDescription>
                  Historical trends of disease categories over the years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={currentTrendData.yearlyTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {Object.keys(currentTrendData.yearlyTrends[0])
                        .filter(key => key !== 'year')
                        .map((key, index) => (
                          <Area
                            key={key}
                            type="monotone"
                            dataKey={key}
                            name={key.charAt(0).toUpperCase() + key.slice(1)}
                            stackId="1"
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Disease Analysis</CardTitle>
                <CardDescription>
                  Monthly breakdown of cases, mortality, and recovery rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currentTrendData.monthlyTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cases"
                        name="Cases"
                        stroke={COLORS[0]}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="mortality"
                        name="Mortality"
                        stroke={COLORS[1]}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="recovery"
                        name="Recovery"
                        stroke={COLORS[2]}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Regional Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Disease Distribution</CardTitle>
                <CardDescription>
                  Geographic distribution of disease cases and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={currentTrendData.regionalTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis yAxisId="left" orientation="left" stroke={COLORS[0]} />
                      <YAxis yAxisId="right" orientation="right" stroke={COLORS[1]} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="cases"
                        name="Cases"
                        fill={COLORS[0]}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="mortality"
                        name="Mortality"
                        fill={COLORS[1]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="prevalence"
                        name="Prevalence"
                        stroke={COLORS[2]}
                        strokeWidth={2}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Disease; 