
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-3xl text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Welcome to Your Dashboard</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A powerful tool for processing and visualizing data from Excel files
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card className="card-hover">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Process Excel Files</h3>
              <p className="text-muted-foreground mb-6">
                Upload Excel files (.xlsx, .xls, .csv) and analyze the data with our powerful processing engine
              </p>
              <Link to="/dashboard" className="mt-auto">
                <Button className="w-full">
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="M18.4 8.64L12 15l-3.05-3-6.95 7"/><path d="m19 5-7 7"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Visualize Results</h3>
              <p className="text-muted-foreground mb-6">
                View your data in beautiful tables and charts for better insights and decision making
              </p>
              <Link to="/dashboard" className="mt-auto">
                <Button variant="outline" className="w-full">
                  Explore Features
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-16 text-sm text-muted-foreground animate-fade-in">
        <p>Build beautiful applications with intuitive file processing capabilities</p>
      </div>
    </div>
  );
};

export default Index;
