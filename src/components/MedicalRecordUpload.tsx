import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  extractedSymptoms?: string[];
  analysisResult?: {
    symptoms: string[];
    conditions: string[];
    recommendations: string[];
    confidence: number;
  };
}

interface MedicalRecordUploadProps {
  onSymptomsDetected?: (symptoms: string[]) => void;
  onAnalysisComplete?: (analysis: any) => void;
}

const MedicalRecordUpload: React.FC<MedicalRecordUploadProps> = ({
  onSymptomsDetected,
  onAnalysisComplete
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsProcessing(true);

    // Simulate file upload and analysis
    for (const file of newFiles) {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, uploadProgress: progress }
              : f
          )
        );
      }

      // Change to analyzing status
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'analyzing', uploadProgress: 100 }
            : f
        )
      );

      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock analysis results
      const mockAnalysis = {
        symptoms: ['headache', 'fatigue', 'nausea', 'dizziness'],
        conditions: ['migraine', 'tension headache', 'cluster headache'],
        recommendations: [
          'Consult with a neurologist',
          'Keep a headache diary',
          'Consider stress management techniques'
        ],
        confidence: 0.85
      };

      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: 'completed',
                extractedSymptoms: mockAnalysis.symptoms,
                analysisResult: mockAnalysis
              }
            : f
        )
      );

      // Trigger callbacks
      if (onSymptomsDetected) {
        onSymptomsDetected(mockAnalysis.symptoms);
      }
      if (onAnalysisComplete) {
        onAnalysisComplete(mockAnalysis);
      }
    }

    setIsProcessing(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'analyzing':
        return <Loader2 className="h-4 w-4 animate-spin text-secondary" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'analyzing':
        return 'Analyzing document...';
      case 'completed':
        return 'Analysis complete';
      case 'error':
        return 'Analysis failed';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Medical Record Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mx-auto flex flex-col items-center space-y-4">
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Upload Medical Records</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOC, DOCX, TXT files (max 10MB)
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {getStatusText(file.status)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {file.status === 'uploading' && (
                  <Progress value={file.uploadProgress} className="h-2" />
                )}

                {file.status === 'completed' && file.analysisResult && (
                  <div className="space-y-3 pt-2 border-t">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Detected Symptoms</h4>
                      <div className="flex flex-wrap gap-1">
                        {file.extractedSymptoms?.map((symptom, index) => (
                          <Badge> key={index} variant="secondary" className="text-xs"&gt;{symptom}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Possible Conditions 
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          ({Math.round(file.analysisResult.confidence * 100)}% confidence)
                        </span>
                      </h4>
                      <ul className="text-xs space-y-1">
                        {file.analysisResult.conditions.map((condition, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Recommendations</h4>
                      <ul className="text-xs space-y-1">
                        {file.analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-secondary mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalRecordUpload;