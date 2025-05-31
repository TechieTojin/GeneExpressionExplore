import React, { useState, useEffect } from 'react';
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  Download,
  Share2,
  TrendingUp,
  Activity,
  AlertCircle,
  Info,
  Search,
  Filter,
  RefreshCw,
  Brain,
  Sparkles,
  Lightbulb,
  Zap,
} from 'lucide-react';

// Enhanced mock data with more realistic patterns
const expressionData = {
  differentialExpression: [
    { gene: 'GENE1', log2FoldChange: 2.5, pValue: 0.001, significance: 'High', predictedFunction: 'Cell Proliferation', confidence: 0.92, expressionPattern: 'Oscillating' },
    { gene: 'GENE2', log2FoldChange: -1.8, pValue: 0.003, significance: 'High', predictedFunction: 'Apoptosis', confidence: 0.88, expressionPattern: 'Gradual' },
    { gene: 'GENE3', log2FoldChange: 1.2, pValue: 0.02, significance: 'Medium', predictedFunction: 'Metabolism', confidence: 0.75, expressionPattern: 'Stable' },
    { gene: 'GENE4', log2FoldChange: -0.8, pValue: 0.05, significance: 'Medium', predictedFunction: 'Signaling', confidence: 0.68, expressionPattern: 'Spike' },
    { gene: 'GENE5', log2FoldChange: 0.5, pValue: 0.1, significance: 'Low', predictedFunction: 'Transport', confidence: 0.62, expressionPattern: 'Cyclic' },
  ],
  pathwayEnrichment: [
    { pathway: 'Cell Cycle', enrichmentScore: 0.85, pValue: 0.001, genes: 15, predictedImpact: 'High', mechanism: 'Cell Division Regulation', biologicalProcess: 'Mitosis' },
    { pathway: 'Apoptosis', enrichmentScore: 0.72, pValue: 0.003, genes: 12, predictedImpact: 'High', mechanism: 'Programmed Cell Death', biologicalProcess: 'Cell Death' },
    { pathway: 'Metabolism', enrichmentScore: 0.65, pValue: 0.01, genes: 20, predictedImpact: 'Medium', mechanism: 'Energy Production', biologicalProcess: 'Cellular Respiration' },
    { pathway: 'Signaling', enrichmentScore: 0.58, pValue: 0.02, genes: 18, predictedImpact: 'Medium', mechanism: 'Cell Communication', biologicalProcess: 'Signal Transduction' },
    { pathway: 'Transport', enrichmentScore: 0.45, pValue: 0.05, genes: 10, predictedImpact: 'Low', mechanism: 'Molecular Transport', biologicalProcess: 'Membrane Transport' },
  ],
  coExpression: [
    { gene1: 'GENE1', gene2: 'GENE2', correlation: 0.92, pValue: 0.001, predictedInteraction: 'Direct', confidence: 0.95, interactionType: 'Activation' },
    { gene1: 'GENE3', gene2: 'GENE4', correlation: 0.85, pValue: 0.002, predictedInteraction: 'Indirect', confidence: 0.88, interactionType: 'Inhibition' },
    { gene1: 'GENE2', gene2: 'GENE5', correlation: 0.78, pValue: 0.005, predictedInteraction: 'Regulatory', confidence: 0.82, interactionType: 'Co-regulation' },
    { gene1: 'GENE4', gene2: 'GENE1', correlation: 0.72, pValue: 0.01, predictedInteraction: 'Co-regulation', confidence: 0.75, interactionType: 'Feedback' },
    { gene1: 'GENE5', gene2: 'GENE3', correlation: 0.65, pValue: 0.02, predictedInteraction: 'Functional', confidence: 0.68, interactionType: 'Synergy' },
  ],
  aiPredictions: {
    futureExpression: [
      { timePoint: 'T+1', predictedLevel: 2.8, confidence: 0.92, upperBound: 3.1, lowerBound: 2.5, biologicalPhase: 'Early Response' },
      { timePoint: 'T+2', predictedLevel: 3.2, confidence: 0.88, upperBound: 3.5, lowerBound: 2.9, biologicalPhase: 'Peak Response' },
      { timePoint: 'T+3', predictedLevel: 2.9, confidence: 0.85, upperBound: 3.2, lowerBound: 2.6, biologicalPhase: 'Late Response' },
      { timePoint: 'T+4', predictedLevel: 2.5, confidence: 0.82, upperBound: 2.8, lowerBound: 2.2, biologicalPhase: 'Recovery' },
      { timePoint: 'T+5', predictedLevel: 2.3, confidence: 0.80, upperBound: 2.6, lowerBound: 2.0, biologicalPhase: 'Baseline' },
    ],
    regulatoryNetworks: [
      { regulator: 'GENE1', targets: ['GENE2', 'GENE3'], confidence: 0.95, regulationType: 'Transcription Factor', biologicalContext: 'Cell Cycle Control' },
      { regulator: 'GENE2', targets: ['GENE4', 'GENE5'], confidence: 0.88, regulationType: 'Kinase', biologicalContext: 'Signal Transduction' },
      { regulator: 'GENE3', targets: ['GENE1', 'GENE5'], confidence: 0.85, regulationType: 'Receptor', biologicalContext: 'Cell Communication' },
    ],
    functionalPredictions: [
      { gene: 'GENE1', predictedFunction: 'Cell Cycle Control', confidence: 0.92, biologicalProcess: 'Mitosis', cellularLocation: 'Nucleus' },
      { gene: 'GENE2', predictedFunction: 'Apoptosis Regulation', confidence: 0.88, biologicalProcess: 'Programmed Cell Death', cellularLocation: 'Cytoplasm' },
      { gene: 'GENE3', predictedFunction: 'Metabolic Control', confidence: 0.85, biologicalProcess: 'Energy Metabolism', cellularLocation: 'Mitochondria' },
    ],
  },
};

