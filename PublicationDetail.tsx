import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, FileText, Download, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const relatedPapers = [
  {
    title: "Neuroinflammation in Alzheimer's Disease: A Meta-Analysis",
    authors: 'Johnson M, Williams R',
    journal: 'Nature Reviews Neuroscience',
    year: 2023,
    link: '#',
    relevance: 'High'
  },
  {
    title: 'Synaptic Loss and Cognitive Decline',
    authors: 'Brown K, Davis L',
    journal: 'Science Translational Medicine',
    year: 2023,
    link: '#',
    relevance: 'Medium'
  },
  {
    title: 'Gene Expression Biomarkers in Neurodegeneration',
    authors: 'Taylor S, Anderson P',
    journal: 'Cell Reports',
    year: 2023,
    link: '#',
    relevance: 'High'
  }
];

const PublicationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { publication } = location.state || {};

  if (!publication) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Publication Not Found</h1>
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
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-sm text-muted-foreground">Publication</span>
              </div>
              <CardTitle className="text-3xl font-bold">{publication.title}</CardTitle>
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

              <div className="space-y-2">
                <h3 className="font-semibold">Authors</h3>
                <p className="text-muted-foreground">{publication.authors}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Journal</h3>
                <p className="text-muted-foreground">{publication.journal}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Year</h3>
                <p className="text-muted-foreground">{publication.year}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Abstract</h3>
                <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Key Findings</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Identified novel gene expression patterns in Alzheimer's disease</li>
                  <li>Discovered significant correlation between inflammation markers and disease progression</li>
                  <li>Proposed new therapeutic targets based on transcriptomic analysis</li>
                </ul>
              </div>

              <Button asChild className="gap-2">
                <a href={publication.link} target="_blank" rel="noopener noreferrer">
                  View Full Publication <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Related Papers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedPapers.map((paper, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium">{paper.title}</h4>
                  <p className="text-sm text-muted-foreground">{paper.authors}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{paper.journal}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-muted-foreground">{paper.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{paper.relevance} Relevance</Badge>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      <a href={paper.link} target="_blank" rel="noopener noreferrer">
                        View <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                  {index < relatedPapers.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Citation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {publication.authors} ({publication.year}). {publication.title}. {publication.journal}.
              </p>
              <Button variant="outline" size="sm" className="mt-4 gap-2">
                <Download className="h-4 w-4" /> Copy Citation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail; 