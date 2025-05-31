import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  BarChart3, 
  LineChart, 
  HeatMap, 
  Dna,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import PageTitle from "@/components/layout/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GeneExpressionAnalysis = () => {
  const [selectedGenes, setSelectedGenes] = useState<string[]>([]);
  const [analysisType, setAnalysisType] = useState("differential");
  const [viewType, setViewType] = useState("heatmap");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockGenes = [
    { id: "GENE1", name: "BRCA1", expression: 2.5, pValue: 0.001 },
    { id: "GENE2", name: "TP53", expression: -1.8, pValue: 0.003 },
    { id: "GENE3", name: "EGFR", expression: 3.2, pValue: 0.002 },
    { id: "GENE4", name: "KRAS", expression: -2.1, pValue: 0.004 },
    { id: "GENE5", name: "PTEN", expression: 1.5, pValue: 0.005 },
  ];

  const handleGeneSelection = (geneId: string) => {
    setSelectedGenes(prev => 
      prev.includes(geneId) 
        ? prev.filter(id => id !== geneId)
        : [...prev, geneId]
    );
  };

  const handleAnalysis = () => {
    setIsLoading(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Gene Expression Analysis" 
        subtitle="Analyze and visualize gene expression patterns"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Analysis Area */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-primary" />
                <CardTitle>Expression Analysis</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {selectedGenes.length} Genes Selected
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="differential" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none px-4">
                <TabsTrigger value="differential" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Differential Expression
                </TabsTrigger>
                <TabsTrigger value="coexpression" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Co-expression
                </TabsTrigger>
                <TabsTrigger value="pathway" className="flex items-center gap-2">
                  <HeatMap className="h-4 w-4" />
                  Pathway Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="differential" className="m-0">
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search genes..."
                        className="w-full"
                        icon={<Search className="h-4 w-4" />}
                      />
                    </div>
                    <Select defaultValue="heatmap">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heatmap">Heatmap View</SelectItem>
                        <SelectItem value="volcano">Volcano Plot</SelectItem>
                        <SelectItem value="ma">MA Plot</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAnalysis} disabled={isLoading}>
                      {isLoading ? "Analyzing..." : "Run Analysis"}
                    </Button>
                  </div>

                  <div className="border rounded-lg">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Gene Expression Results</h3>
                        <Badge variant="outline">p-value < 0.05</Badge>
                      </div>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="p-4">
                        <div className="space-y-4">
                          {mockGenes.map((gene) => (
                            <div
                              key={gene.id}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                              onClick={() => handleGeneSelection(gene.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Dna className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">{gene.name}</div>
                                  <div className="text-sm text-muted-foreground">{gene.id}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="font-medium">
                                    {gene.expression > 0 ? '+' : ''}{gene.expression.toFixed(2)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    p-value: {gene.pValue.toFixed(3)}
                                  </div>
                                </div>
                                <Badge
                                  variant={gene.expression > 0 ? "default" : "destructive"}
                                >
                                  {gene.expression > 0 ? 'Up' : 'Down'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="coexpression" className="m-0">
                <div className="p-4">
                  <div className="text-center py-8">
                    <HeatMap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Co-expression Analysis</h3>
                    <p className="text-muted-foreground">
                      Select genes to analyze their co-expression patterns
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pathway" className="m-0">
                <div className="p-4">
                  <div className="text-center py-8">
                    <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Pathway Analysis</h3>
                    <p className="text-muted-foreground">
                      Analyze gene expression patterns in biological pathways
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              Analysis Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Type</label>
                <Select defaultValue="differential">
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="differential">Differential Expression</SelectItem>
                    <SelectItem value="coexpression">Co-expression</SelectItem>
                    <SelectItem value="pathway">Pathway Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Statistical Parameters</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">p-value threshold</span>
                    <span className="text-sm font-medium">0.05</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fold change threshold</span>
                    <span className="text-sm font-medium">2.0</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Visualization Options</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Color scale</span>
                    <Select defaultValue="redblue">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select scale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="redblue">Red-Blue</SelectItem>
                        <SelectItem value="viridis">Viridis</SelectItem>
                        <SelectItem value="plasma">Plasma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneExpressionAnalysis; 