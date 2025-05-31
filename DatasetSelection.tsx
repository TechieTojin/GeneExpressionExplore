import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Upload,
  Search,
  Filter,
  Database,
  FileText,
  BarChart2,
  Download,
  Info,
  Tag,
  Users,
  Calendar,
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  Share2,
  Star,
  Bookmark,
  BarChart3,
  LineChart,
  PieChart,
  Table,
  RefreshCw,
  Dna,
} from "lucide-react";
import {
  BarChart,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Slider,
} from "@/components/ui/slider";
import {
  Checkbox,
} from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for datasets
const mockDatasets: Dataset[] = [
  {
    id: "GSE12345",
    name: "Breast Cancer Gene Expression",
    description: "Comprehensive gene expression analysis of breast cancer subtypes using RNA-seq data from 500 patients.",
    category: "Cancer",
    tags: ["breast-cancer", "rna-seq", "clinical"],
    size: "2.5GB",
    samples: 500,
    genes: 25000,
    lastUpdated: "2024-03-15",
    status: "verified",
    format: "RNA-seq",
    platform: "Illumina NovaSeq",
    citations: 156,
    organism: "Homo sapiens",
    preview: {
      expressionMatrix: [
        { gene: "BRCA1", expression: 0.85 },
        { gene: "BRCA2", expression: 0.92 },
        { gene: "TP53", expression: 0.78 },
        { gene: "HER2", expression: 0.45 }
      ],
      metadata: {
        age: "45-65",
        gender: "Female",
        stage: "I-III"
      }
    }
  },
  {
    id: "GSE67890",
    name: "Alzheimer's Disease Brain Transcriptome",
    description: "Single-cell RNA sequencing of brain tissue from Alzheimer's patients and controls.",
    category: "Neurodegenerative",
    tags: ["alzheimers", "single-cell", "brain"],
    size: "4.2GB",
    samples: 1200,
    genes: 30000,
    lastUpdated: "2024-02-28",
    status: "verified",
    format: "scRNA-seq",
    platform: "10x Genomics",
    citations: 89,
    organism: "Homo sapiens",
    preview: {
      expressionMatrix: [
        { gene: "APP", expression: 0.65 },
        { gene: "PSEN1", expression: 0.72 },
        { gene: "MAPT", expression: 0.88 },
        { gene: "APOE", expression: 0.91 }
      ],
      metadata: {
        age: "60-85",
        gender: "Both",
        stage: "Early-Late"
      }
    }
  },
  {
    id: "GSE24680",
    name: "COVID-19 Immune Response",
    description: "Bulk RNA-seq analysis of immune cells from COVID-19 patients at different disease stages.",
    category: "Infectious Disease",
    tags: ["covid19", "immune", "bulk-rna"],
    size: "1.8GB",
    samples: 300,
    genes: 20000,
    lastUpdated: "2024-01-15",
    status: "verified",
    format: "RNA-seq",
    platform: "Illumina NextSeq",
    citations: 234,
    organism: "Homo sapiens",
    preview: {
      expressionMatrix: [
        { gene: "ACE2", expression: 0.82 },
        { gene: "TMPRSS2", expression: 0.75 },
        { gene: "IFNAR1", expression: 0.68 },
        { gene: "IL6", expression: 0.92 }
      ],
      metadata: {
        age: "18-75",
        gender: "Both",
        stage: "Acute-Recovery"
      }
    }
  },
  {
    id: "GSE98765",
    name: "Diabetes Pancreatic Islets",
    description: "Single-cell transcriptomics of pancreatic islets from type 2 diabetes patients.",
    category: "Metabolic",
    tags: ["diabetes", "pancreas", "single-cell"],
    size: "3.1GB",
    samples: 800,
    genes: 28000,
    lastUpdated: "2024-03-01",
    status: "verified",
    format: "scRNA-seq",
    platform: "10x Genomics",
    citations: 112,
    organism: "Homo sapiens",
    preview: {
      expressionMatrix: [
        { gene: "INS", expression: 0.45 },
        { gene: "GCG", expression: 0.62 },
        { gene: "SST", expression: 0.58 },
        { gene: "PPY", expression: 0.51 }
      ],
      metadata: {
        age: "30-70",
        gender: "Both",
        stage: "Pre-Diabetes-T2D"
      }
    }
  }
];

