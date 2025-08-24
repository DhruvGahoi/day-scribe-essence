import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Camera, Mic, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiaryEntry {
  id: string;
  date: string;
  textContent: string;
  audioTranscript: string;
  images: string[];
  timestamp: number;
}

interface DiaryGalleryProps {
  entries: DiaryEntry[];
  onViewEntry: (entry: DiaryEntry) => void;
}

export function DiaryGallery({ entries, onViewEntry }: DiaryGalleryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPreviewText = (entry: DiaryEntry) => {
    const content = entry.textContent || entry.audioTranscript;
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-subheading font-heading mb-2">No entries yet</h3>
        <p className="text-body text-muted-foreground">
          Start writing your first diary entry to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 animate-sequence">
        <h2 className="text-heading-lg font-heading">Your Journey</h2>
        <p className="text-subheading text-muted-foreground">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in your diary
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, index) => (
          <Card
            key={entry.id}
            className={cn(
              "p-6 shadow-card card-hover cursor-pointer animate-sequence",
              "border-2 border-transparent hover:border-diary-accent"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onViewEntry(entry)}
          >
            {/* Entry Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(entry.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                {entry.textContent && (
                  <div className="p-1 rounded-full bg-primary/10">
                    <Clock className="h-3 w-3 text-primary" />
                  </div>
                )}
                {entry.audioTranscript && (
                  <div className="p-1 rounded-full bg-diary-accent/20">
                    <Mic className="h-3 w-3 text-diary-accent" />
                  </div>
                )}
                {entry.images.length > 0 && (
                  <div className="p-1 rounded-full bg-secondary/50">
                    <Camera className="h-3 w-3 text-secondary-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Entry Preview */}
            <div className="space-y-3">
              {entry.images.length > 0 && (
                <div className="relative">
                  <img
                    src={entry.images[0]}
                    alt="Entry preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {entry.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      +{entry.images.length - 1}
                    </div>
                  )}
                </div>
              )}

              <p className="text-body text-foreground leading-relaxed">
                {getPreviewText(entry)}
              </p>
            </div>

            {/* View Button */}
            <Button
              variant="ghost"
              className="w-full mt-4 text-diary-accent hover:bg-diary-accent/10"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Full Entry
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}