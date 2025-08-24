import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Camera, Mic, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiaryEntry {
  id: string;
  date: string;
  textContent: string;
  audioTranscript: string;
  images: string[];
  timestamp: number;
}

interface ScrapbookViewProps {
  entry: DiaryEntry;
  onBack: () => void;
}

export function ScrapbookView({ entry, onBack }: ScrapbookViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const hasContent = entry.textContent || entry.audioTranscript;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-blur-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-heading-md font-heading">Memory Lane</h1>
          <p className="text-body text-muted-foreground">{formatDate(entry.date)}</p>
        </div>
      </div>

      {/* Scrapbook Layout */}
      <div className="relative">
        {/* Main Scrapbook Card */}
        <Card className="p-8 md:p-12 shadow-floating bg-gradient-surface border-2">
          <div className="space-y-8">
            {/* Date Header with Decorative Elements */}
            <div className="text-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <Heart className="h-32 w-32" />
              </div>
              <div className="relative">
                <h2 className="text-heading-lg font-heading text-diary-primary mb-2">
                  {new Date(entry.date).getDate()}
                </h2>
                <p className="text-subheading text-diary-secondary">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Image Gallery - Scrapbook Style */}
            {entry.images.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-diary-accent">
                  <Camera className="h-5 w-5" />
                  <h3 className="text-subheading font-heading">Today's Moments</h3>
                </div>
                
                <div className={cn(
                  "grid gap-4",
                  entry.images.length === 1 && "grid-cols-1",
                  entry.images.length === 2 && "grid-cols-2",
                  entry.images.length >= 3 && "grid-cols-2 md:grid-cols-3",
                  entry.images.length === 5 && "md:grid-cols-3"
                )}>
                  {entry.images.map((image, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative group overflow-hidden rounded-lg shadow-card",
                        "transform hover:scale-105 transition-all duration-300",
                        // Scrapbook-style varied heights
                        index % 3 === 0 && "aspect-[4/5]",
                        index % 3 === 1 && "aspect-square",
                        index % 3 === 2 && "aspect-[5/4]",
                        // Make first image larger if only 1-2 images
                        entry.images.length <= 2 && index === 0 && "md:aspect-[3/2]"
                      )}
                      style={{
                        transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 0.5)}deg)`
                      }}
                    >
                      <img
                        src={image}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Tape effect */}
                      <div className="absolute -top-2 left-4 w-8 h-4 bg-diary-accent/30 rotate-45 shadow-sm"></div>
                      <div className="absolute -top-2 right-4 w-8 h-4 bg-diary-accent/30 -rotate-45 shadow-sm"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Text Content */}
            {entry.textContent && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-diary-primary">
                  <div className="w-6 h-6 rounded-full bg-diary-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-diary-primary"></div>
                  </div>
                  <h3 className="text-subheading font-heading">Written Thoughts</h3>
                </div>
                
                <div className="relative p-6 bg-diary-surface border-l-4 border-diary-accent rounded-r-lg shadow-card">
                  <p className="text-body-lg leading-relaxed text-foreground whitespace-pre-wrap">
                    {entry.textContent}
                  </p>
                  {/* Decorative quote mark */}
                  <div className="absolute top-2 left-2 text-6xl text-diary-accent/20 font-heading leading-none">
                    "
                  </div>
                </div>
              </div>
            )}

            {/* Audio Transcript */}
            {entry.audioTranscript && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-diary-accent">
                  <Mic className="h-5 w-5" />
                  <h3 className="text-subheading font-heading">Spoken Words</h3>
                </div>
                
                <div className="relative p-6 bg-gradient-accent rounded-lg shadow-card">
                  <p className="text-body-lg leading-relaxed text-foreground whitespace-pre-wrap">
                    {entry.audioTranscript}
                  </p>
                  {/* Audio wave decoration */}
                  <div className="absolute bottom-2 right-4 flex items-end space-x-1 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-current rounded-full"
                        style={{ height: `${Math.random() * 20 + 10}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Decoration */}
            <div className="text-center pt-8 border-t border-border">
              <div className="flex items-center justify-center space-x-4 text-diary-secondary">
                <div className="h-px bg-current flex-1 max-w-8"></div>
                <Heart className="h-4 w-4" />
                <div className="h-px bg-current flex-1 max-w-8"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Created with love on {formatDate(entry.date)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}