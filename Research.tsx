import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, BookOpen, Download, Filter, ExternalLink, Star, TrendingUp, FlaskConical, FileText, Loader2 } from 'lucide-react';

const featuredResearch = [
  {
    title: 'Single-Cell RNA-Seq Reveals Brain Cell Diversity',
    summary: 'A comprehensive atlas of brain cell types using single-cell RNA sequencing.',
    tags: ['Single-Cell', 'Brain', 'RNA-Seq'],
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    link: '#',
    featured: true,
    details: 'This study mapped over 100,000 brain cells, revealing new subtypes and gene expression patterns. Methods included droplet-based RNA-seq and advanced clustering algorithms.'
  },
  {
    title: 'Comparative Transcriptomics in Neurodegeneration',
    summary: 'Comparing gene expression in healthy and diseased brain tissue.',
    tags: ['Neurodegeneration', 'Comparative', 'Transcriptomics'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#',
    featured: false,
    details: "This research compared transcriptomes from Alzheimer's and control brains, identifying key dysregulated pathways and potential therapeutic targets."
  },
  {
    title: 'AI-Driven Biomarker Discovery',
    summary: 'Machine learning uncovers new biomarkers for early diagnosis.',
    tags: ['AI', 'Biomarkers', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    link: '#',
    featured: false,
    details: 'Using deep learning, this study identified novel gene signatures predictive of disease progression, validated in multiple cohorts.'
  }
];

const recentPublications = [
  {
    title: "Gene Expression Patterns in Alzheimer's Disease",
    authors: 'Smith J, Lee A',
    journal: 'Nature Neuroscience',
    year: 2024,
    link: '#',
    abstract: "This paper explores altered gene expression in Alzheimer's, highlighting inflammation and synaptic loss as key features."
  },
  {
    title: 'Epigenetic Regulation of Synaptic Plasticity',
    authors: 'Chen Y, Kumar S',
    journal: 'Science',
    year: 2023,
    link: '#',
    abstract: 'Epigenetic modifications are shown to regulate genes involved in synaptic plasticity and memory formation.'
  },
  {
    title: 'Longitudinal Analysis of Brain Transcriptomes',
    authors: 'Patel R, Wang X',
    journal: 'Cell Reports',
    year: 2023,
    link: '#',
    abstract: 'A time-course study of brain transcriptomes reveals dynamic changes during aging and disease.'
  },
];

const researchTools = [
  {
    name: 'Expression Atlas',
    description: 'Explore gene expression across tissues and conditions.',
    icon: <TrendingUp className="h-5 w-5 text-primary" />, 
    link: '#',
    details: 'The Expression Atlas provides interactive heatmaps, tissue comparisons, and downloadable datasets for thousands of genes.'
  },
  {
    name: 'Data Download',
    description: 'Access raw and processed research datasets.',
    icon: <Download className="h-5 w-5 text-primary" />, 
    link: '#',
    details: 'Download bulk and single-cell RNA-seq data, metadata, and processed results in multiple formats.'
  },
  {
    name: 'Analysis Toolkit',
    description: 'Run advanced analyses on your own data.',
    icon: <FlaskConical className="h-5 w-5 text-primary" />, 
    link: '#',
    details: 'The toolkit includes clustering, differential expression, and pathway enrichment modules.'
  },
];

const topics = [
  'All',
  'Single-Cell',
  'Neurodegeneration',
  'AI',
  'Transcriptomics',
  'Epigenetics',
];

const Research = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'research' | 'publication' | 'tool'
  const [dialogData, setDialogData] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredResearch = featuredResearch.filter(r =>
    (selectedTopic === 'All' || r.tags.includes(selectedTopic)) &&
    (search === '' || r.title.toLowerCase().includes(search.toLowerCase()) || r.summary.toLowerCase().includes(search.toLowerCase()))
  );

  // Simulate async fetch for dialog data
  const handleOpenDialog = (type, data) => {
    setDialogType(type);
    setLoading(true);
    setOpenDialog(true);
    setTimeout(() => {
      setDialogData(data);
      setLoading(false);
    }, 700); // Simulate network delay
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogData(null);
    setDialogType('');
    setLoading(false);
  };

  const handleResearchClick = (research) => {
    navigate(`/research/${encodeURIComponent(research.title)}`, { state: { research } });
  };

  const handlePublicationClick = (publication) => {
    navigate(`/publication/${encodeURIComponent(publication.title)}`, { state: { publication } });
  };

  const handleToolClick = (tool) => {
    navigate(`/tool/${encodeURIComponent(tool.name)}`, { state: { tool } });
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/80 to-secondary/80 p-8 shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow">Expression Research</h1>
          <p className="text-lg text-white/90 max-w-xl">
            Discover the latest breakthroughs, explore featured studies, and access powerful research tools in gene expression science.
          </p>
          <div className="flex gap-2 mt-4">
            <Button size="lg" className="gap-2" onClick={() => handleOpenDialog('tool', researchTools[0])}>
              <BookOpen className="h-5 w-5" /> Explore Research
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-white border-white" onClick={() => handleOpenDialog('tool', researchTools[1])}>
              <Download className="h-5 w-5" /> Download Data
            </Button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
          alt="Research"
          className="w-64 h-64 object-cover rounded-lg shadow-xl hidden md:block"
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex gap-2 flex-wrap">
          {topics.map(topic => (
            <Button
              key={topic}
              variant={selectedTopic === topic ? 'default' : 'outline'}
              className="capitalize"
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search research..."
            className="pl-8"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Research */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-400" /> Featured Research
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {filteredResearch.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground py-12">
              No research found for your criteria.
            </div>
          ) : (
            filteredResearch.map((r, i) => (
              <Card 
                key={i} 
                className="hover:shadow-xl transition-shadow group cursor-pointer" 
                onClick={() => handleResearchClick(r)}
              >
                <img 
                  src={r.image} 
                  alt={r.title} 
                  className="rounded-t-lg h-40 w-full object-cover group-hover:scale-105 transition-transform" 
                />
                <CardContent className="space-y-3 pt-4">
                  <div className="flex gap-2 flex-wrap">
                    {r.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-2">{r.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{r.summary}</p>
                  <Button 
                    variant="link" 
                    className="gap-1 p-0 h-auto" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResearchClick(r);
                    }}
                  >
                    Read More <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Recent Publications */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" /> Recent Publications
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentPublications.map((pub, i) => (
            <Card 
              key={i} 
              className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => handlePublicationClick(pub)}
            >
              <CardContent className="pt-4 space-y-2">
                <h3 className="font-semibold text-base line-clamp-2">{pub.title}</h3>
                <div className="text-xs text-muted-foreground">{pub.authors}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span>{pub.journal}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{pub.year}</span>
                </div>
                <Button 
                  variant="link" 
                  className="gap-1 p-0 h-auto text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePublicationClick(pub);
                  }}
                >
                  View <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Research Tools */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-green-600" /> Research Tools & Resources
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {researchTools.map((tool, i) => (
            <Card 
              key={i} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleToolClick(tool)}
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                {tool.icon}
                <div>
                  <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="gap-2 w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToolClick(tool);
                  }}
                >
                  Open <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog for details */}
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-lg">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
              <div className="text-muted-foreground">Loading details...</div>
            </div>
          ) : dialogData && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {dialogType === 'research' && dialogData.title}
                  {dialogType === 'publication' && dialogData.title}
                  {dialogType === 'tool' && dialogData.name}
                </DialogTitle>
                <DialogDescription>
                  {dialogType === 'research' && dialogData.summary}
                  {dialogType === 'publication' && dialogData.authors + ' • ' + dialogData.journal + ' • ' + dialogData.year}
                  {dialogType === 'tool' && dialogData.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {dialogType === 'research' && (
                  <>
                    <img src={dialogData.image} alt={dialogData.title} className="rounded-lg w-full h-40 object-cover" />
                    <div className="flex gap-2 flex-wrap">
                      {dialogData.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{dialogData.details}</div>
                  </>
                )}
                {dialogType === 'publication' && (
                  <div className="text-sm text-muted-foreground">{dialogData.abstract}</div>
                )}
                {dialogType === 'tool' && (
                  <div className="text-sm text-muted-foreground">{dialogData.details}</div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                {dialogType === 'research' && (
                  <Button asChild variant="outline" className="gap-2">
                    <a href={dialogData.link} target="_blank" rel="noopener noreferrer">
                      View Full Study <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {dialogType === 'publication' && (
                  <Button asChild variant="outline" className="gap-2">
                    <a href={dialogData.link} target="_blank" rel="noopener noreferrer">
                      View Publication <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {dialogType === 'tool' && (
                  <Button asChild variant="outline" className="gap-2">
                    <a href={dialogData.link} target="_blank" rel="noopener noreferrer">
                      Open Tool <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Research; 