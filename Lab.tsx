import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Microscope, Dna, Activity, LineChart, AlertCircle, Info, Download, Upload, FileText, BarChart2, PieChart, ScatterChart, TrendingUp, Share2, Filter, Search, Copy, Mail, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ScatterChart as RechartsScatterChart, Scatter } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useClipboard } from "@/hooks/use-clipboard";
import { Loader2 } from "lucide-react";

// Mock data for gene expression analysis
const geneExpressionData = {
  recentAnalyses: [
    {
      id: 1,
      name: "Brain Tissue Analysis",
      date: "2024-03-15",
      status: "completed",
      genes: 1250,
      pathways: 45,
      trend: [0.65, 0.72, 0.78, 0.82, 0.85],
      correlation: 0.92
    },
    {
      id: 2,
      name: "Blood Sample Analysis",
      date: "2024-03-10",
      status: "completed",
      genes: 980,
      pathways: 32,
      trend: [0.58, 0.62, 0.65, 0.68, 0.72],
      correlation: 0.88
    },
    {
      id: 3,
      name: "Muscle Tissue Analysis",
      date: "2024-03-05",
      status: "in_progress",
      genes: 0,
      pathways: 0,
      trend: [],
      correlation: 0
    }
  ],
  topGenes: [
    { name: "TP53", expression: 0.92, status: "upregulated", function: "Tumor Suppression", trend: [0.75, 0.82, 0.85, 0.88, 0.92] },
    { name: "BRCA1", expression: 0.88, status: "upregulated", function: "DNA Repair", trend: [0.65, 0.68, 0.72, 0.75, 0.88] },
    { name: "EGFR", expression: 0.75, status: "upregulated", function: "Cell Growth", trend: [0.58, 0.62, 0.65, 0.68, 0.75] },
    { name: "KRAS", expression: 0.45, status: "downregulated", function: "Signal Transduction", trend: [0.52, 0.48, 0.45, 0.45, 0.45] }
  ],
  pathways: [
    { name: "Cell Cycle Regulation", genes: 45, status: "active", enrichment: 0.92, trend: [0.75, 0.82, 0.85, 0.88, 0.92] },
    { name: "DNA Repair", genes: 32, status: "active", enrichment: 0.88, trend: [0.65, 0.68, 0.72, 0.75, 0.88] },
    { name: "Apoptosis", genes: 28, status: "active", enrichment: 0.75, trend: [0.58, 0.62, 0.65, 0.68, 0.75] },
    { name: "Metabolism", genes: 56, status: "active", enrichment: 0.82, trend: [0.68, 0.72, 0.75, 0.78, 0.82] }
  ]
};