const categories = [
  "All",
  "Human",
  "Mouse",
  "Cancer",
  "Development",
  "Disease",
  "Tissue",
  "Cell Lines",
];

// Add color constants for visualizations
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Add mock visualization data
const generateVisualizationData = (dataset: any) => {
  const expressionData = dataset.preview.expressionMatrix.slice(1).map((row: string[]) => ({
    gene: row[0],
    ...Object.fromEntries(
      dataset.preview.expressionMatrix[0].slice(1).map((header: string, i: number) => [
        header,
        parseFloat(row[i + 1])
      ])
    )
  }));

  const correlationData = expressionData.map((row: any) => ({
    gene: row.gene,
    correlation: Math.random() * 0.8 + 0.2,
  }));

  const distributionData = expressionData.map((row: any) => {
    const values = Object.values(row).slice(1) as number[];
    return {
      gene: row.gene,
      expression: values.reduce((a, b) => a + b, 0) / values.length,
    };
  });

  const clusterData = dataset.preview.expressionMatrix[0].slice(1).map((sample: string) => ({
    name: sample,
    value: Math.random() * 100,
  }));

  return {
    expressionData,
    correlationData,
    distributionData,
    clusterData,
  };
};

// Add filter types
interface FilterOptions {
  sizeRange: [number, number];
  samplesRange: [number, number];
  genesRange: [number, number];
  platforms: string[];
  formats: string[];
  dateRange: [Date, Date];
  organisms: string[];
}

// Add file validation types
interface FileValidation {
  maxSize: number; // in bytes
  allowedFormats: string[];
  requiredFields: string[];
}

const fileValidation: FileValidation = {
  maxSize: 5 * 1024 * 1024 * 1024, // 5GB
  allowedFormats: ['.csv', '.tsv', '.txt', '.rds', '.h5'],
  requiredFields: ['gene_id', 'sample_id', 'expression_value'],
};

// Add platforms and formats
const platforms = [
  "Illumina HiSeq",
  "10x Genomics",
  "Affymetrix",
  "Agilent",
  "NanoString",
];

const formats = [
  "CSV",
  "TSV",
  "HDF5",
  "RDS",
  "TXT",
];

const organisms = [
  "Homo sapiens",
  "Mus musculus",
  "Rattus norvegicus",
  "Drosophila melanogaster",
  "Arabidopsis thaliana",
];

// Add loading states
interface LoadingState {
  isLoading: boolean;
  progress: number;
  message: string;
}

// Add dataset interface
interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  size: string;
  samples: number;
  genes: number;
  lastUpdated: string;
  status: "verified" | "pending" | "error";
  format: string;
  platform: string;
  citations: number;
  organism: string;
  preview: {
    expressionMatrix: Array<{ gene: string; expression: number }>;
    metadata: {
      age: string;
      gender: string;
      stage: string;
    };
  };
}

