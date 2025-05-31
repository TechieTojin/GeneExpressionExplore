import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, FlaskConical, Upload, Download, Settings, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ToolDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tool } = location.state || {};
  const [activeTab, setActiveTab] = useState('explore');

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
        <Button onClick={() => navigate('/research')}>Back to Research</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate('/research')}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Research
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="h-6 w-6 text-green-600" />
                <span className="text-sm text-muted-foreground">Research Tool</span>
              </div>
              <CardTitle className="text-3xl font-bold">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="explore">Explore</TabsTrigger>
                  <TabsTrigger value="upload">Upload Data</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="help">Help</TabsTrigger>
                </TabsList>

                <TabsContent value="explore" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Search Genes</Label>
                      <Input placeholder="Enter gene name or ID..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Tissue Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tissue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brain">Brain</SelectItem>
                          <SelectItem value="liver">Liver</SelectItem>
                          <SelectItem value="heart">Heart</SelectItem>
                          <SelectItem value="kidney">Kidney</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-semibold mb-2">Expression Heatmap</h3>
                    <div className="aspect-video bg-background rounded flex items-center justify-center">
                      <p className="text-muted-foreground">Heatmap visualization will appear here</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Expression Levels</h3>
                      <div className="aspect-square bg-background rounded flex items-center justify-center">
                        <p className="text-muted-foreground">Expression plot will appear here</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Statistical Analysis</h3>
                      <div className="aspect-square bg-background rounded flex items-center justify-center">
                        <p className="text-muted-foreground">Statistical results will appear here</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Upload Your Data</h3>
                    <p className="text-muted-foreground mb-4">Drag and drop your files here or click to browse</p>
                    <Button>Select Files</Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Data Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="tsv">TSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Visualization Settings</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="viridis">Viridis</SelectItem>
                          <SelectItem value="plasma">Plasma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Analysis Parameters</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="P-value threshold" />
                        <Input type="number" placeholder="Fold change threshold" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="help" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">Quick Start Guide</h3>
                        <p className="text-muted-foreground">
                          1. Search for genes using the search bar<br />
                          2. Select tissue type from the dropdown<br />
                          3. View expression patterns in the heatmap<br />
                          4. Download results or share with colleagues
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <HelpCircle className="h-4 w-4" /> View Documentation
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tool Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Features</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Gene expression analysis</li>
                  <li>Interactive visualizations</li>
                  <li>Statistical testing</li>
                  <li>Data export options</li>
                </ul>
              </div>

              <Button asChild className="gap-2 w-full">
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  Open Full Version <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium">Last Analysis</p>
                  <p className="text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Data Points</p>
                  <p className="text-muted-foreground">1,234 genes analyzed</p>
                </div>
                <Button variant="outline" className="gap-2 w-full">
                  <Download className="h-4 w-4" /> Download Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail; 