// Add this after the geneExpressionData object
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Add this after the geneExpressionData object
const timeBasedData = {
  "1w": {
    topGenes: [
      { name: "TP53", expression: 0.92, status: "upregulated", function: "Tumor Suppression", trend: [0.90, 0.91, 0.91, 0.92, 0.92] },
      { name: "BRCA1", expression: 0.88, status: "upregulated", function: "DNA Repair", trend: [0.85, 0.86, 0.87, 0.87, 0.88] },
      { name: "EGFR", expression: 0.75, status: "upregulated", function: "Cell Growth", trend: [0.72, 0.73, 0.74, 0.74, 0.75] },
      { name: "KRAS", expression: 0.45, status: "downregulated", function: "Signal Transduction", trend: [0.46, 0.45, 0.45, 0.45, 0.45] }
    ],
    pathways: [
      { name: "Cell Cycle Regulation", genes: 45, status: "active", enrichment: 0.92, trend: [0.90, 0.91, 0.91, 0.92, 0.92] },
      { name: "DNA Repair", genes: 32, status: "active", enrichment: 0.88, trend: [0.85, 0.86, 0.87, 0.87, 0.88] },
      { name: "Apoptosis", genes: 28, status: "active", enrichment: 0.75, trend: [0.72, 0.73, 0.74, 0.74, 0.75] },
      { name: "Metabolism", genes: 56, status: "active", enrichment: 0.82, trend: [0.80, 0.81, 0.81, 0.82, 0.82] }
    ]
  },
  "1m": {
    topGenes: [
      { name: "TP53", expression: 0.92, status: "upregulated", function: "Tumor Suppression", trend: [0.85, 0.87, 0.89, 0.90, 0.92] },
      { name: "BRCA1", expression: 0.88, status: "upregulated", function: "DNA Repair", trend: [0.80, 0.82, 0.84, 0.86, 0.88] },
      { name: "EGFR", expression: 0.75, status: "upregulated", function: "Cell Growth", trend: [0.68, 0.70, 0.72, 0.73, 0.75] },
      { name: "KRAS", expression: 0.45, status: "downregulated", function: "Signal Transduction", trend: [0.48, 0.47, 0.46, 0.45, 0.45] }
    ],
    pathways: [
      { name: "Cell Cycle Regulation", genes: 45, status: "active", enrichment: 0.92, trend: [0.85, 0.87, 0.89, 0.90, 0.92] },
      { name: "DNA Repair", genes: 32, status: "active", enrichment: 0.88, trend: [0.80, 0.82, 0.84, 0.86, 0.88] },
      { name: "Apoptosis", genes: 28, status: "active", enrichment: 0.75, trend: [0.68, 0.70, 0.72, 0.73, 0.75] },
      { name: "Metabolism", genes: 56, status: "active", enrichment: 0.82, trend: [0.75, 0.77, 0.79, 0.80, 0.82] }
    ]
  },
  "3m": {
    topGenes: [
      { name: "TP53", expression: 0.92, status: "upregulated", function: "Tumor Suppression", trend: [0.75, 0.80, 0.85, 0.88, 0.92] },
      { name: "BRCA1", expression: 0.88, status: "upregulated", function: "DNA Repair", trend: [0.70, 0.75, 0.80, 0.84, 0.88] },
      { name: "EGFR", expression: 0.75, status: "upregulated", function: "Cell Growth", trend: [0.60, 0.65, 0.68, 0.72, 0.75] },
      { name: "KRAS", expression: 0.45, status: "downregulated", function: "Signal Transduction", trend: [0.50, 0.48, 0.47, 0.46, 0.45] }
    ],
    pathways: [
      { name: "Cell Cycle Regulation", genes: 45, status: "active", enrichment: 0.92, trend: [0.75, 0.80, 0.85, 0.88, 0.92] },
      { name: "DNA Repair", genes: 32, status: "active", enrichment: 0.88, trend: [0.70, 0.75, 0.80, 0.84, 0.88] },
      { name: "Apoptosis", genes: 28, status: "active", enrichment: 0.75, trend: [0.60, 0.65, 0.68, 0.72, 0.75] },
      { name: "Metabolism", genes: 56, status: "active", enrichment: 0.82, trend: [0.65, 0.70, 0.75, 0.78, 0.82] }
    ]
  },
  "6m": {
    topGenes: [
      { name: "TP53", expression: 0.92, status: "upregulated", function: "Tumor Suppression", trend: [0.65, 0.75, 0.82, 0.87, 0.92] },
      { name: "BRCA1", expression: 0.88, status: "upregulated", function: "DNA Repair", trend: [0.60, 0.70, 0.75, 0.82, 0.88] },
      { name: "EGFR", expression: 0.75, status: "upregulated", function: "Cell Growth", trend: [0.50, 0.60, 0.65, 0.70, 0.75] },
      { name: "KRAS", expression: 0.45, status: "downregulated", function: "Signal Transduction", trend: [0.52, 0.50, 0.48, 0.46, 0.45] }
    ],
    pathways: [
      { name: "Cell Cycle Regulation", genes: 45, status: "active", enrichment: 0.92, trend: [0.65, 0.75, 0.82, 0.87, 0.92] },
      { name: "DNA Repair", genes: 32, status: "active", enrichment: 0.88, trend: [0.60, 0.70, 0.75, 0.82, 0.88] },
      { name: "Apoptosis", genes: 28, status: "active", enrichment: 0.75, trend: [0.50, 0.60, 0.65, 0.70, 0.75] },
      { name: "Metabolism", genes: 56, status: "active", enrichment: 0.82, trend: [0.55, 0.65, 0.70, 0.76, 0.82] }
    ]
  }
};

