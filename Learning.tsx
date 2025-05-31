import React, { useState } from "react";
import { 
  BookOpen, GraduationCap, Lightbulb, ArrowRight, 
  PlayCircle, FileText, Users, BarChart3,
  Dna, Microscope, Database, LineChart,
  ChevronRight, Bookmark, Share2, Star,
  Search, Filter, Clock, Award, Target,
  CheckCircle2, XCircle, HelpCircle, BookmarkCheck,
  ChevronDown, ChevronUp, Download, ExternalLink,
  X, Code
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/layout/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const tutorials = [
  {
    title: "Getting Started with Gene Expression Explorer",
    description: "Learn the basics of navigating and using the platform",
    duration: "15 min",
    level: "Beginner",
    icon: <PlayCircle className="h-6 w-6 text-blue-500" />,
    progress: 0,
    topics: ["Platform Overview", "Basic Navigation", "Data Upload", "First Analysis"],
    prerequisites: "None",
    lastUpdated: "2024-03-15"
  },
  {
    title: "Understanding Gene Expression Data",
    description: "Master the fundamentals of gene expression analysis",
    duration: "25 min",
    level: "Intermediate",
    icon: <Dna className="h-6 w-6 text-purple-500" />,
    progress: 0,
    topics: ["Data Types", "Quality Control", "Normalization", "Differential Expression"],
    prerequisites: "Getting Started Tutorial",
    lastUpdated: "2024-03-10"
  },
  {
    title: "Advanced Visualization Techniques",
    description: "Create powerful visualizations of your gene expression data",
    duration: "30 min",
    level: "Advanced",
    icon: <LineChart className="h-6 w-6 text-green-500" />,
    progress: 0,
    topics: ["Heatmaps", "Volcano Plots", "PCA Analysis", "Custom Visualizations"],
    prerequisites: "Understanding Gene Expression Data",
    lastUpdated: "2024-03-05"
  }
];

const importancePoints = [
  {
    title: "Democratizing Research",
    description: "Making advanced gene expression analysis accessible to researchers worldwide",
    icon: <Users className="h-6 w-6 text-blue-500" />,
    benefits: ["Global Access", "Reduced Barriers", "Equal Opportunities"]
  },
  {
    title: "Accelerating Discoveries",
    description: "Enabling faster breakthroughs in genetic research and medical science",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    benefits: ["Faster Analysis", "Real-time Insights", "Rapid Prototyping"]
  },
  {
    title: "Data-Driven Insights",
    description: "Leveraging AI and machine learning for deeper biological understanding",
    icon: <Database className="h-6 w-6 text-purple-500" />,
    benefits: ["AI Analysis", "Pattern Recognition", "Predictive Modeling"]
  },
  {
    title: "Collaborative Science",
    description: "Fostering global collaboration in genetic research",
    icon: <Share2 className="h-6 w-6 text-green-500" />,
    benefits: ["Team Collaboration", "Knowledge Sharing", "Open Science"]
  }
];

const resources = {
  documentation: [
    {
      title: "User Guide",
      description: "Comprehensive documentation for all platform features",
      type: "Documentation",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      format: "PDF",
      size: "2.5 MB",
      lastUpdated: "2024-03-15",
      level: "Beginner",
      pages: 120,
      author: "Platform Team"
    },
    {
      title: "API Documentation",
      description: "Detailed API reference and integration guides",
      type: "Documentation",
      icon: <Code className="h-6 w-6 text-purple-500" />,
      format: "PDF",
      size: "1.8 MB",
      lastUpdated: "2024-03-12",
      level: "Advanced",
      pages: 85,
      author: "Development Team"
    },
    {
      title: "Best Practices Guide",
      description: "Recommended practices for gene expression analysis",
      type: "Documentation",
      icon: <BookmarkCheck className="h-6 w-6 text-green-500" />,
      format: "PDF",
      size: "1.2 MB",
      lastUpdated: "2024-03-10",
      level: "Intermediate",
      pages: 45,
      author: "Research Team"
    },
    {
      title: "Troubleshooting Guide",
      description: "Common issues and their solutions",
      type: "Documentation",
      icon: <HelpCircle className="h-6 w-6 text-orange-500" />,
      format: "PDF",
      size: "0.8 MB",
      lastUpdated: "2024-03-08",
      level: "Beginner",
      pages: 30,
      author: "Support Team"
    }
  ],
  videos: [
    {
      title: "Getting Started Tutorial Series",
      description: "Complete video series for beginners",
      type: "Video",
      icon: <PlayCircle className="h-6 w-6 text-red-500" />,
      format: "MP4",
      size: "150 MB",
      lastUpdated: "2024-03-10",
      level: "Beginner",
      duration: "45 min",
      episodes: 5,
      instructor: "Dr. Sarah Chen"
    },
    {
      title: "Advanced Analysis Techniques",
      description: "Deep dive into advanced analysis methods",
      type: "Video",
      icon: <LineChart className="h-6 w-6 text-blue-500" />,
      format: "MP4",
      size: "200 MB",
      lastUpdated: "2024-03-08",
      level: "Advanced",
      duration: "60 min",
      episodes: 3,
      instructor: "Prof. James Wilson"
    },
    {
      title: "Data Visualization Masterclass",
      description: "Learn to create publication-quality visualizations",
      type: "Video",
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      format: "MP4",
      size: "180 MB",
      lastUpdated: "2024-03-05",
      level: "Intermediate",
      duration: "90 min",
      episodes: 4,
      instructor: "Dr. Maria Rodriguez"
    },
    {
      title: "Case Studies & Examples",
      description: "Real-world examples and case studies",
      type: "Video",
      icon: <Microscope className="h-6 w-6 text-green-500" />,
      format: "MP4",
      size: "250 MB",
      lastUpdated: "2024-03-01",
      level: "Intermediate",
      duration: "120 min",
      episodes: 6,
      instructor: "Dr. Alex Thompson"
    }
  ],
  academic: [
    {
      title: "Research Methodology Guide",
      description: "Comprehensive guide to research methodologies",
      type: "Academic",
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      format: "PDF",
      size: "5 MB",
      lastUpdated: "2024-03-05",
      level: "Advanced",
      pages: 200,
      authors: ["Dr. Emily Brown", "Prof. Michael Lee"],
      citations: 45
    },
    {
      title: "Statistical Analysis Methods",
      description: "Advanced statistical methods for gene expression",
      type: "Academic",
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      format: "PDF",
      size: "3.2 MB",
      lastUpdated: "2024-03-03",
      level: "Advanced",
      pages: 150,
      authors: ["Dr. Robert Chen"],
      citations: 32
    },
    {
      title: "Publication Guidelines",
      description: "Standards and guidelines for publishing research",
      type: "Academic",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      format: "PDF",
      size: "2.8 MB",
      lastUpdated: "2024-03-01",
      level: "Intermediate",
      pages: 95,
      authors: ["Dr. Lisa Wang", "Dr. John Smith"],
      citations: 28
    },
    {
      title: "Literature Review",
      description: "Comprehensive review of recent research",
      type: "Academic",
      icon: <BookOpen className="h-6 w-6 text-orange-500" />,
      format: "PDF",
      size: "4.5 MB",
      lastUpdated: "2024-02-28",
      level: "Advanced",
      pages: 180,
      authors: ["Dr. Sarah Johnson", "Prof. David Wilson"],
      citations: 67
    }
  ]
};

const faqs = [
  {
    question: "What is Gene Expression Explorer?",
    answer: "Gene Expression Explorer is a powerful platform for analyzing and visualizing gene expression data. It provides tools for researchers to explore, analyze, and share their findings in an intuitive interface."
  },
  {
    question: "How do I get started?",
    answer: "Begin with our 'Getting Started' tutorial, which covers basic navigation and data upload. You can find it in the Quick Start Guide section."
  },
  {
    question: "What types of data can I analyze?",
    answer: "The platform supports various gene expression data formats, including RNA-seq, microarray, and single-cell sequencing data."
  },
  {
    question: "Is there a learning curve?",
    answer: "While the platform is designed to be user-friendly, we recommend following our structured learning path from beginner to advanced topics."
  }
];

const Learning = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [isResourceViewOpen, setIsResourceViewOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleStartTutorial = (tutorial) => {
    setSelectedTutorial(tutorial);
    setIsVideoOpen(true);
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    setIsResourceViewOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-health-primary/10 to-blue-100/30 rounded-xl p-8 md:p-12">
        <PageTitle 
          title="Learning Center" 
          subtitle="Master Gene Expression Explorer and advance your research" 
        />
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground text-center">
          Discover comprehensive tutorials, resources, and guides to help you make the most of our platform's powerful features.
        </p>
        <div className="max-w-xl mx-auto mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tutorials, resources, and guides..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-health-primary" /> Learning Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow border-0 bg-white/80 dark:bg-background/80">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {tutorial.icon}
                  <Badge variant="outline" className="ml-auto">{tutorial.level}</Badge>
                </div>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {tutorial.duration}
                    </span>
                    <span>Updated: {tutorial.lastUpdated}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutorial.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Prerequisites: {tutorial.prerequisites}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-health-primary"
                      onClick={() => handleStartTutorial(tutorial)}
                    >
                      Start <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  {tutorial.progress > 0 && (
                    <Progress value={tutorial.progress} className="mt-4" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedTutorial?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedTutorial?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
            <video
              className="w-full h-full"
              controls
              autoPlay
              src="/src/pages/Screen Recording 2025-05-31 055742.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="space-y-1">
              <h4 className="font-medium">Topics Covered:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTutorial?.topics.map((topic, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVideoOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resource View Modal */}
      <Dialog open={isResourceViewOpen} onOpenChange={setIsResourceViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-xl">
          {selectedResource && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-health-primary/10 to-blue-100/30 dark:from-health-primary/20 dark:to-blue-900/30">
                    {selectedResource.icon}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      {selectedResource.type}
                    </Badge>
                    <Badge variant="secondary" className="bg-health-primary/10 text-health-primary dark:bg-health-primary/20">
                      {selectedResource.level}
                    </Badge>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {selectedResource.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600 dark:text-gray-300">
                  {selectedResource.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Document Preview */}
                {selectedResource.type === "Documentation" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold mb-4 text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-health-primary" />
                        Document Preview
                      </h3>
                      <div className="aspect-[3/4] bg-white dark:bg-gray-900 rounded-lg shadow-inner p-6 overflow-y-auto border border-gray-100 dark:border-gray-700">
                        <div className="prose dark:prose-invert max-w-none">
                          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Gene Expression Explorer: Detailed User Guide
                          </h1>
                          
                          <div className="space-y-6">
                            <section className="space-y-3">
                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Introduction</h2>
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Welcome to Gene Expression Explorer, an intuitive web-based platform designed to simplify the analysis and visualization of gene expression data. This tool enables users to gain insights into gene activity across different conditions, such as comparing healthy and diseased samples.
                              </p>
                            </section>

                            <section className="space-y-3">
                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Getting Started</h2>
                              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Data Upload:</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                                  <li>
                                    <strong className="text-gray-900 dark:text-white">Supported Data Types:</strong> RNA-seq and microarray data
                                  </li>
                                  <li>
                                    <strong className="text-gray-900 dark:text-white">File Formats:</strong> .CEL, .csv, .txt
                                  </li>
                                </ul>
                              </div>
                            </section>

                            <section className="space-y-3">
                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Data Preprocessing</h2>
                              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Normalization:</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                                  <li>RNA-seq Data Normalization (TPM, RPKM, FPKM)</li>
                                  <li>Microarray Data Normalization</li>
                                </ul>
                              </div>
                            </section>

                            <section className="space-y-3">
                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Analysis Features</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">DEG Analysis</h3>
                                  <p className="text-gray-600 dark:text-gray-300">Identify differentially expressed genes</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Machine Learning</h3>
                                  <p className="text-gray-600 dark:text-gray-300">Advanced classification and prediction</p>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <FileText className="h-4 w-4" /> {selectedResource.format}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <Database className="h-4 w-4" /> {selectedResource.size}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <BookOpen className="h-4 w-4" /> {selectedResource.pages} pages
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(selectedResource)}
                          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsResourceViewOpen(false)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Preview */}
                {selectedResource.type === "Video" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold mb-4 text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <PlayCircle className="h-5 w-5 text-health-primary" />
                        Video Preview
                      </h3>
                      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                        <video
                          className="w-full h-full"
                          controls
                          src="/src/pages/Screen Recording 2025-05-31 055742.mp4"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4" /> Duration: {selectedResource.duration}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <PlayCircle className="h-4 w-4" /> {selectedResource.episodes} episodes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVideoDownload(selectedResource)}
                          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Video
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsResourceViewOpen(false)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Academic Preview */}
                {selectedResource.type === "Academic" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold mb-4 text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-health-primary" />
                        Research Overview
                      </h3>
                      <div className="prose dark:prose-invert max-w-none space-y-6">
                        <section className="space-y-3">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Abstract</h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            This comprehensive {selectedResource.title.toLowerCase()} provides an in-depth analysis
                            of current methodologies and findings in gene expression research.
                          </p>
                        </section>

                        <section className="space-y-3">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Authors</h4>
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                            <p className="text-gray-600 dark:text-gray-300">{selectedResource.authors.join(", ")}</p>
                          </div>
                        </section>

                        <section className="space-y-3">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Key Findings</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Analysis Techniques</h5>
                              <p className="text-gray-600 dark:text-gray-300">Advanced methods for gene expression analysis</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Statistical Methods</h5>
                              <p className="text-gray-600 dark:text-gray-300">Robust statistical approaches</p>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <FileText className="h-4 w-4" /> {selectedResource.format}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <Database className="h-4 w-4" /> {selectedResource.size}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <Bookmark className="h-4 w-4" /> {selectedResource.citations} citations
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(selectedResource)}
                          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsResourceViewOpen(false)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Importance Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" /> Why Gene Expression Explorer Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {importancePoints.map((point, idx) => (
            <Card key={idx} className="border-0 bg-white/80 dark:bg-background/80 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-background w-fit mb-4">
                  {point.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                <p className="text-muted-foreground mb-4">{point.description}</p>
                <div className="space-y-2">
                  {point.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-health-primary" /> Learning Resources
          </h2>
          <div className="flex items-center gap-4">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...resources.documentation, ...resources.videos, ...resources.academic].map((resource, idx) => (
                <ResourceCard 
                  key={idx} 
                  resource={resource} 
                  onViewResource={handleViewResource}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.documentation.map((resource, idx) => (
                <ResourceCard 
                  key={idx} 
                  resource={resource} 
                  onViewResource={handleViewResource}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((resource, idx) => (
                <ResourceCard 
                  key={idx} 
                  resource={resource} 
                  onViewResource={handleViewResource}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.academic.map((resource, idx) => (
                <ResourceCard 
                  key={idx} 
                  resource={resource} 
                  onViewResource={handleViewResource}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-health-primary" /> Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gradient-to-br from-health-primary/5 to-blue-100/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
        <p className="max-w-xl mx-auto text-muted-foreground mb-6">
          Join our community of researchers and start exploring the power of gene expression analysis today.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" className="bg-health-primary text-white hover:bg-health-dark shadow-md">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-health-primary text-health-primary hover:bg-health-primary/10">
            Contact Support <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const handleDownload = (resource) => {
  // Create the content based on resource type
  let content = '';
  
  if (resource.type === "Documentation") {
    content = `Gene Expression Explorer: ${resource.title}

Introduction:
Welcome to Gene Expression Explorer, an intuitive web-based platform designed to simplify the analysis and visualization of gene expression data. This tool enables users to gain insights into gene activity across different conditions, such as comparing healthy and diseased samples.

1. Getting Started: Logging In and Uploading Data
To begin your analysis, you must first log in to the Gene Expression Explorer platform. Once logged in, you will be directed to the main dashboard where you can begin your analysis.

Data Upload:
- Supported Data Types: RNA-seq and microarray data
- File Formats: .CEL, .csv, .txt

2. Data Preprocessing: Normalization and Filtering
Gene Expression Explorer's automated preprocessing pipeline ensures that the data is clean and standardized for analysis.

Normalization:
- RNA-seq Data Normalization (TPM, RPKM, FPKM)
- Microarray Data Normalization

3. Analysis Features
- DEG Analysis: Identify differentially expressed genes
- Machine Learning: Advanced classification and prediction

4. Interactive Visualization
- Volcano Plots
- Heatmaps
- PCA Analysis

5. Export and Results
- Export data in various formats
- Generate publication-ready visualizations
- Share results with collaborators

For more information, visit our documentation or contact support.`;
  } else if (resource.type === "Academic") {
    content = `${resource.title}

Abstract:
This comprehensive ${resource.title.toLowerCase()} provides an in-depth analysis of current methodologies and findings in gene expression research.

Authors:
${resource.authors.join(", ")}

Key Findings:
1. Analysis Techniques
   - Advanced methods for gene expression analysis
   - Comprehensive statistical approaches

2. Research Implications
   - Novel insights into gene expression patterns
   - Implications for future research

3. Future Directions
   - Potential areas for further investigation
   - Emerging trends in the field

Citations: ${resource.citations}`;
  }

  // Create a blob with the content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const handleVideoDownload = (resource) => {
  // For video resources, show a message that videos are stream-only
  alert('Videos are available for streaming only. Please use the video player to watch the content.');
};

const ResourceCard = ({ resource, onViewResource }) => {
  const handleResourceDownload = () => {
    if (resource.type === "Video") {
      handleVideoDownload(resource);
    } else {
      handleDownload(resource);
    }
  };

  return (
    <Card className="border-0 bg-white/80 dark:bg-background/80 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {resource.icon}
          <Badge variant="outline">{resource.type}</Badge>
          <Badge variant="secondary" className="ml-auto">{resource.level}</Badge>
        </div>
        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
        <p className="text-muted-foreground mb-4">{resource.description}</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> {resource.format}
            </span>
            <span className="flex items-center gap-1">
              <Database className="h-4 w-4" /> {resource.size}
            </span>
          </div>
          
          {resource.duration && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> Duration: {resource.duration}
            </div>
          )}
          
          {resource.pages && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" /> {resource.pages} pages
            </div>
          )}
          
          {resource.episodes && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <PlayCircle className="h-4 w-4" /> {resource.episodes} episodes
            </div>
          )}
          
          {resource.authors && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" /> {resource.authors.join(", ")}
            </div>
          )}
          
          {resource.citations && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Bookmark className="h-4 w-4" /> {resource.citations} citations
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-health-primary"
            onClick={() => onViewResource(resource)}
          >
            View Resource <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleResourceDownload}
            className="hover:bg-health-primary/10"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Learning; 