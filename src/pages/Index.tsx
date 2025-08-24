import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { DiaryEntry } from '@/components/DiaryEntry';
import { DiaryGallery } from '@/components/DiaryGallery';
import { ScrapbookView } from '@/components/ScrapbookView';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<DiaryEntryData[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntryData | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