// Add additional datasets pool
const additionalDatasets: Dataset[] = [
  {
    id: "GSE54321",
    name: "Parkinson's Disease Brain Atlas",
    description: "Single-nucleus RNA sequencing of substantia nigra from Parkinson's disease patients.",
    category: "Neurodegenerative",
    tags: ["parkinsons", "brain", "single-nucleus"],
    size: "3.8GB",
    samples: 950,
    genes: 27000,
    lastUpdated: "2024-03-10",
    status: "verified",
    format: "snRNA-seq",
    platform: "10x Genomics",
    citations: 78,
    organism: "Homo sapiens",
    preview: {
      expressionMatrix: [
        { gene: "SNCA", expression: 0.72 },
        { gene: "PARK2", expression: 0.65 },
        { gene: "LRRK2", expression: 0.58 },
        { gene: "GBA", expression: 0.82 }
      ],
      metadata: {
        age: "55-80",
        gender: "Both",
        stage: "Early-Advanced"
      }
    }
  },
  {
    id: "GSE13579",
    name: "Colorectal Cancer Microbiome",
    description: "Metatranscriptomic analysis of gut microbiome in colorectal cancer patients.",
    category: "Cancer",
    tags: ["colorectal", "microbiome", "metatranscriptomics"],
    size: "2.9GB",
    samples: 450,
    genes: 22000,
    lastUpdated: "2024-02-20",
    status: "verified",
    format: "RNA-seq",
    platform: "Illumina NovaSeq",
    citations: 92,
    organism: "Mixed",
    preview: {
      expressionMatrix: [
        { gene: "Fusobacterium", expression: 0.88 },
        { gene: "Bacteroides", expression: 0.45 },
        { gene: "Prevotella", expression: 0.62 },
        { gene: "Escherichia", expression: 0.75 }
      ],
      metadata: {
        age: "40-75",
        gender: "Both",
        stage: "I-IV"
      }
    }
  },
  {
    id: "GSE87654",
    name: "Cardiac Development Atlas",
    description: "Single-cell transcriptomics of developing heart tissue across developmental stages.",
    category: "Development",
    tags: ["heart", "development", "single-cell"],
    size: "4.5GB",
    samples: 1500,
    genes: 32000,
    lastUpdated: "2024-03-05",
    status: "verified",
    format: "scRNA-seq",
    platform: "10x Genomics",
    citations: 145,
    organism: "Mus musculus",
    preview: {
      expressionMatrix: [
        { gene: "NKX2-5", expression: 0.92 },
        { gene: "GATA4", expression: 0.85 },
        { gene: "TBX5", expression: 0.78 },
        { gene: "MEF2C", expression: 0.88 }
      ],
      metadata: {
        age: "E8.5-E18.5",
        gender: "Both",
        stage: "Embryonic"
      }
    }
  },
  {
    id: "GSE24680",
    name: "Liver Regeneration",
    description: "Bulk RNA-seq analysis of liver tissue during regeneration after partial hepatectomy.",
    category: "Tissue",
    tags: ["liver", "regeneration", "bulk-rna"],
    size: "2.2GB",
    samples: 350,
    genes: 24000,
    lastUpdated: "2024-02-15",
    status: "verified",
    format: "RNA-seq",
    platform: "Illumina NextSeq",
    citations: 67,
    organism: "Mus musculus",
    preview: {
      expressionMatrix: [
        { gene: "PCNA", expression: 0.95 },
        { gene: "MKI67", expression: 0.88 },
        { gene: "CCND1", expression: 0.82 },
        { gene: "CDK4", expression: 0.75 }
      ],
      metadata: {
        age: "8-12 weeks",
        gender: "Both",
        stage: "0-72h post-surgery"
      }
    }
  }
];

// Update mockApiService
const mockApiService = {
  currentIndex: 0,
  
  async fetchDatasets(): Promise<Dataset[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get next 2 datasets from the pool
    const nextDatasets = additionalDatasets.slice(this.currentIndex, this.currentIndex + 2);
    
    // Update index for next time
    this.currentIndex = (this.currentIndex + 2) % additionalDatasets.length;
    
    // Return base datasets plus the next 2
    return [...mockDatasets, ...nextDatasets];
  },

  async uploadDataset(file: File, metadata: any): Promise<Dataset> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      id: Math.random().toString(),
      name: metadata.name,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags || [],
      size: `${(file.size / (1024 * 1024 * 1024)).toFixed(1)}GB`,
      samples: Math.floor(Math.random() * 2000) + 500,
      genes: Math.floor(Math.random() * 30000) + 10000,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: "verified",
      format: file.name.split('.').pop()?.toUpperCase() || "CSV",
      platform: "Illumina HiSeq",
      citations: 0,
      organism: "Homo sapiens",
      preview: {
        expressionMatrix: [
          ["Gene", "Sample1", "Sample2", "Sample3"],
          ["GENE1", "5.2", "6.1", "4.8"],
          ["GENE2", "3.4", "3.2", "3.5"],
          ["GENE3", "7.8", "7.5", "8.1"],
        ],
        metadata: {
          tissue: ["Liver", "Heart", "Brain"],
          condition: ["Control", "Disease", "Control"],
          age: [45, 52, 38],
        },
      },
    };
  },
};

