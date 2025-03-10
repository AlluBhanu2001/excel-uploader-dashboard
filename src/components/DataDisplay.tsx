
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatFileSize } from '@/utils/fileUtils';

interface DataItem {
  [key: string]: any;
}

interface DataSummary {
  rowCount: number;
  columnCount: number;
  sheets: number;
}

interface DataDisplayProps {
  data: DataItem[];
  fileName: string;
  fileSize: string;
  processedAt: string;
  summary: DataSummary;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, fileName, fileSize, processedAt, summary }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Get table headers from the first data item
  const headers = Object.keys(data[0]);

  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="glassmorphism">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl">Analysis Results</CardTitle>
              <CardDescription>Processed on {new Date(processedAt).toLocaleString()}</CardDescription>
            </div>
            <Badge variant="outline" className="self-start sm:self-center px-3 py-1">
              {fileName} ({fileSize})
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
              <span className="text-3xl font-semibold text-primary">{summary.rowCount}</span>
              <span className="text-sm text-muted-foreground">Rows</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
              <span className="text-3xl font-semibold text-primary">{summary.columnCount}</span>
              <span className="text-sm text-muted-foreground">Columns</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
              <span className="text-3xl font-semibold text-primary">{summary.sheets}</span>
              <span className="text-sm text-muted-foreground">Sheets</span>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="rounded-lg overflow-hidden border">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/70">
                  {headers.map((header) => (
                    <TableHead key={header} className="font-medium">
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index} className="hover:bg-secondary/30 transition-colors">
                    {headers.map((header) => (
                      <TableCell key={`${index}-${header}`}>
                        {typeof item[header] === 'number' 
                          ? header.toLowerCase().includes('price') || header.toLowerCase().includes('total') 
                            ? `$${item[header].toFixed(2)}` 
                            : item[header].toString()
                          : item[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataDisplay;
