import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Star, Download, Share2, Bookmark, Users, Calendar, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResearchArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { research } = location.state || {};

  if (!research) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Research Article Not Found</h1>
        <Button onClick={() => navigate('/research')}>Back to Research</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate('/research')}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Research
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-400" />
                <span className="text-sm text-muted-foreground">Featured Research</span>
              </div>
              <CardTitle className="text-3xl font-bold">{research.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" /> Save
                </Button>
              </div>

              <img 
                src={research.image} 
                alt={research.title} 
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="flex gap-2 flex-wrap">
                {research.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{research.summary}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Detailed Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">{research.details}</p>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="methodology">Methodology</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Research Team</span>
                        </div>
                        <p>Dr. Sarah Johnson, Dr. Michael Chen, et al.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Publication Date</span>
                        </div>
                        <p>March 2024</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>Research Institution</span>
                      </div>
                      <p>Center for Gene Expression Studies, University of Science</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="methodology" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Experimental Design</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Single-cell RNA sequencing of 100,000+ cells</li>
                      <li>Advanced clustering algorithms for cell type identification</li>
                      <li>Statistical analysis of gene expression patterns</li>
                      <li>Validation through multiple experimental approaches</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Key Findings</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Discovery of 15 novel cell subtypes</li>
                      <li>Identification of key gene expression markers</li>
                      <li>Correlation between expression patterns and disease states</li>
                      <li>Validation of findings in independent cohorts</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Implications</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>New insights into cellular diversity</li>
                      <li>Potential therapeutic targets identified</li>
                      <li>Implications for disease diagnosis and treatment</li>
                      <li>Future research directions</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>

              <Button asChild className="gap-2">
                <a href={research.link} target="_blank" rel="noopener noreferrer">
                  View Full Study <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Related Research</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Single-Cell Analysis Methods</h4>
                  <p className="text-sm text-muted-foreground">Recent advances in single-cell sequencing technologies</p>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Read More <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Brain Cell Atlas</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive mapping of brain cell types</p>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Read More <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Research Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium">Citations</p>
                  <p className="text-muted-foreground">127 citations in 2024</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Research Impact Score</p>
                  <p className="text-muted-foreground">High Impact (Top 10%)</p>
                </div>
                <Button variant="outline" className="gap-2 w-full">
                  <Download className="h-4 w-4" /> Download Metrics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResearchArticle; 