// Add this after the timeBasedData object
const analysisTimeData = {
  "1w": {
    analyses: [
      {
        id: 1,
        name: "Brain Tissue Analysis",
        date: "2024-03-15",
        status: "completed",
        genes: 1250,
        pathways: 45,
        trend: [0.82, 0.83, 0.84, 0.85, 0.85],
        correlation: 0.92,
        details: {
          upregulated: 450,
          downregulated: 150,
          stable: 650,
          topPathways: ["Cell Cycle", "DNA Repair", "Apoptosis"]
        }
      },
      {
        id: 2,
        name: "Blood Sample Analysis",
        date: "2024-03-14",
        status: "completed",
        genes: 980,
        pathways: 32,
        trend: [0.78, 0.79, 0.80, 0.81, 0.82],
        correlation: 0.88,
        details: {
          upregulated: 320,
          downregulated: 120,
          stable: 540,
          topPathways: ["Metabolism", "Immune Response", "Cell Signaling"]
        }
      }
    ]
  },
  "1m": {
    analyses: [
      {
        id: 1,
        name: "Brain Tissue Analysis",
        date: "2024-03-15",
        status: "completed",
        genes: 1250,
        pathways: 45,
        trend: [0.75, 0.78, 0.80, 0.82, 0.85],
        correlation: 0.92,
        details: {
          upregulated: 450,
          downregulated: 150,
          stable: 650,
          topPathways: ["Cell Cycle", "DNA Repair", "Apoptosis"]
        }
      },
      {
        id: 2,
        name: "Blood Sample Analysis",
        date: "2024-03-10",
        status: "completed",
        genes: 980,
        pathways: 32,
        trend: [0.70, 0.72, 0.75, 0.78, 0.82],
        correlation: 0.88,
        details: {
          upregulated: 320,
          downregulated: 120,
          stable: 540,
          topPathways: ["Metabolism", "Immune Response", "Cell Signaling"]
        }
      },
      {
        id: 3,
        name: "Muscle Tissue Analysis",
        date: "2024-03-05",
        status: "completed",
        genes: 1100,
        pathways: 38,
        trend: [0.65, 0.68, 0.72, 0.75, 0.78],
        correlation: 0.85,
        details: {
          upregulated: 380,
          downregulated: 140,
          stable: 580,
          topPathways: ["Muscle Development", "Energy Metabolism", "Cell Growth"]
        }
      }
    ]
  },
  "3m": {
    analyses: [
      {
        id: 1,
        name: "Brain Tissue Analysis",
        date: "2024-03-15",
        status: "completed",
        genes: 1250,
        pathways: 45,
        trend: [0.65, 0.70, 0.75, 0.80, 0.85],
        correlation: 0.92,
        details: {
          upregulated: 450,
          downregulated: 150,
          stable: 650,
          topPathways: ["Cell Cycle", "DNA Repair", "Apoptosis"]
        }
      },
      {
        id: 2,
        name: "Blood Sample Analysis",
        date: "2024-02-15",
        status: "completed",
        genes: 980,
        pathways: 32,
        trend: [0.60, 0.65, 0.70, 0.75, 0.82],
        correlation: 0.88,
        details: {
          upregulated: 320,
          downregulated: 120,
          stable: 540,
          topPathways: ["Metabolism", "Immune Response", "Cell Signaling"]
        }
      },
      {
        id: 3,
        name: "Muscle Tissue Analysis",
        date: "2024-01-15",
        status: "completed",
        genes: 1100,
        pathways: 38,
        trend: [0.55, 0.60, 0.65, 0.70, 0.78],
        correlation: 0.85,
        details: {
          upregulated: 380,
          downregulated: 140,
          stable: 580,
          topPathways: ["Muscle Development", "Energy Metabolism", "Cell Growth"]
        }
      }
    ]
  },
  "6m": {
    analyses: [
      {
        id: 1,
        name: "Brain Tissue Analysis",
        date: "2024-03-15",
        status: "completed",
        genes: 1250,
        pathways: 45,
        trend: [0.55, 0.65, 0.70, 0.78, 0.85],
        correlation: 0.92,
        details: {
          upregulated: 450,
          downregulated: 150,
          stable: 650,
          topPathways: ["Cell Cycle", "DNA Repair", "Apoptosis"]
        }
      },
      {
        id: 2,
        name: "Blood Sample Analysis",
        date: "2024-01-15",
        status: "completed",
        genes: 980,
        pathways: 32,
        trend: [0.50, 0.60, 0.65, 0.70, 0.82],
        correlation: 0.88,
        details: {
          upregulated: 320,
          downregulated: 120,
          stable: 540,
          topPathways: ["Metabolism", "Immune Response", "Cell Signaling"]
        }
      },
      {
        id: 3,
        name: "Muscle Tissue Analysis",
        date: "2023-12-15",
        status: "completed",
        genes: 1100,
        pathways: 38,
        trend: [0.45, 0.55, 0.60, 0.65, 0.78],
        correlation: 0.85,
        details: {
          upregulated: 380,
          downregulated: 140,
          stable: 580,
          topPathways: ["Muscle Development", "Energy Metabolism", "Cell Growth"]
        }
      }
    ]
  }
};

