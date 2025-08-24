import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ImageUpload';
import { AudioRecorder } from '@/components/AudioRecorder';
import { Calendar, Camera, Mic, Type, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiaryEntryProps {
  onSave: (entry: any) => void;
}

export function DiaryEntry({ onSave }: DiaryEntryProps) {
  const [textContent, setTextContent] = useState('');
  const [audioTranscript, setAudioTranscript] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'text' | 'audio'>('text');

  const handleSave = () => {
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      textContent,
      audioTranscript,
      images: images.map(img => URL.createObjectURL(img)),
      timestamp: Date.now()
    };
    onSave(entry);
    // Reset form
    setTextContent('');
    setAudioTranscript('');
    setImages([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-sequence">
      {/* Header */}
      <div className="text-center space-y-2 animate-sequence-delay-1">
        <h2 className="text-heading-lg font-heading">Today's Entry</h2>
        <p className="text-subheading text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Input Method Tabs */}
      <Card className="p-6 shadow-card animate-sequence-delay-2">
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === 'text' ? 'default' : 'outline'}
            onClick={() => setActiveTab('text')}
            className="flex items-center space-x-2"
          >
            <Type className="h-4 w-4" />
            <span>Text Entry</span>
          </Button>
          <Button
            variant={activeTab === 'audio' ? 'default' : 'outline'}
            onClick={() => setActiveTab('audio')}
            className="flex items-center space-x-2"
          >
            <Mic className="h-4 w-4" />
            <span>Audio Entry</span>
          </Button>
        </div>

        {/* Content Input */}
        <div className="space-y-4">
          {activeTab === 'text' ? (
            <Textarea
              placeholder="What happened today? Share your thoughts, feelings, and experiences..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="min-h-[200px] text-body-lg resize-none border-2 focus:border-diary-accent transition-colors"
            />
          ) : (
            <AudioRecorder onTranscriptUpdate={setAudioTranscript} />
          )}

          {audioTranscript && (
            <div className="p-4 bg-accent/20 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Transcribed audio:</p>
              <p className="text-body">{audioTranscript}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Image Upload */}
      <Card className="p-6 shadow-card animate-sequence-delay-3">
        <div className="flex items-center space-x-2 mb-4">
          <Camera className="h-5 w-5 text-diary-accent" />
          <h3 className="text-subheading font-heading">Today's Photos</h3>
          <span className="text-sm text-muted-foreground">({images.length}/5)</span>
        </div>
        <ImageUpload images={images} onImagesChange={setImages} maxImages={5} />
      </Card>

      {/* Save Button */}
      <div className="flex justify-center animate-sequence-delay-3">
        <Button
          onClick={handleSave}
          disabled={!textContent && !audioTranscript}
          className={cn(
            "px-8 py-3 text-body-lg transition-all duration-300",
            "shadow-elevated hover:shadow-floating",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Create Entry
        </Button>
      </div>
    </div>
  );
}