// Add new mock data for enhanced insights
const enhancedInsightsData = {
  pathwayAnalysis: {
    enrichedPathways: [
      { pathway: 'Cell Cycle Regulation', enrichmentScore: 0.92, pValue: 0.001, genes: 25, confidence: 0.95, biologicalProcess: 'Cell Division' },
      { pathway: 'Apoptosis Signaling', enrichmentScore: 0.88, pValue: 0.002, genes: 18, confidence: 0.92, biologicalProcess: 'Programmed Cell Death' },
      { pathway: 'Metabolic Regulation', enrichmentScore: 0.85, pValue: 0.003, genes: 30, confidence: 0.90, biologicalProcess: 'Energy Metabolism' },
    ],
    pathwayInteractions: [
      { pathway1: 'Cell Cycle', pathway2: 'DNA Repair', interactionScore: 0.95, type: 'Synergistic' },
      { pathway1: 'Apoptosis', pathway2: 'Cell Survival', interactionScore: 0.88, type: 'Antagonistic' },
      { pathway1: 'Metabolism', pathway2: 'Signaling', interactionScore: 0.82, type: 'Regulatory' },
    ],
  },
  functionalPredictions: {
    geneFunctions: [
      { gene: 'GENE1', predictedFunction: 'Cell Cycle Control', confidence: 0.95, supportingEvidence: 5, cellularLocation: 'Nucleus' },
      { gene: 'GENE2', predictedFunction: 'Apoptosis Regulation', confidence: 0.92, supportingEvidence: 4, cellularLocation: 'Cytoplasm' },
      { gene: 'GENE3', predictedFunction: 'Metabolic Control', confidence: 0.88, supportingEvidence: 3, cellularLocation: 'Mitochondria' },
    ],
    proteinInteractions: [
      { protein1: 'PROT1', protein2: 'PROT2', interactionType: 'Direct Binding', confidence: 0.95 },
      { protein1: 'PROT3', protein2: 'PROT4', interactionType: 'Regulatory', confidence: 0.88 },
      { protein1: 'PROT5', protein2: 'PROT6', interactionType: 'Complex Formation', confidence: 0.85 },
    ],
  },
  comparativeAnalysis: {
    tissueComparison: [
      { tissue: 'Liver', expressionLevel: 2.5, significance: 'High', confidence: 0.95 },
      { tissue: 'Brain', expressionLevel: 1.8, significance: 'Medium', confidence: 0.88 },
      { tissue: 'Heart', expressionLevel: 2.2, significance: 'High', confidence: 0.90 },
    ],
    diseaseAssociation: [
      { disease: 'Cancer', associationScore: 0.92, evidenceLevel: 'High', confidence: 0.95 },
      { disease: 'Diabetes', associationScore: 0.85, evidenceLevel: 'Medium', confidence: 0.88 },
      { disease: 'Cardiovascular', associationScore: 0.78, evidenceLevel: 'Medium', confidence: 0.82 },
    ],
  },
};

