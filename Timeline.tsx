import React, { useState, useEffect, useRef } from 'react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import {
  Download,
  Share2,
  Calendar,
  Filter,
  RefreshCw,
  TrendingUp,
  Activity,
  AlertCircle,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { format, subDays, addDays, parseISO, isValid } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

// Generate dynamic timeline data based on selected filters
const generateTimelineData = (
  selectedGene: string,
  selectedTissue: string,
  selectedCondition: string,
  dateRange: { from: Date; to: Date }
) => {
  const data = [];
  const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i <= days; i++) {
    const currentDate = addDays(dateRange.from, i);
    const baseExpression = Math.random() * 2 + 1; // Base expression level
    
    // Add variation based on selected filters
    let expression = baseExpression;
    if (selectedGene === 'GENE1') expression *= 1.5;
    if (selectedTissue === 'Liver') expression *= 1.2;
    if (selectedCondition === 'Treatment') expression *= 1.3;
    
    // Add some random noise
    expression += (Math.random() - 0.5) * 0.5;
    
    data.push({
      date: format(currentDate, 'MMM dd'),
      expression: parseFloat(expression.toFixed(2)),
      timestamp: currentDate.getTime(),
      fullDate: currentDate, // Store the full date object
    });
  }
  
  return data;
};

// Available options for filters
const availableGenes = ['GENE1', 'GENE2', 'GENE3', 'GENE4', 'GENE5'];
const availableTissues = ['Liver', 'Heart', 'Brain', 'Kidney', 'Lung'];
const availableConditions = ['Control', 'Treatment', 'Disease'];

// Add explanation content
const getGraphExplanation = (
  chartType: 'line' | 'area' | 'bar',
  selectedGene: string,
  selectedTissue: string,
  selectedCondition: string,
  data: any[]
) => {
  const maxExpression = Math.max(...data.map(d => d.expression));
  const minExpression = Math.min(...data.map(d => d.expression));
  const avgExpression = data.reduce((sum, d) => sum + d.expression, 0) / data.length;
  
  const explanations = {
    line: {
      title: "Line Chart Analysis",
      description: `This line chart shows the expression pattern of ${selectedGene} in ${selectedTissue} under ${selectedCondition} conditions. The continuous line helps visualize trends and patterns over time.`,
      insights: [
        `The expression level ranges from ${minExpression.toFixed(2)} to ${maxExpression.toFixed(2)} units.`,
        `Average expression level is ${avgExpression.toFixed(2)} units.`,
        "The line's slope indicates the rate of expression change.",
        "Sharp peaks or valleys suggest significant regulatory events."
      ]
    },
    area: {
      title: "Area Chart Analysis",
      description: `This area chart emphasizes the cumulative expression of ${selectedGene} in ${selectedTissue} during ${selectedCondition}. The filled area helps visualize the magnitude of expression changes.`,
      insights: [
        `Expression intensity varies between ${minExpression.toFixed(2)} and ${maxExpression.toFixed(2)} units.`,
        `The total expression area represents the cumulative effect over time.`,
        "Darker shaded areas indicate higher expression levels.",
        "The area's shape reveals periods of sustained expression."
      ]
    },
    bar: {
      title: "Bar Chart Analysis",
      description: `This bar chart displays discrete expression measurements of ${selectedGene} in ${selectedTissue} under ${selectedCondition} conditions. Each bar represents a specific time point.`,
      insights: [
        `Expression levels range from ${minExpression.toFixed(2)} to ${maxExpression.toFixed(2)} units.`,
        `The average expression is ${avgExpression.toFixed(2)} units.`,
        "Bar height differences show day-to-day variations.",
        "Consistent bar heights indicate stable expression."
      ]
    }
  };

  return explanations[chartType];
};

// Add type for html2canvas options
interface CustomHtml2CanvasOptions {
  scale?: number;
  useCORS?: boolean;
  logging?: boolean;
}

