import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PenTool, BookOpen, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomePageProps {
  onCreateEntry: () => void;
  onViewEntries: () => void;
  entriesCount: number;
}

export function HomePage({ onCreateEntry, onViewEntries, entriesCount }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-16 animate-blur-in">
        <div className="space-y-4">
          <h1 className="text-heading-xl font-heading bg-gradient-primary bg-clip-text text-transparent">
            Daily Diary
          </h1>
          <p className="text-subheading text-muted-foreground max-w-2xl mx-auto">
            Capture your precious moments through words, voice, and photos. 
            Create beautiful digital scrapbooks of your daily journey.
          </p>
        </div>

        {/* Stats */}
        {entriesCount > 0 && (
          <div className="flex items-center justify-center space-x-8 text-center animate-sequence-delay-1">
            <div className="space-y-1">
              <p className="text-heading-md font-heading text-diary-primary">{entriesCount}</p>
              <p className="text-body text-muted-foreground">
                {entriesCount === 1 ? 'Entry' : 'Entries'}
              </p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="space-y-1">
              <p className="text-heading-md font-heading text-diary-accent">
                {Math.ceil(entriesCount / 7)}
              </p>
              <p className="text-body text-muted-foreground">
                {Math.ceil(entriesCount / 7) === 1 ? 'Week' : 'Weeks'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Create New Entry */}
        <Card
          className={cn(
            "p-8 shadow-card card-hover cursor-pointer animate-sequence-delay-1",
            "border-2 border-transparent hover:border-diary-accent",
            "bg-gradient-surface"
          )}
          onClick={onCreateEntry}
        >
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-16 h-16">
              <div className="absolute inset-0 bg-diary-accent/20 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-diary-accent rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-subheading font-heading">Start Today's Entry</h3>
              <p className="text-body text-muted-foreground">
                Share your thoughts, record your voice, or add photos from your day
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <PenTool className="h-4 w-4" />
                <span>Write</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>Record</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Photo</span>
              </div>
            </div>
          </div>
        </Card>

        {/* View Past Entries */}
        <Card
          className={cn(
            "p-8 shadow-card card-hover cursor-pointer animate-sequence-delay-2",
            "border-2 border-transparent hover:border-diary-primary",
            "bg-gradient-surface"
          )}
          onClick={onViewEntries}
        >
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-16 h-16">
              <div className="absolute inset-0 bg-diary-primary/20 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-diary-primary rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-subheading font-heading">Memory Lane</h3>
              <p className="text-body text-muted-foreground">
                {entriesCount > 0
                  ? `Browse through your ${entriesCount} ${entriesCount === 1 ? 'entry' : 'entries'} and relive beautiful moments`
                  : 'Your diary entries will appear here once you start writing'
                }
              </p>
            </div>

            {entriesCount > 0 && (
              <div className="flex items-center justify-center space-x-2 text-diary-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">{entriesCount} memories waiting</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Features Overview */}
      <div className="grid md:grid-cols-3 gap-6 animate-sequence-delay-3">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-diary-accent/20 rounded-full flex items-center justify-center mx-auto">
            <PenTool className="h-6 w-6 text-diary-accent" />
          </div>
          <h4 className="font-heading text-body-lg">Text & Voice</h4>
          <p className="text-sm text-muted-foreground">
            Write your thoughts or speak them aloud with voice transcription
          </p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-diary-primary/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="h-6 w-6 text-diary-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="font-heading text-body-lg">Photo Memories</h4>
          <p className="text-sm text-muted-foreground">
            Add up to 5 photos per day to capture visual moments
          </p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-6 w-6 text-secondary-foreground" />
          </div>
          <h4 className="font-heading text-body-lg">Beautiful Scrapbooks</h4>
          <p className="text-sm text-muted-foreground">
            Automatically designed layouts that make your memories shine
          </p>
        </div>
      </div>
    </div>
  );
}