// Add new mock data for additional AI insights
const additionalAIInsights = {
  regulatoryNetworks: {
    transcriptionFactors: [
      { tf: 'TF1', targetGenes: 15, confidence: 0.95, regulationType: 'Activation', biologicalContext: 'Cell Cycle' },
      { tf: 'TF2', targetGenes: 12, confidence: 0.92, regulationType: 'Repression', biologicalContext: 'Apoptosis' },
      { tf: 'TF3', targetGenes: 18, confidence: 0.88, regulationType: 'Dual', biologicalContext: 'Metabolism' },
    ],
    networkMetrics: {
      connectivity: 0.85,
      modularity: 0.78,
      centrality: 0.92,
      robustness: 0.88,
    },
  },
  expressionPatterns: {
    temporalPatterns: [
      { timePoint: '0h', expression: 1.0, phase: 'Baseline', confidence: 0.95 },
      { timePoint: '6h', expression: 2.5, phase: 'Induction', confidence: 0.92 },
      { timePoint: '12h', expression: 3.2, phase: 'Peak', confidence: 0.90 },
      { timePoint: '24h', expression: 2.8, phase: 'Decline', confidence: 0.88 },
      { timePoint: '48h', expression: 1.5, phase: 'Recovery', confidence: 0.85 },
    ],
    spatialPatterns: [
      { tissue: 'Liver', expression: 2.5, significance: 'High', confidence: 0.95 },
      { tissue: 'Brain', expression: 1.8, significance: 'Medium', confidence: 0.90 },
      { tissue: 'Heart', expression: 2.2, significance: 'High', confidence: 0.92 },
    ],
  },
  predictiveAnalysis: {
    futureExpression: [
      { timePoint: 'T+1', predictedLevel: 2.8, confidence: 0.92, upperBound: 3.1, lowerBound: 2.5 },
      { timePoint: 'T+2', predictedLevel: 3.2, confidence: 0.88, upperBound: 3.5, lowerBound: 2.9 },
      { timePoint: 'T+3', predictedLevel: 2.9, confidence: 0.85, upperBound: 3.2, lowerBound: 2.6 },
    ],
    regulatoryPredictions: [
      { regulator: 'GENE1', predictedTargets: 8, confidence: 0.95, mechanism: 'Direct Binding' },
      { regulator: 'GENE2', predictedTargets: 6, confidence: 0.92, mechanism: 'Indirect Regulation' },
      { regulator: 'GENE3', predictedTargets: 10, confidence: 0.88, mechanism: 'Complex Formation' },
    ],
  },
};

