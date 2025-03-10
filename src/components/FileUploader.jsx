
import React, { useState, useRef } from 'react';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { isValidExcelFile, formatFileSize } from '@/utils/fileUtils';

const FileUploader = ({ onFileSelect, isProcessing, error }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndSetFile(files[0]);
    }
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };
  
  const validateAndSetFile = (file) => {
    setFileError(null);
    
    if (!isValidExcelFile(file)) {
      setFileError('Please select a valid Excel or CSV file (.xlsx, .xls, .csv)');
      setSelectedFile(null);
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const getDropAreaClass = () => {
    if (fileError || error) return 'file-drop-area error';
    if (selectedFile && !isProcessing) return 'file-drop-area success';
    if (dragging) return 'file-drop-area dragging';
    return 'file-drop-area idle';
  };
  
  return (
    <Card className="w-full bg-transparent border-none shadow-none mb-8 animate-fade-in">
      <CardContent className="p-0">
        <div
          className={getDropAreaClass()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            id="excelFile"
            ref={fileInputRef}
            className="sr-only"
            accept=".xlsx,.xls,.csv,.ods"
            onChange={handleFileInputChange}
            disabled={isProcessing}
          />
          
          <div className="space-y-4 text-center">
            {selectedFile ? (
              <div className="flex flex-col items-center animate-fade-in">
                <FileCheck className="h-16 w-16 text-green-500 mb-2" />
                <p className="text-lg font-medium text-balance">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {fileError || error ? (
                  <AlertCircle className="h-16 w-16 text-destructive mb-2 animate-pulse-subtle" />
                ) : (
                  <Upload className="h-16 w-16 text-muted-foreground mb-2" />
                )}
                <p className="text-lg font-medium text-balance">
                  {fileError || error || 'Drag & drop your Excel file here'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {fileError || error ? 'Please try again' : 'Or click to browse (supports .xlsx, .xls, .csv)'}
                </p>
              </div>
            )}
            
            {!isProcessing && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
                className="mt-2"
              >
                {selectedFile ? 'Change File' : 'Browse Files'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