const DatasetSelection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sizeRange: [0, 5],
    samplesRange: [0, 5000],
    genesRange: [0, 50000],
    platforms: [],
    formats: [],
    dateRange: [new Date(2020, 0, 1), new Date()],
    organisms: [],
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    message: "",
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'samples' | 'genes'>('date');

  // Load datasets on component mount
  useEffect(() => {
    loadDatasets();
  }, []);

  // Load datasets function
  const loadDatasets = async () => {
    try {
      setLoading({
        isLoading: true,
        progress: 0,
        message: "Loading datasets...",
      });

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoading(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 200);

      const data = await mockApiService.fetchDatasets();
      
      clearInterval(progressInterval);
      
      setDatasets(data);
      setLoading({
        isLoading: false,
        progress: 100,
        message: "Datasets loaded successfully",
      });

      // Show success message
      toast.success("Datasets loaded successfully");
    } catch (error) {
      setLoading({
        isLoading: false,
        progress: 0,
        message: "Error loading datasets",
      });
      toast.error("Failed to load datasets");
    }
  };

  // Add click handler for the Load Datasets button
  const handleLoadDatasets = () => {
    loadDatasets();
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!uploadFile) return;

    setLoading({
      isLoading: true,
      progress: 0,
      message: "Uploading dataset...",
    });

    try {
      const newDataset = await mockApiService.uploadDataset(uploadFile, {
        name: "New Dataset",
        description: "Description of the new dataset",
        category: "Human",
        tags: ["RNA-seq", "Tissue", "Disease"],
      });
      setDatasets(prev => [...prev, newDataset]);
      setLoading({
        isLoading: false,
        progress: 100,
        message: "Dataset uploaded successfully",
      });
      setShowUploadDialog(false);
      toast.success("Dataset uploaded successfully");
    } catch (error) {
      setLoading({
        isLoading: false,
        progress: 0,
        message: "Error uploading dataset",
      });
      toast.error("Failed to upload dataset");
    }
  };

  const handleDatasetSelect = (dataset: Dataset) => {
    if (selectedDatasets.includes(dataset.id)) {
      setSelectedDatasets(selectedDatasets.filter(id => id !== dataset.id));
    } else {
      setSelectedDatasets([...selectedDatasets, dataset.id]);
    }
    setSelectedDataset(dataset);
    setShowPreviewDialog(true);
  };

  // Add filter handlers
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Add file validation
  const validateFile = (file: File): boolean => {
    setUploadError(null);
    
    // Check file size
    if (file.size > fileValidation.maxSize) {
      setUploadError(`File size exceeds maximum limit of ${fileValidation.maxSize / (1024 * 1024 * 1024)}GB`);
      return false;
    }

    // Check file format
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!fileValidation.allowedFormats.includes(`.${extension}`)) {
      setUploadError(`File format not supported. Allowed formats: ${fileValidation.allowedFormats.join(', ')}`);
      return false;
    }

    return true;
  };

  // Add file upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setUploadFile(file);
        setUploadError(null);
      }
    }
  };

  // Update filtered datasets
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dataset.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every((tag) => dataset.tags.includes(tag));
    
    // Add advanced filters
    const size = parseFloat(dataset.size);
    const matchesSize = size >= filters.sizeRange[0] && size <= filters.sizeRange[1];
    const matchesSamples = dataset.samples >= filters.samplesRange[0] && 
      dataset.samples <= filters.samplesRange[1];
    const matchesGenes = dataset.genes >= filters.genesRange[0] && 
      dataset.genes <= filters.genesRange[1];
    const matchesPlatform = filters.platforms.length === 0 || 
      filters.platforms.includes(dataset.platform);
    const matchesFormat = filters.formats.length === 0 || 
      filters.formats.includes(dataset.format);
    const matchesOrganism = filters.organisms.length === 0 ||
      filters.organisms.includes(dataset.organism);
    const datasetDate = new Date(dataset.lastUpdated);
    const matchesDate = datasetDate >= filters.dateRange[0] && 
      datasetDate <= filters.dateRange[1];

    return matchesSearch && matchesCategory && matchesTags && matchesSize && 
      matchesSamples && matchesGenes && matchesPlatform && matchesFormat && matchesDate && matchesOrganism;
  });

  // Add batch actions
  const handleBatchAction = (action: 'download' | 'compare' | 'delete') => {
    switch (action) {
      case 'download':
        toast.success(`Downloading ${selectedDatasets.length} datasets...`);
        break;
      case 'compare':
        toast.success(`Comparing ${selectedDatasets.length} datasets...`);
        break;
      case 'delete':
        toast.success(`Deleting ${selectedDatasets.length} datasets...`);
        break;
    }
  };

  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'samples':
        return b.samples - a.samples;
      case 'genes':
        return b.genes - a.genes;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dataset Selection</h1>
          <p className="text-muted-foreground mt-1">
            Browse and select gene expression datasets for analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleLoadDatasets}
            disabled={loading.isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading.isLoading ? 'animate-spin' : ''}`} />
            {loading.isLoading ? 'Loading...' : 'Load Datasets'}
          </Button>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-health-primary to-health-accent">
                <Upload className="mr-2 h-4 w-4" />
                Upload Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Dataset</DialogTitle>
                <DialogDescription>
                  Upload your gene expression dataset for analysis
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Dataset Name</Label>
                  <Input placeholder="Enter dataset name" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Enter dataset description" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags (comma-separated)" />
                </div>
                <div className="space-y-2">
                  <Label>File Upload</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileUpload}
                      accept={fileValidation.allowedFormats.join(',')}
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {uploadFile ? uploadFile.name : "Click to upload or drag and drop"}
                      </span>
                    </Label>
                  </div>
                </div>
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <Label>Upload Progress</Label>
                    <Progress value={uploadProgress} />
                  </div>
                )}
                {uploadError && (
                  <div className="text-sm text-red-500">{uploadError}</div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={!uploadFile || !!uploadError}
                >
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Loading State */}
      {loading.isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Loading</h3>
                <span className="text-sm text-muted-foreground">{loading.message}</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${loading.progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Please wait while we load your datasets...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search datasets by name, description, or tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowFilters(true)}
          >
                <Filter className="mr-2 h-4 w-4" />
            Filters
              </Button>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="samples">Samples</SelectItem>
              <SelectItem value="genes">Genes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dataset Grid/List */}
      {loading.isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{loading.message}</p>
          </div>
        </div>
      ) : datasets.length === 0 ? (
        <div className="text-center py-12">
          <Database className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No datasets found</h3>
          <p className="text-muted-foreground mt-2">
            Upload a dataset or refresh to load existing ones
          </p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedDatasets.map((dataset) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`h-full hover:shadow-lg transition-shadow ${
                selectedDatasets.includes(dataset.id) ? 'ring-2 ring-primary' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedDatasets.includes(dataset.id)}
                          onCheckedChange={() => handleDatasetSelect(dataset)}
                          className="mr-2"
                        />
                        {dataset.name}
                        {dataset.status === "verified" && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {dataset.description}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDatasetSelect(dataset)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Samples
                        </p>
                        <p className="font-medium">{dataset.samples}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Dna className="h-3 w-3" />
                          Genes
                        </p>
                        <p className="font-medium">{dataset.genes}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Updated
                        </p>
                        <p className="font-medium">{dataset.lastUpdated}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          Platform
                        </p>
                        <p className="font-medium">{dataset.platform}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" onClick={() => handleDatasetSelect(dataset)}>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Select
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Advanced Filters Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Filter datasets by various criteria
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Size Range (GB)</Label>
                  <Slider
                    value={filters.sizeRange}
                    onValueChange={(value) => handleFilterChange('sizeRange', value)}
                    min={0}
                    max={5}
                    step={0.1}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{filters.sizeRange[0]}GB</span>
                    <span>{filters.sizeRange[1]}GB</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Number of Samples</Label>
                  <Slider
                    value={filters.samplesRange}
                    onValueChange={(value) => handleFilterChange('samplesRange', value)}
                    min={0}
                    max={5000}
                    step={100}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{filters.samplesRange[0]}</span>
                    <span>{filters.samplesRange[1]}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Number of Genes</Label>
                  <Slider
                    value={filters.genesRange}
                    onValueChange={(value) => handleFilterChange('genesRange', value)}
                    min={0}
                    max={50000}
                    step={1000}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{filters.genesRange[0]}</span>
                    <span>{filters.genesRange[1]}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="space-y-2">
                    {platforms.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform}
                          checked={filters.platforms.includes(platform)}
                          onCheckedChange={(checked) => {
                            const newPlatforms = checked
                              ? [...filters.platforms, platform]
                              : filters.platforms.filter(p => p !== platform);
                            handleFilterChange('platforms', newPlatforms);
                          }}
                        />
                        <Label htmlFor={platform}>{platform}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Formats</Label>
                  <div className="space-y-2">
                    {formats.map((format) => (
                      <div key={format} className="flex items-center space-x-2">
                        <Checkbox
                          id={format}
                          checked={filters.formats.includes(format)}
                          onCheckedChange={(checked) => {
                            const newFormats = checked
                              ? [...filters.formats, format]
                              : filters.formats.filter(f => f !== format);
                            handleFilterChange('formats', newFormats);
                          }}
                        />
                        <Label htmlFor={format}>{format}</Label>
                      </div>
                    ))}
                  </div>
                </div>
            <div className="space-y-2">
              <Label>Organisms</Label>
              <div className="space-y-2">
                {organisms.map((organism) => (
                  <div key={organism} className="flex items-center space-x-2">
                        <Checkbox
                      id={organism}
                      checked={filters.organisms.includes(organism)}
                      onCheckedChange={(checked) => {
                        const newOrganisms = checked
                          ? [...filters.organisms, organism]
                          : filters.organisms.filter(o => o !== organism);
                        handleFilterChange('organisms', newOrganisms);
                      }}
                    />
                    <Label htmlFor={organism}>{organism}</Label>
                    </div>
                      ))}
                    </div>
                      </div>
                      </div>
        </SheetContent>
      </Sheet>

      {/* Dataset Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          {selectedDataset && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedDataset.name}
                  {selectedDataset.status === "verified" && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedDataset.description}
                </DialogDescription>
              </DialogHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="preview">Data Preview</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Format</CardTitle>
                        <CardDescription>{selectedDataset.format}</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Platform</CardTitle>
                        <CardDescription>{selectedDataset.platform}</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Citations</CardTitle>
                        <CardDescription>{selectedDataset.citations}</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Last Updated</CardTitle>
                        <CardDescription>{selectedDataset.lastUpdated}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDataset.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2 text-left bg-muted">Gene</th>
                          <th className="border p-2 text-left bg-muted">Expression</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDataset.preview.expressionMatrix.map((row, index) => (
                          <tr key={index}>
                            <td className="border p-2">{row.gene}</td>
                            <td className="border p-2">{row.expression}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="metadata">
                  <div className="space-y-4">
                    {Object.entries(selectedDataset.preview.metadata).map(([key, value]) => (
                      <Card key={key}>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm capitalize">{key}</CardTitle>
                          <CardDescription>{value}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="visualization">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Expression Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedDataset.preview.expressionMatrix}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="gene" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expression" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Gene Correlation</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={selectedDataset.preview.expressionMatrix}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="gene" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="expression" stroke="#8884d8" />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatasetSelection; 