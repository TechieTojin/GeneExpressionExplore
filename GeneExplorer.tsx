import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Database, 
  BarChart3, 
  LineChart, 
  Table, 
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

// Mock data for initial development
const mockDatasets = [
  { id: 'GSE12345', title: 'Breast Cancer Expression', samples: 120, genes: 20000 },
  { id: 'GSE67890', title: 'Lung Cancer Study', samples: 85, genes: 18000 },
  { id: 'GSE24680', title: 'Alzheimer\'s Disease', samples: 150, genes: 22000 },
];

const GeneExplorer = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Gene Expression Explorer</h1>
        <p className="text-muted-foreground">
          Explore and analyze gene expression data from NCBI's GEO repository
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Dataset Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Dataset Selection</CardTitle>
            <CardDescription>Choose a GEO dataset to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Search Datasets</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter GEO accession (e.g., GSE12345)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Or Select from Recent</Label>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {mockDatasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedDataset === dataset.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedDataset(dataset.id)}
                  >
                    <div className="font-medium">{dataset.title}</div>
                    <div className="text-sm text-muted-foreground">{dataset.id}</div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{dataset.samples} samples</Badge>
                      <Badge variant="secondary">{dataset.genes} genes</Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dataset Info Card */}
          {selectedDataset && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Dataset Overview</CardTitle>
                    <CardDescription>
                      {mockDatasets.find(d => d.id === selectedDataset)?.title}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="genes">Genes</TabsTrigger>
                    <TabsTrigger value="samples">Samples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Genes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">20,000</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">120</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Quality Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Data Completeness</span>
                            <span>98%</span>
                          </div>
                          <Progress value={98} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Expression Range</span>
                            <span>0.1 - 15.2</span>
                          </div>
                          <Progress value={75} />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analysis">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Differential Expression Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center border rounded-lg">
                            <div className="text-center text-muted-foreground">
                              <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                              <p>Select a dataset to view analysis results</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="genes">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Search genes..." className="flex-1" />
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                      <Card>
                        <CardContent className="p-0">
                          <div className="h-[400px] flex items-center justify-center border rounded-lg">
                            <div className="text-center text-muted-foreground">
                              <Table className="h-8 w-8 mx-auto mb-2" />
                              <p>Select a dataset to view gene expression data</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="samples">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Sample Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[400px] flex items-center justify-center border rounded-lg">
                            <div className="text-center text-muted-foreground">
                              <Info className="h-8 w-8 mx-auto mb-2" />
                              <p>Select a dataset to view sample information</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!selectedDataset && (
            <Card>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Dataset Selected</h3>
                  <p>Select a dataset from the sidebar to begin analysis</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneExplorer; 