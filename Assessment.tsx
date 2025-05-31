import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download,
  Share2,
  Info,
  AlertCircle,
  TrendingUp,
  Activity,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from 'lucide-react';

// Mock data for gene expression assessment
const mockAssessmentData = {
  expressionLevels: [
    { gene: 'GENE1', control: 2.5, treatment: 4.2, disease: 3.1 },
    { gene: 'GENE2', control: 3.1, treatment: 3.8, disease: 2.9 },
    { gene: 'GENE3', control: 2.8, treatment: 5.1, disease: 4.2 },
    { gene: 'GENE4', control: 3.5, treatment: 3.9, disease: 3.7 },
    { gene: 'GENE5', control: 2.9, treatment: 4.5, disease: 3.3 },
  ],
  tissueDistribution: [
    { tissue: 'Liver', value: 35 },
    { tissue: 'Heart', value: 25 },
    { tissue: 'Brain', value: 20 },
    { tissue: 'Kidney', value: 15 },
    { tissue: 'Lung', value: 5 },
  ],
  timeSeries: [
    { time: '0h', expression: 2.5 },
    { time: '6h', expression: 3.2 },
    { time: '12h', expression: 4.1 },
    { time: '18h', expression: 3.8 },
    { time: '24h', expression: 3.5 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Add explanation content
const assessmentExplanation = {
  overview: {
    title: "About Expression Assessment",
    description: "The Expression Assessment page provides comprehensive tools for analyzing and interpreting gene expression data. This page helps researchers and scientists understand patterns, trends, and significant changes in gene expression across different conditions, tissues, and time points.",
    features: [
      {
        title: "Expression Analysis",
        description: "Analyze gene expression levels across different conditions (control, treatment, disease) to identify significant changes and patterns."
      },
      {
        title: "Temporal Analysis",
        description: "Track gene expression changes over time to understand dynamic responses and temporal patterns in gene regulation."
      },
      {
        title: "Spatial Distribution",
        description: "Examine tissue-specific expression patterns to understand where and how genes are expressed across different tissues."
      }
    ]
  },
  metrics: {
    title: "Key Metrics Explained",
    items: [
      {
        title: "Expression Level",
        description: "The average expression level of selected genes, normalized across all conditions. Higher values indicate stronger gene expression."
      },
      {
        title: "Significant Changes",
        description: "Number of genes showing statistically significant changes in expression (p-value < 0.05) across conditions."
      },
      {
        title: "Tissue Specificity",
        description: "Measure of how specific a gene's expression is to particular tissues. High specificity indicates tissue-restricted expression."
      }
    ]
  },
  interpretation: {
    title: "How to Interpret Results",
    steps: [
      {
        title: "1. Overview Analysis",
        description: "Start with the overview tab to compare expression levels across different conditions. Look for significant differences between control and treatment groups."
      },
      {
        title: "2. Temporal Patterns",
        description: "Use the temporal analysis to understand how gene expression changes over time. Identify peak expression times and response patterns."
      },
      {
        title: "3. Tissue Distribution",
        description: "Examine the spatial distribution to understand tissue-specific expression patterns and identify tissues with highest expression levels."
      }
    ]
  }
};

const Assessment: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedGene, setSelectedGene] = useState('GENE1');
  const [selectedTissue, setSelectedTissue] = useState('Liver');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expression Assessment</h1>
          <p className="text-muted-foreground mt-1">
            Analyze and evaluate gene expression patterns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Analysis
          </Button>
        </div>
      </div>

      {/* Explanation Section */}
      <Card>
        <CardHeader>
          <CardTitle>{assessmentExplanation.overview.title}</CardTitle>
          <CardDescription>
            {assessmentExplanation.overview.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assessmentExplanation.overview.features.map((feature, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>{assessmentExplanation.metrics.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assessmentExplanation.metrics.items.map((item, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expression Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">
              Average expression level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Significant Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Genes with significant changes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tissue Specificity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <p className="text-xs text-muted-foreground">
              Expression specificity score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart2 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="temporal">
            <LineChartIcon className="mr-2 h-4 w-4" />
            Temporal
          </TabsTrigger>
          <TabsTrigger value="spatial">
            <PieChartIcon className="mr-2 h-4 w-4" />
            Spatial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Expression Overview</CardTitle>
              <CardDescription>
                Comparative analysis of gene expression across conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAssessmentData.expressionLevels}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="gene" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="control" fill="#8884d8" />
                    <Bar dataKey="treatment" fill="#82ca9d" />
                    <Bar dataKey="disease" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temporal">
          <Card>
            <CardHeader>
              <CardTitle>Temporal Analysis</CardTitle>
              <CardDescription>
                Gene expression changes over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAssessmentData.timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="expression"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spatial">
          <Card>
            <CardHeader>
              <CardTitle>Spatial Distribution</CardTitle>
              <CardDescription>
                Tissue-specific expression patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockAssessmentData.tissueDistribution}
                      dataKey="value"
                      nameKey="tissue"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      label
                    >
                      {mockAssessmentData.tissueDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Interpretation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>{assessmentExplanation.interpretation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessmentExplanation.interpretation.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
            <CardDescription>
              Important insights from the analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Expression Pattern</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong upregulation observed in treatment conditions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Temporal Dynamics</h3>
                  <p className="text-sm text-muted-foreground">
                    Peak expression observed at 12 hours post-treatment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <AlertCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Significance</h3>
                  <p className="text-sm text-muted-foreground">
                    p-value &lt; 0.001 for treatment response
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Suggested next steps based on analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Further Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Consider pathway analysis to understand gene interactions
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Verify findings with additional samples
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Follow-up</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor expression changes in related genes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment; 