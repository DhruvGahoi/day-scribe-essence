import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Square, Play, Pause, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioRecorderProps {
  onTranscriptUpdate: (transcript: string) => void;
}

export function AudioRecorder({ onTranscriptUpdate }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks: BlobPart[] = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = URL.createObjectURL(audioBlob);
        audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
      }
    }
  };

  const processAudio = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    
    // Simulate audio processing (replace with actual Groq/Whisper API call)
    setTimeout(() => {
      const mockTranscript = "This is a sample transcription of your audio recording. In a real implementation, this would be processed by Groq with Whisper for accurate speech-to-text conversion.";
      onTranscriptUpdate(mockTranscript);
      setIsProcessing(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 bg-gradient-surface">
      <div className="flex flex-col items-center space-y-6">
        {/* Recording Button */}
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            "w-20 h-20 rounded-full transition-all duration-300",
            isRecording && "animate-pulse shadow-floating"
          )}
        >
          {isRecording ? (
            <Square className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>

        {/* Recording Status */}
        <div className="text-center">
          {isRecording ? (
            <div className="space-y-2">
              <p className="text-body-lg text-destructive font-medium">Recording...</p>
              <p className="text-subheading font-mono">{formatTime(recordingTime)}</p>
            </div>
          ) : audioBlob ? (
            <p className="text-body text-muted-foreground">Recording ready</p>
          ) : (
            <p className="text-body text-muted-foreground">Tap to start recording</p>
          )}
        </div>

        {/* Audio Controls */}
        {audioBlob && (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={playAudio}
              className="flex items-center space-x-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </Button>
            
            <Button
              onClick={processAudio}
              disabled={isProcessing}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>{isProcessing ? 'Processing...' : 'Transcribe'}</span>
            </Button>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </Card>
  );
}