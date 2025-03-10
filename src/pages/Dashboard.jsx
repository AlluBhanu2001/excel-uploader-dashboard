
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import FileUploader from '@/components/FileUploader';
import LoadingIndicator from '@/components/LoadingIndicator';
import DataDisplay from '@/components/DataDisplay';
import { Button } from '@/components/ui/button';
import { processExcelFile } from '@/utils/fileUtils';
import { ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    // Clear previous results when a new file is selected
    setApiResponse(null);
  };
  
  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a file before submitting.');
      toast({
        title: 'No file selected',
        description: 'Please select an Excel or CSV file to upload.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Process the file (in a real app, this would call your API)
      const response = await processExcelFile(selectedFile);
      
      setApiResponse(response);
      
      toast({
        title: 'File processed successfully',
        description: `Processed ${selectedFile.name} with ${response.summary.rowCount} rows of data.`,
      });
      
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err.message || 'An error occurred while processing the file.');
      
      toast({
        title: 'Processing failed',
        description: err.message || 'Failed to process the file. Please try again.',
        variant: 'destructive',
      });
      
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header with subtle gradient background */}
      <header className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background z-0" />
        <div className="relative container max-w-5xl mx-auto px-4 z-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-slide-down">
              Build Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Upload your Excel file to analyze and visualize your data in seconds
            </p>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {/* File upload section */}
          <section className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium">Upload Excel File</h2>
              <p className="text-muted-foreground">
                Supported formats: .xlsx, .xls, .csv, .ods
              </p>
            </div>
            
            <FileUploader 
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              error={error}
            />
            
            <div className="flex justify-center">
              <Button 
                onClick={handleSubmit}
                disabled={isProcessing || !selectedFile}
                className="px-8"
                size="lg"
              >
                {isProcessing ? 'Processing...' : 'Submit'} 
                {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </section>
          
          {/* Loading indicator */}
          {isProcessing && <LoadingIndicator />}
          
          {/* Results section */}
          {!isProcessing && apiResponse && (
            <section>
              <DataDisplay 
                data={apiResponse.data}
                fileName={apiResponse.fileName}
                fileSize={apiResponse.fileSize}
                processedAt={apiResponse.processedAt}
                summary={apiResponse.summary}
              />
            </section>
          )}
          
          {/* Empty state */}
          {!isProcessing && !apiResponse && !selectedFile && (
            <div className="text-center py-16 text-muted-foreground animate-fade-in">
              <p>No data available. Please upload an Excel file and click Submit.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