const Lab = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("1m");
  const [expressionThreshold, setExpressionThreshold] = useState([0.5]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showVisualize, setShowVisualize] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportOptions, setExportOptions] = useState({
    includeGenes: true,
    includePathways: true,
    includeTrends: true,
    includeStats: true
  });
  const { copyToClipboard } = useClipboard();
  const [isExporting, setIsExporting] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [activeDocSection, setActiveDocSection] = useState("getting-started");

  // Add these helper functions
  const formatTrendData = (trend) => {
    return trend.map((value, index) => ({
      time: `T${index + 1}`,
      value: value
    }));
  };

  const formatPathwayData = (pathways) => {
    return pathways.map(pathway => ({
      name: pathway.name,
      value: pathway.enrichment * 100
    }));
  };

  const formatScatterData = (genes) => {
    return genes.map(gene => ({
      x: gene.expression * 100,
      y: gene.trend[gene.trend.length - 1] * 100,
      name: gene.name
    }));
  };

  // Add this function to get time-based data
  const getTimeBasedData = (timeRange) => {
    return timeBasedData[timeRange] || timeBasedData["1m"];
  };

  const handleReportClick = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowReport(true);
  };

  const handleVisualizeClick = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowVisualize(true);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Prepare data based on selected options
      const exportData = {
        format: exportFormat,
        timeRange: timeRange,
        timestamp: new Date().toISOString(),
        analyses: analysisTimeData[timeRange].analyses.map(analysis => ({
          name: analysis.name,
          date: analysis.date,
          genes: analysis.genes,
          pathways: analysis.pathways,
          trend: analysis.trend,
          correlation: analysis.correlation,
          details: exportOptions.includeStats ? analysis.details : undefined
        }))
      };

      // Convert data to selected format
      let dataString;
      let mimeType;
      let fileExtension;

      switch (exportFormat) {
        case 'csv':
          dataString = convertToCSV(exportData);
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        case 'json':
          dataString = JSON.stringify(exportData, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        case 'excel':
          dataString = convertToExcel(exportData);
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          fileExtension = 'xlsx';
          break;
      }

      // Create and trigger download
      const blob = new Blob([dataString], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gene-expression-analysis-${new Date().toISOString()}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
      setShowExport(false);
    }
  };

  const handleShare = async (platform) => {
    try {
      const shareUrl = `https://gene-expression-explorer.com/share/analysis-${selectedAnalysis?.id}`;
      const shareText = shareMessage || `Check out this gene expression analysis: ${selectedAnalysis?.name}`;

      switch (platform) {
        case 'copy':
          await copyToClipboard(shareUrl);
          toast.success('Link copied to clipboard');
          break;
        case 'email':
          window.location.href = `mailto:?subject=Gene Expression Analysis&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
          break;
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share analysis');
    }
  };

  const convertToCSV = (data) => {
    const headers = ['Analysis Name', 'Date', 'Genes', 'Pathways', 'Correlation'];
    const rows = data.analyses.map(analysis => [
      analysis.name,
      analysis.date,
      analysis.genes,
      analysis.pathways,
      analysis.correlation
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const convertToExcel = (data) => {
    // This is a simplified version. In a real application, you would use a library like xlsx
    return convertToCSV(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expression Lab</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Upload Data
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowExport(true)}
          >
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowShare(true)}
          >
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowDocs(true)}
          >
            <Info className="h-4 w-4" /> Documentation
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analyses">Analyses</TabsTrigger>
          <TabsTrigger value="genes">Genes</TabsTrigger>
          <TabsTrigger value="pathways">Pathways</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" /> Recent Analyses
                </CardTitle>
                <CardDescription>Latest gene expression analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geneExpressionData.recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{analysis.name}</span>
                        <Badge variant={analysis.status === "completed" ? "default" : "destructive"}>
                          {analysis.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>Date: {analysis.date}</div>
                        <div>Genes: {analysis.genes}</div>
                        <div>Pathways: {analysis.pathways}</div>
                        {analysis.correlation > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span>Correlation</span>
                              <span>{analysis.correlation}</span>
                            </div>
                            <Progress value={analysis.correlation * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5" /> Top Genes
                </CardTitle>
                <CardDescription>Most significant gene expressions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geneExpressionData.topGenes.map((gene, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{gene.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({gene.function})</span>
                        </div>
                        <Badge variant={gene.status === "upregulated" ? "default" : "destructive"}>
                          {gene.status}
                        </Badge>
                      </div>
                      <Progress value={gene.expression * 100} className="h-2" />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>Trend: {gene.trend[gene.trend.length - 1] - gene.trend[0] > 0 ? "↑" : "↓"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" /> Active Pathways
                </CardTitle>
                <CardDescription>Biological pathways analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geneExpressionData.pathways.map((pathway, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">{pathway.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({pathway.genes} genes)</span>
                        </div>
                        <Badge variant="outline">Enrichment: {pathway.enrichment}</Badge>
                      </div>
                      <Progress value={pathway.enrichment * 100} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" /> Expression Trends
              </CardTitle>
              <CardDescription>Gene expression trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={formatTrendData(getTimeBasedData(timeRange).topGenes[0].trend)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Trend Analysis</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      This graph shows the expression trend of the TP53 gene over the selected time period.
                      The trend indicates:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Strong upregulation pattern</li>
                      <li>Consistent growth in expression levels</li>
                      <li>High stability in recent measurements</li>
                    </ul>
                    <p className="mt-2">
                      The selected time range ({timeRange}) shows:
                      {timeRange === "1w" && " Recent gene expression stability"}
                      {timeRange === "1m" && " Monthly progression of expression"}
                      {timeRange === "3m" && " Quarterly growth patterns"}
                      {timeRange === "6m" && " Long-term expression evolution"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Complete history of gene expression analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1w">Last Week</SelectItem>
                        <SelectItem value="1m">Last Month</SelectItem>
                        <SelectItem value="3m">Last 3 Months</SelectItem>
                        <SelectItem value="6m">Last 6 Months</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search analyses..." className="pl-8 max-w-sm" />
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Export Data
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {analysisTimeData[timeRange].analyses.map((analysis) => (
                    <div key={analysis.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{analysis.name}</h3>
                          <p className="text-sm text-muted-foreground">Analyzed on {analysis.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleReportClick(analysis)}
                          >
                            <FileText className="h-4 w-4" /> Report
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleVisualizeClick(analysis)}
                          >
                            <BarChart2 className="h-4 w-4" /> Visualize
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span className="ml-2 font-medium capitalize">{analysis.status}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Genes Analyzed:</span>
                          <span className="ml-2 font-medium">{analysis.genes}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pathways Identified:</span>
                          <span className="ml-2 font-medium">{analysis.pathways}</span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Expression Trend</span>
                          <Badge variant="outline">
                            {analysis.trend[analysis.trend.length - 1] - analysis.trend[0] > 0 ? "↑" : "↓"}
                          </Badge>
                        </div>
                        <div className="h-[100px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart
                              data={formatTrendData(analysis.trend)}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Upregulated:</span>
                            <span className="ml-2 font-medium text-green-600">{analysis.details.upregulated}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Downregulated:</span>
                            <span className="ml-2 font-medium text-red-600">{analysis.details.downregulated}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Stable:</span>
                            <span className="ml-2 font-medium text-blue-600">{analysis.details.stable}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.details.topPathways.map((pathway, index) => (
                            <Badge key={index} variant="secondary">{pathway}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gene Expression Analysis</CardTitle>
              <CardDescription>Detailed view of gene expression patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1w">Last Week</SelectItem>
                      <SelectItem value="1m">Last Month</SelectItem>
                      <SelectItem value="3m">Last 3 Months</SelectItem>
                      <SelectItem value="6m">Last 6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search genes..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Expression Threshold:</span>
                    <Slider
                      value={expressionThreshold}
                      onValueChange={setExpressionThreshold}
                      max={1}
                      step={0.1}
                      className="w-[200px]"
                    />
                    <span className="text-sm text-muted-foreground">{expressionThreshold[0]}</span>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Analysis in Progress</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          Your gene expression analysis is being processed. This may take up to 24 hours to complete.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-medium">Key Findings</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>TP53 shows strong upregulation, indicating active tumor suppression</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>DNA repair pathways show moderate activation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Cell cycle regulation genes demonstrate stable expression</span>
                      </li>
                    </ul>
                  </div>

                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Expression" unit="%" />
                        <YAxis type="number" dataKey="y" name="Trend" unit="%" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter 
                          name="Genes" 
                          data={formatScatterData(getTimeBasedData(timeRange).topGenes)} 
                          fill="#8884d8" 
                        />
                      </RechartsScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pathways" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Biological Pathways</CardTitle>
              <CardDescription>Analysis of gene expression pathways</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1w">Last Week</SelectItem>
                      <SelectItem value="1m">Last Month</SelectItem>
                      <SelectItem value="3m">Last 3 Months</SelectItem>
                      <SelectItem value="6m">Last 6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search pathways..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    {geneExpressionData.pathways.map((pathway, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{pathway.name}</h3>
                            <p className="text-sm text-muted-foreground">{pathway.genes} genes involved</p>
                          </div>
                          <Badge variant="outline">Enrichment: {pathway.enrichment}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium capitalize">{pathway.status}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Genes:</span>
                            <span className="font-medium">{pathway.genes}</span>
                          </div>
                          <Progress value={pathway.enrichment * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={formatPathwayData(getTimeBasedData(timeRange).pathways)}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {formatPathwayData(getTimeBasedData(timeRange).pathways).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Pathway Analysis</h3>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>
                          This pie chart shows the distribution of pathway enrichments.
                          Key insights:
                        </p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Cell Cycle Regulation shows highest enrichment</li>
                          <li>Balanced distribution across pathways</li>
                          <li>Strong correlation with gene expression patterns</li>
                        </ul>
                        <p className="mt-2">
                          Time period context ({timeRange}):
                          {timeRange === "1w" && " Shows current pathway activation"}
                          {timeRange === "1m" && " Reveals monthly pathway patterns"}
                          {timeRange === "3m" && " Indicates pathway stability"}
                          {timeRange === "6m" && " Shows long-term pathway evolution"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Report Dialog */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Analysis Report: {selectedAnalysis?.name}</DialogTitle>
            <DialogDescription>
              Detailed report for analysis performed on {selectedAnalysis?.date}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium mb-2">Analysis Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Genes:</span>
                      <span className="font-medium">{selectedAnalysis?.genes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pathways:</span>
                      <span className="font-medium">{selectedAnalysis?.pathways}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Correlation:</span>
                      <span className="font-medium">{selectedAnalysis?.correlation}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Gene Regulation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upregulated:</span>
                      <span className="font-medium text-green-600">{selectedAnalysis?.details.upregulated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downregulated:</span>
                      <span className="font-medium text-red-600">{selectedAnalysis?.details.downregulated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stable:</span>
                      <span className="font-medium text-blue-600">{selectedAnalysis?.details.stable}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Top Pathways</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnalysis?.details.topPathways.map((pathway, index) => (
                      <Badge key={index} variant="secondary">{pathway}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Expression Trend</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={selectedAnalysis ? formatTrendData(selectedAnalysis.trend) : []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Detailed Statistics</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Expression Level</TableCell>
                      <TableCell>{selectedAnalysis?.trend[selectedAnalysis.trend.length - 1]}</TableCell>
                      <TableCell>
                        <Badge variant={selectedAnalysis?.trend[selectedAnalysis.trend.length - 1] > 0.7 ? "default" : "secondary"}>
                          {selectedAnalysis?.trend[selectedAnalysis.trend.length - 1] > 0.7 ? "High" : "Normal"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Trend Direction</TableCell>
                      <TableCell>
                        {selectedAnalysis?.trend[selectedAnalysis.trend.length - 1] - selectedAnalysis?.trend[0] > 0 ? "↑" : "↓"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={selectedAnalysis?.trend[selectedAnalysis.trend.length - 1] - selectedAnalysis?.trend[0] > 0 ? "default" : "destructive"}>
                          {selectedAnalysis?.trend[selectedAnalysis.trend.length - 1] - selectedAnalysis?.trend[0] > 0 ? "Increasing" : "Decreasing"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Correlation Strength</TableCell>
                      <TableCell>{selectedAnalysis?.correlation}</TableCell>
                      <TableCell>
                        <Badge variant={selectedAnalysis?.correlation > 0.8 ? "default" : "secondary"}>
                          {selectedAnalysis?.correlation > 0.8 ? "Strong" : "Moderate"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Add Visualize Dialog */}
      <Dialog open={showVisualize} onOpenChange={setShowVisualize}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Visualization: {selectedAnalysis?.name}</DialogTitle>
            <DialogDescription>
              Interactive visualizations for analysis performed on {selectedAnalysis?.date}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <Tabs defaultValue="trends" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trends">Expression Trends</TabsTrigger>
                  <TabsTrigger value="distribution">Gene Distribution</TabsTrigger>
                  <TabsTrigger value="pathways">Pathway Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="trends" className="space-y-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={selectedAnalysis ? formatTrendData(selectedAnalysis.trend) : []}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="distribution" className="space-y-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Upregulated', value: selectedAnalysis?.details.upregulated },
                            { name: 'Downregulated', value: selectedAnalysis?.details.downregulated },
                            { name: 'Stable', value: selectedAnalysis?.details.stable }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#4CAF50" />
                          <Cell fill="#F44336" />
                          <Cell fill="#2196F3" />
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="pathways" className="space-y-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={selectedAnalysis?.details.topPathways.map((pathway, index) => ({
                          name: pathway,
                          value: Math.random() * 100 // Mock data for visualization
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExport} onOpenChange={setShowExport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export Analysis Data</DialogTitle>
            <DialogDescription>
              Choose export format and select data to include
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Export Format</h4>
              <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="csv" id="csv" className="peer sr-only" />
                  <Label
                    htmlFor="csv"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-3 h-6 w-6"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    CSV
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="json" id="json" className="peer sr-only" />
                  <Label
                    htmlFor="json"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-3 h-6 w-6"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    JSON
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="excel" id="excel" className="peer sr-only" />
                  <Label
                    htmlFor="excel"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-3 h-6 w-6"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Excel
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Data to Include</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeGenes" 
                    checked={exportOptions.includeGenes}
                    onCheckedChange={(checked) => 
                      setExportOptions(prev => ({ ...prev, includeGenes: checked === true }))
                    }
                  />
                  <Label htmlFor="includeGenes">Gene Expression Data</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includePathways" 
                    checked={exportOptions.includePathways}
                    onCheckedChange={(checked) => 
                      setExportOptions(prev => ({ ...prev, includePathways: checked === true }))
                    }
                  />
                  <Label htmlFor="includePathways">Pathway Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeTrends" 
                    checked={exportOptions.includeTrends}
                    onCheckedChange={(checked) => 
                      setExportOptions(prev => ({ ...prev, includeTrends: checked === true }))
                    }
                  />
                  <Label htmlFor="includeTrends">Expression Trends</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeStats" 
                    checked={exportOptions.includeStats}
                    onCheckedChange={(checked) => 
                      setExportOptions(prev => ({ ...prev, includeStats: checked === true }))
                    }
                  />
                  <Label htmlFor="includeStats">Statistical Analysis</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowExport(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShare} onOpenChange={setShowShare}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Analysis</DialogTitle>
            <DialogDescription>
              Share your analysis results with others
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shareLink">Share Link</Label>
                <div className="flex gap-2">
                  <Input 
                    id="shareLink" 
                    value={`https://gene-expression-explorer.com/share/analysis-${selectedAnalysis?.id}`}
                    readOnly 
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleShare('copy')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Share via</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={() => handleShare('email')}
                  >
                    <Mail className="h-4 w-4" /> Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="h-4 w-4" /> Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shareMessage">Message (optional)</Label>
                <Textarea 
                  id="shareMessage" 
                  placeholder="Add a message to your share..."
                  className="h-20"
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowShare(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleShare('copy')}>
                Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Documentation Dialog */}
      <Dialog open={showDocs} onOpenChange={setShowDocs}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Documentation</DialogTitle>
            <DialogDescription>
              Comprehensive guide to using the Gene Expression Explorer
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <Tabs 
                defaultValue="getting-started" 
                className="w-full"
                value={activeDocSection}
                onValueChange={setActiveDocSection}
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="export">Export & Share</TabsTrigger>
                </TabsList>

                <TabsContent value="getting-started" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Welcome to Gene Expression Explorer</h3>
                    <p className="text-muted-foreground">
                      The Gene Expression Explorer is a powerful tool for analyzing and visualizing gene expression data.
                      This guide will help you get started with the basic features and advanced capabilities.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Quick Start Guide</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ol className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="font-medium">1.</span>
                              <span>Upload your gene expression data using the Upload button in the top right</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium">2.</span>
                              <span>Select your desired time range for analysis (1w, 1m, 3m, 6m)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium">3.</span>
                              <span>Navigate through different tabs to explore various aspects of your data</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium">4.</span>
                              <span>Use the visualization tools to create meaningful insights</span>
                            </li>
                          </ol>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Key Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <Microscope className="h-4 w-4 mt-0.5" />
                              <span>Real-time gene expression analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Activity className="h-4 w-4 mt-0.5" />
                              <span>Pathway enrichment analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <LineChart className="h-4 w-4 mt-0.5" />
                              <span>Interactive visualizations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Share2 className="h-4 w-4 mt-0.5" />
                              <span>Easy sharing and collaboration</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h4>Data Requirements</h4>
                      <div className="grid gap-4 md:grid-cols-3 mt-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Supported Formats</h5>
                          <ul className="text-sm space-y-1">
                            <li>• CSV files</li>
                            <li>• Excel spreadsheets</li>
                            <li>• JSON data</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Required Fields</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Gene identifiers</li>
                            <li>• Expression values</li>
                            <li>• Sample information</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Data Size</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Max file size: 100MB</li>
                            <li>• Max genes: 50,000</li>
                            <li>• Max samples: 1,000</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Analysis Features</h3>
                    <p className="text-muted-foreground">
                      Comprehensive tools for analyzing gene expression data and identifying significant patterns.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Time Range Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">1 Week Analysis</h5>
                              <p className="text-sm text-muted-foreground">
                                Short-term expression changes and immediate responses
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">1 Month Analysis</h5>
                              <p className="text-sm text-muted-foreground">
                                Monthly trends and pattern identification
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">3 Months Analysis</h5>
                              <p className="text-sm text-muted-foreground">
                                Quarterly analysis for medium-term changes
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">6 Months Analysis</h5>
                              <p className="text-sm text-muted-foreground">
                                Long-term expression evolution and stability
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Analysis Methods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Differential Expression</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Fold change calculation</li>
                                <li>• Statistical significance</li>
                                <li>• Multiple testing correction</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Pathway Analysis</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Gene set enrichment</li>
                                <li>• Pathway mapping</li>
                                <li>• Functional annotation</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h4>Statistical Methods</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Method</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Use Case</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>t-test</TableCell>
                            <TableCell>Compare expression between groups</TableCell>
                            <TableCell>Differential expression</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>ANOVA</TableCell>
                            <TableCell>Multiple group comparison</TableCell>
                            <TableCell>Time series analysis</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Correlation</TableCell>
                            <TableCell>Measure gene relationships</TableCell>
                            <TableCell>Co-expression networks</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visualization" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Visualization Tools</h3>
                    <p className="text-muted-foreground">
                      Interactive and customizable visualizations to explore your gene expression data.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Chart Types</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Line Charts</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Expression trends over time</li>
                                <li>• Multiple gene comparison</li>
                                <li>• Interactive tooltips</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Heatmaps</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Gene expression patterns</li>
                                <li>• Sample clustering</li>
                                <li>• Color-coded values</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Scatter Plots</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Correlation analysis</li>
                                <li>• Gene-gene relationships</li>
                                <li>• Interactive selection</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Interactive Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Zoom & Pan</h5>
                              <p className="text-sm text-muted-foreground">
                                Explore detailed regions of your data with intuitive zoom controls
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Data Filtering</h5>
                              <p className="text-sm text-muted-foreground">
                                Filter and highlight specific genes or samples
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Export Options</h5>
                              <p className="text-sm text-muted-foreground">
                                Save visualizations in various formats (PNG, SVG, PDF)
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h4>Visualization Best Practices</h4>
                      <div className="grid gap-4 md:grid-cols-3 mt-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Color Selection</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Use colorblind-friendly palettes</li>
                            <li>• Maintain consistency</li>
                            <li>• Highlight important data</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Layout</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Clear labels and titles</li>
                            <li>• Appropriate scaling</li>
                            <li>• Balanced composition</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Interactivity</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Intuitive controls</li>
                            <li>• Responsive design</li>
                            <li>• Clear feedback</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Export and Share</h3>
                    <p className="text-muted-foreground">
                      Share your findings and export data in various formats for further analysis.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Export Formats</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">CSV Format</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Comma-separated values</li>
                                <li>• Compatible with Excel</li>
                                <li>• Lightweight and fast</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">JSON Format</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Structured data format</li>
                                <li>• Programmatic access</li>
                                <li>• API integration</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Excel Format</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Multiple sheets</li>
                                <li>• Formatted tables</li>
                                <li>• Charts included</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Sharing Options</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Direct Sharing</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Generate shareable links</li>
                                <li>• Email integration</li>
                                <li>• Social media sharing</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Collaboration</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Team access control</li>
                                <li>• Comment and annotate</li>
                                <li>• Version history</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Embedding</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Website integration</li>
                                <li>• Presentation slides</li>
                                <li>• Reports and papers</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h4>Export Best Practices</h4>
                      <div className="grid gap-4 md:grid-cols-3 mt-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Data Organization</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Clear file naming</li>
                            <li>• Structured folders</li>
                            <li>• Metadata included</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Format Selection</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Choose appropriate format</li>
                            <li>• Consider file size</li>
                            <li>• Check compatibility</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Sharing Security</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Access control</li>
                            <li>• Data encryption</li>
                            <li>• Privacy settings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lab; 