// Enhanced CustomTooltip with biological context
const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        {type === 'predictions' && (
          <>
            <p className="text-sm">Predicted Level: {payload[0].value.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Confidence: {(payload[0].payload.confidence * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Phase: {payload[0].payload.biologicalPhase}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Range: {payload[0].payload.lowerBound.toFixed(2)} - {payload[0].payload.upperBound.toFixed(2)}
            </p>
          </>
        )}
        {type === 'patterns' && (
          <>
            <p className="text-sm">Correlation: {payload[0].value.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Confidence: {(payload[0].payload.confidence * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Interaction: {payload[0].payload.predictedInteraction}</p>
            <p className="text-sm text-muted-foreground">Type: {payload[0].payload.interactionType}</p>
          </>
        )}
        {type === 'networks' && (
          <>
            <p className="text-sm">Target Genes: {payload[0].value}</p>
            <p className="text-sm text-muted-foreground">Confidence: {(payload[0].payload.confidence * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Type: {payload[0].payload.regulationType}</p>
            <p className="text-sm text-muted-foreground">Context: {payload[0].payload.biologicalContext}</p>
          </>
        )}
      </div>
    );
  }
  return null;
};

// Add graph explanation component
const GraphExplanation = ({ type, data }: { type: string; data: any[] }) => {
  const getExplanation = () => {
    switch (type) {
      case 'predictions':
        const avgConfidence = data.reduce((sum, d) => sum + d.confidence, 0) / data.length;
        const trend = data[data.length - 1].predictedLevel > data[0].predictedLevel ? 'increasing' : 'decreasing';
        return {
          title: "Expression Prediction Analysis",
          description: `This area chart shows AI-predicted gene expression levels over time. The shaded area represents the confidence interval of predictions.`,
          insights: [
            `Average prediction confidence: ${(avgConfidence * 100).toFixed(1)}%`,
            `Overall expression trend is ${trend}`,
            `Highest predicted level: ${Math.max(...data.map(d => d.predictedLevel)).toFixed(2)}`,
            `Lowest predicted level: ${Math.min(...data.map(d => d.predictedLevel)).toFixed(2)}`,
          ]
        };
      case 'patterns':
        const highCorrelations = data.filter(d => d.correlation > 0.8).length;
        const avgCorrelation = data.reduce((sum, d) => sum + d.correlation, 0) / data.length;
        return {
          title: "Pattern Recognition Analysis",
          description: `This scatter plot visualizes the correlation between gene pairs and the AI's confidence in these relationships. Each point represents a gene pair interaction.`,
          insights: [
            `${highCorrelations} gene pairs show strong correlation (>0.8)`,
            `Average correlation: ${avgCorrelation.toFixed(2)}`,
            `Most common interaction type: ${data[0].predictedInteraction}`,
            `Highest confidence prediction: ${(Math.max(...data.map(d => d.confidence)) * 100).toFixed(1)}%`,
          ]
        };
      case 'networks':
        const totalTargets = data.reduce((sum, d) => sum + d.targets.length, 0);
        const avgTargets = totalTargets / data.length;
        return {
          title: "Regulatory Network Analysis",
          description: `This bar chart displays the predicted regulatory relationships between genes. Each bar represents a regulator gene and its number of target genes.`,
          insights: [
            `Total predicted regulatory relationships: ${totalTargets}`,
            `Average targets per regulator: ${avgTargets.toFixed(1)}`,
            `Most connected regulator: ${data[0].regulator} (${data[0].targets.length} targets)`,
            `Highest confidence prediction: ${(Math.max(...data.map(d => d.confidence)) * 100).toFixed(1)}%`,
          ]
        };
      default:
        return {
          title: "",
          description: "",
          insights: []
        };
    }
  };

  const explanation = getExplanation();

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold">{explanation.title}</h3>
      <p className="text-sm text-muted-foreground">{explanation.description}</p>
      <div className="grid gap-2">
        {explanation.insights.map((insight, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
};

const Insights: React.FC = () => {
  const [selectedGene, setSelectedGene] = useState('');
  const [selectedPathway, setSelectedPathway] = useState('');
  const [selectedSignificance, setSelectedSignificance] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Simulate AI analysis
  useEffect(() => {
    const generateAIInsights = () => {
      setIsAnalyzing(true);
      // Simulate AI processing delay
      setTimeout(() => {
        const insights = [
          "AI detected a potential regulatory network between GENE1 and GENE2 with 95% confidence",
          "Predicted functional convergence in cell cycle regulation pathways",
          "Identified novel co-expression patterns suggesting shared regulatory mechanisms",
          "High confidence prediction of GENE1's role in cell proliferation",
          "Detected potential feedback loop in apoptosis regulation",
        ];
        setAiInsights(insights);
        setIsAnalyzing(false);
      }, 2000);
    };

    generateAIInsights();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Expression Insights</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered analysis of gene expression patterns and predictions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* AI Analysis Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Predictions
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expressionData.aiPredictions.regulatoryNetworks.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Regulatory networks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pattern Recognition
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expressionData.coExpression.filter(c => c.correlation > 0.8).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Strong correlations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Functional Predictions
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expressionData.aiPredictions.functionalPredictions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              High confidence predictions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Future Trends
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expressionData.aiPredictions.futureExpression.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Time points predicted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Tabs */}
      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Recognition</TabsTrigger>
          <TabsTrigger value="networks">Regulatory Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expression Predictions</CardTitle>
              <CardDescription>
                AI-predicted future expression patterns with confidence intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={expressionData.aiPredictions.futureExpression}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timePoint" />
                    <YAxis label={{ value: 'Predicted Expression', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip type="predictions" />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="predictedLevel"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Predicted Level"
                    />
                    <Area
                      type="monotone"
                      dataKey="upperBound"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.1}
                      name="Upper Bound"
                    />
                    <Area
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="#ffc658"
                      fill="#ffc658"
                      fillOpacity={0.1}
                      name="Lower Bound"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <GraphExplanation type="predictions" data={expressionData.aiPredictions.futureExpression} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Recognition</CardTitle>
              <CardDescription>
                AI-identified expression patterns and correlations with biological context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="correlation" name="Correlation" />
                    <YAxis dataKey="confidence" name="AI Confidence" />
                    <Tooltip content={<CustomTooltip type="patterns" />} />
                    <Legend />
                    <Scatter
                      data={expressionData.coExpression}
                      fill="#8884d8"
                      name="Gene Pairs"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <GraphExplanation type="patterns" data={expressionData.coExpression} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Networks</CardTitle>
              <CardDescription>
                AI-predicted gene regulatory networks with biological context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expressionData.aiPredictions.regulatoryNetworks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="regulator" />
                    <YAxis label={{ value: 'Number of Targets', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip type="networks" />} />
                    <Legend />
                    <Bar dataKey="targets.length" fill="#8884d8" name="Target Genes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <GraphExplanation type="networks" data={expressionData.aiPredictions.regulatoryNetworks} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced AI-Generated Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pathway Analysis Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pathway Analysis</CardTitle>
            <CardDescription>
              AI-identified enriched pathways and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enhancedInsightsData.pathwayAnalysis.enrichedPathways}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pathway" />
                    <YAxis label={{ value: 'Enrichment Score', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="enrichmentScore" fill="#8884d8" name="Enrichment Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Key Pathway Interactions</h4>
                {enhancedInsightsData.pathwayAnalysis.pathwayInteractions.map((interaction, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{interaction.pathway1} ↔ {interaction.pathway2}</span>
                    <span className="text-muted-foreground">({interaction.type})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Functional Predictions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Functional Predictions</CardTitle>
            <CardDescription>
              AI-predicted gene functions and protein interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="confidence" name="Confidence" />
                    <YAxis dataKey="supportingEvidence" name="Supporting Evidence" />
                    <Tooltip />
                    <Legend />
                    <Scatter
                      data={enhancedInsightsData.functionalPredictions.geneFunctions}
                      fill="#8884d8"
                      name="Gene Functions"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Protein Interactions</h4>
                {enhancedInsightsData.functionalPredictions.proteinInteractions.map((interaction, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{interaction.protein1} → {interaction.protein2}</span>
                    <span className="text-muted-foreground">({interaction.interactionType})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparative Analysis Section */}
        <Card>
          <CardHeader>
            <CardTitle>Comparative Analysis</CardTitle>
            <CardDescription>
              Tissue-specific expression and disease associations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enhancedInsightsData.comparativeAnalysis.tissueComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tissue" />
                    <YAxis label={{ value: 'Expression Level', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expressionLevel" fill="#8884d8" name="Expression Level" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Disease Associations</h4>
                {enhancedInsightsData.comparativeAnalysis.diseaseAssociation.map((disease, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{disease.disease}</span>
                    <span className="text-muted-foreground">(Evidence: {disease.evidenceLevel})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Generated Insights Section */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Insights</CardTitle>
            <CardDescription>
              {isAnalyzing ? 'Analyzing expression patterns...' : 'Key insights from AI analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isAnalyzing ? (
                <div className="flex items-center justify-center p-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                  >
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {insight}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional AI Insights Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Regulatory Network Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Network Analysis</CardTitle>
            <CardDescription>
              AI-identified transcription factors and their regulatory networks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={additionalAIInsights.regulatoryNetworks.transcriptionFactors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tf" />
                    <YAxis label={{ value: 'Target Genes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="targetGenes" fill="#8884d8" name="Target Genes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Network Metrics</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Connectivity</span>
                      <span className="text-muted-foreground">
                        {(additionalAIInsights.regulatoryNetworks.networkMetrics.connectivity * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Modularity</span>
                      <span className="text-muted-foreground">
                        {(additionalAIInsights.regulatoryNetworks.networkMetrics.modularity * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Network Properties</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Centrality</span>
                      <span className="text-muted-foreground">
                        {(additionalAIInsights.regulatoryNetworks.networkMetrics.centrality * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Robustness</span>
                      <span className="text-muted-foreground">
                        {(additionalAIInsights.regulatoryNetworks.networkMetrics.robustness * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expression Pattern Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Expression Pattern Analysis</CardTitle>
            <CardDescription>
              AI-analyzed temporal and spatial expression patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={additionalAIInsights.expressionPatterns.temporalPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timePoint" />
                    <YAxis label={{ value: 'Expression Level', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="expression"
                      stroke="#8884d8"
                      name="Expression Level"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Spatial Expression</h4>
                {additionalAIInsights.expressionPatterns.spatialPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{pattern.tissue}</span>
                    <span className="text-muted-foreground">
                      (Level: {pattern.expression.toFixed(1)}, {pattern.significance})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Predictive Analysis</CardTitle>
            <CardDescription>
              AI-predicted future expression patterns and regulatory relationships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={additionalAIInsights.predictiveAnalysis.futureExpression}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timePoint" />
                    <YAxis label={{ value: 'Predicted Level', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="predictedLevel"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Predicted Level"
                    />
                    <Area
                      type="monotone"
                      dataKey="upperBound"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.1}
                      name="Upper Bound"
                    />
                    <Area
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="#ffc658"
                      fill="#ffc658"
                      fillOpacity={0.1}
                      name="Lower Bound"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Regulatory Predictions</h4>
                {additionalAIInsights.predictiveAnalysis.regulatoryPredictions.map((prediction, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{prediction.regulator}</span>
                    <span className="text-muted-foreground">
                      ({prediction.predictedTargets} targets, {prediction.mechanism})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Confidence Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>AI Confidence Metrics</CardTitle>
            <CardDescription>
              Confidence scores and reliability metrics for AI predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Prediction Confidence</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Expression Patterns</span>
                      <span className="text-muted-foreground">92%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Regulatory Networks</span>
                      <span className="text-muted-foreground">88%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Functional Predictions</span>
                      <span className="text-muted-foreground">85%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Model Reliability</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Data Quality</span>
                      <span className="text-muted-foreground">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Validation Score</span>
                      <span className="text-muted-foreground">0.89</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Update Frequency</span>
                      <span className="text-muted-foreground">Daily</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">AI Model Insights</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Model trained on 1M+ gene expression profiles</p>
                  <p>• Regular updates with new experimental data</p>
                  <p>• Cross-validation with multiple datasets</p>
                  <p>• Integration with known biological pathways</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights; 