const Timeline: React.FC = () => {
  const today = new Date();
  const [selectedGene, setSelectedGene] = useState(availableGenes[0]);
  const [selectedTissue, setSelectedTissue] = useState(availableTissues[0]);
  const [selectedCondition, setSelectedCondition] = useState(availableConditions[0]);
  const [dateRange, setDateRange] = useState({
    from: subDays(today, 30),
    to: today,
  });
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Update timeline data when filters change
  useEffect(() => {
    const newData = generateTimelineData(
      selectedGene,
      selectedTissue,
      selectedCondition,
      dateRange
    );
    setTimelineData(newData);
  }, [selectedGene, selectedTissue, selectedCondition, dateRange]);

  // Handle date range changes with validation
  const handleDateRangeChange = (type: 'from' | 'to', value: string) => {
    const newDate = parseISO(value);
    if (isValid(newDate)) {
      setDateRange(prev => ({
        ...prev,
        [type]: newDate,
      }));
    }
  };

  // Format date safely
  const formatDate = (date: Date | string | number) => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj) ? format(dateObj, 'MMM dd, yyyy') : 'Invalid Date';
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Render the appropriate chart based on selected type
  const renderChart = () => {
    const commonProps = {
      data: timelineData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="expression"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expression" fill="#8884d8" />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
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
        );
    }
  };

  // Function to export timeline to PDF
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Dynamic import of required libraries
      const [html2canvas, jsPDF] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      if (!chartRef.current) return;

      // Create a canvas from the chart
      const canvas = await html2canvas.default(chartRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      } as CustomHtml2CanvasOptions);

      // Create PDF
      const pdf = new jsPDF.default('landscape', 'mm', 'a4');
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add title and description
      pdf.setFontSize(20);
      pdf.text('Gene Expression Timeline Report', 20, 20);
      pdf.setFontSize(12);
      pdf.text(`Gene: ${selectedGene}`, 20, 30);
      pdf.text(`Tissue: ${selectedTissue}`, 20, 35);
      pdf.text(`Condition: ${selectedCondition}`, 20, 40);
      pdf.text(`Date Range: ${formatDate(dateRange.from)} to ${formatDate(dateRange.to)}`, 20, 45);

      // Add the chart
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        20,
        55,
        imgWidth - 40,
        imgHeight - 40
      );

      // Add insights
      const insights = getGraphExplanation(chartType, selectedGene, selectedTissue, selectedCondition, timelineData).insights;
      pdf.setFontSize(12);
      pdf.text('Key Insights:', 20, imgHeight + 60);
      insights.forEach((insight, index) => {
        pdf.text(`• ${insight}`, 25, imgHeight + 70 + (index * 7));
      });

      // Save the PDF
      pdf.save(`gene-expression-timeline-${selectedGene}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      
      toast({
        title: "Success",
        description: "Timeline exported successfully!",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Error",
        description: "Failed to export timeline",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Function to generate shareable URL
  const handleShare = () => {
    setIsSharing(true);
    try {
      // Create a shareable URL with current state
      const shareData = {
        gene: selectedGene,
        tissue: selectedTissue,
        condition: selectedCondition,
        dateRange: {
          from: dateRange.from.toISOString(),
          to: dateRange.to.toISOString(),
        },
        chartType,
      };
      
      const shareUrl = `${window.location.origin}/timeline?data=${encodeURIComponent(JSON.stringify(shareData))}`;
      setShareUrl(shareUrl);
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Success",
        description: "Share link copied to clipboard!",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Sharing failed:', error);
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expression Timeline</h1>
          <p className="text-muted-foreground mt-1">
            Track gene expression changes over time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setChartType('line')}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Line
          </Button>
          <Button variant="outline" onClick={() => setChartType('area')}>
            <Activity className="mr-2 h-4 w-4" />
            Area
          </Button>
          <Button variant="outline" onClick={() => setChartType('bar')}>
            <AlertCircle className="mr-2 h-4 w-4" />
            Bar
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                onClick={handleShare}
                disabled={isSharing}
              >
                <Share2 className="mr-2 h-4 w-4" />
                {isSharing ? 'Sharing...' : 'Share'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Timeline</DialogTitle>
                <DialogDescription>
                  Share this timeline with others using the link below
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    toast({
                      title: "Success",
                      description: "Link copied to clipboard!",
                    });
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Timeline Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Filters</CardTitle>
          <CardDescription>
            Customize the timeline view by selecting specific parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Gene</Label>
              <Select value={selectedGene} onValueChange={setSelectedGene}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gene" />
                </SelectTrigger>
                <SelectContent>
                  {availableGenes.map((gene) => (
                    <SelectItem key={gene} value={gene}>
                      {gene}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tissue</Label>
              <Select value={selectedTissue} onValueChange={setSelectedTissue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tissue" />
                </SelectTrigger>
                <SelectContent>
                  {availableTissues.map((tissue) => (
                    <SelectItem key={tissue} value={tissue}>
                      {tissue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {availableConditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={format(dateRange.from, 'yyyy-MM-dd')}
                  onChange={(e) => handleDateRangeChange('from', e.target.value)}
                />
                <Input
                  type="date"
                  value={format(dateRange.to, 'yyyy-MM-dd')}
                  onChange={(e) => handleDateRangeChange('to', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Expression Timeline</CardTitle>
          <CardDescription>
            Gene expression changes from {formatDate(dateRange.from)} to {formatDate(dateRange.to)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]" ref={chartRef}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Graph Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>{getGraphExplanation(chartType, selectedGene, selectedTissue, selectedCondition, timelineData).title}</CardTitle>
          <CardDescription>
            {getGraphExplanation(chartType, selectedGene, selectedTissue, selectedCondition, timelineData).description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getGraphExplanation(chartType, selectedGene, selectedTissue, selectedCondition, timelineData).insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Significant Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Significant Changes</CardTitle>
          <CardDescription>
            Notable expression changes in the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineData
              .filter((_, index) => index > 0)
              .map((point, index) => {
                const prevPoint = timelineData[index];
                const change = point.expression - prevPoint.expression;
                if (Math.abs(change) > 0.5) {
                  return (
                    <motion.div
                      key={point.timestamp}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          {formatDate(point.fullDate)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Expression {change > 0 ? 'increased' : 'decreased'} by{' '}
                          {Math.abs(change).toFixed(2)} units
                        </p>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline; 