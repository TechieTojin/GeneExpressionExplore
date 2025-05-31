import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Dataset {
  id: string;
  title: string;
  organism: string;
  samples: number;
  description: string;
}

const suggestedDatasets: Dataset[] = [
  {
    id: "GSE12345",
    title: "Breast Cancer Gene Expression",
    organism: "Homo sapiens",
    samples: 120,
    description: "Gene expression profiling of breast cancer samples using microarray analysis."
  },
  {
    id: "GSE67890",
    title: "Mouse Brain Development",
    organism: "Mus musculus",
    samples: 48,
    description: "Temporal gene expression analysis during mouse brain development."
  },
  {
    id: "GSE54321",
    title: "Plant Stress Response",
    organism: "Arabidopsis thaliana",
    samples: 36,
    description: "Gene expression changes in response to drought stress in Arabidopsis."
  }
];

const DatasetSelector = () => {
  const [customId, setCustomId] = useState("");
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setError(null);
  };

  const handleCustomIdSubmit = async () => {
    if (!customId.trim()) {
      setError("Please enter a dataset ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual GEO API call here
      // This is a placeholder for the API integration
      const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&id=${customId}&retmode=json`);
      const data = await response.json();
      
      // Simulate API response for now
      setSelectedDataset({
        id: customId,
        title: "Custom Dataset",
        organism: "Unknown",
        samples: 0,
        description: "Loading dataset information..."
      });
    } catch (err) {
      setError("Failed to load dataset. Please check the ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDataset = () => {
    if (!selectedDataset) {
      setError("Please select or enter a dataset first");
      return;
    }
    // TODO: Implement dataset loading logic
    console.log("Loading dataset:", selectedDataset.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dataset Selection</h1>
      </div>

      <div className="grid gap-6">
        {/* Custom Dataset Input */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Custom Dataset</CardTitle>
            <CardDescription>Enter a GEO dataset ID (e.g., GSE12345)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter GSE ID"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleCustomIdSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Datasets */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Datasets</CardTitle>
            <CardDescription>Select from our curated list of datasets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {suggestedDatasets.map((dataset) => (
                <Card
                  key={dataset.id}
                  className={`cursor-pointer transition-colors ${
                    selectedDataset?.id === dataset.id
                      ? "border-primary"
                      : "hover:border-muted-foreground"
                  }`}
                  onClick={() => handleDatasetSelect(dataset)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{dataset.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {dataset.organism} • {dataset.samples} samples
                        </p>
                      </div>
                      <span className="text-sm font-mono">{dataset.id}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Dataset Preview */}
        {selectedDataset && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Dataset</CardTitle>
              <CardDescription>Preview of selected dataset information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{selectedDataset.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDataset.organism} • {selectedDataset.samples} samples
                  </p>
                </div>
                <p className="text-sm">{selectedDataset.description}</p>
                <Button 
                  onClick={handleLoadDataset}
                  className="w-full"
                >
                  Load Dataset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DatasetSelector; 