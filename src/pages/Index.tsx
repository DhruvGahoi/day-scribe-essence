import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { DiaryEntry } from '@/components/DiaryEntry';
import { DiaryGallery } from '@/components/DiaryGallery';
import { ScrapbookView } from '@/components/ScrapbookView';

interface DiaryEntryData {
  id: string;
  date: string;
  textContent: string;
  audioTranscript: string;
  images: string[];
  timestamp: number;
}

type ViewMode = 'home' | 'create' | 'gallery' | 'scrapbook';

const Index = () => {
  const [entries, setEntries] = useState<DiaryEntryData[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntryData | null>(null);

  const handleSaveEntry = (entry: DiaryEntryData) => {
    setEntries(prev => [entry, ...prev]);
    setCurrentView('home');
  };

  const handleViewEntry = (entry: DiaryEntryData) => {
    setSelectedEntry(entry);
    setCurrentView('scrapbook');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'create':
        return <DiaryEntry onSave={handleSaveEntry} />;
      case 'gallery':
        return (
          <DiaryGallery 
            entries={entries} 
            onViewEntry={handleViewEntry}
          />
        );
      case 'scrapbook':
        return selectedEntry ? (
          <ScrapbookView 
            entry={selectedEntry}
            onBack={() => setCurrentView('gallery')}
          />
        ) : null;
      default:
        return (
          <HomePage
            onCreateEntry={() => setCurrentView('create')}
            onViewEntries={() => setCurrentView('gallery')}
            entriesCount={entries.length}
          />
        );
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Index;
