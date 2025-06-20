
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Lock, 
  Share2, 
  Download, 
  Calendar, 
  Clock, 
  MapPin,
  Eye,
  Heart,
  MoreVertical
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Video {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
  court: string;
  locked: boolean;
  views: number;
}

interface VideoLibraryProps {
  videos: Video[];
  userCredits: number;
  onUnlockVideo: (videoId: string) => void;
}

const VideoLibrary = ({ videos, userCredits, onUnlockVideo }: VideoLibraryProps) => {
  const handleShareVideo = (video: Video) => {
    // Simulate sharing
    navigator.clipboard.writeText(`Check out my padel match: ${video.title}`);
    toast({
      title: 'Link Copied!',
      description: 'Video link copied to clipboard.',
    });
  };

  const handleDownloadVideo = (video: Video) => {
    if (video.locked) {
      onUnlockVideo(video.id);
    } else {
      toast({
        title: 'Downloading...',
        description: 'Your video download has started.',
      });
    }
  };

  const handlePlayVideo = (video: Video) => {
    if (video.locked) {
      onUnlockVideo(video.id);
    } else {
      toast({
        title: 'Playing Video',
        description: `Now playing: ${video.title}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Video Library</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {videos.length} videos
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 hover-scale overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Video overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  size="sm"
                  onClick={() => handlePlayVideo(video)}
                  className="bg-white/90 text-gray-800 hover:bg-white"
                >
                  {video.locked ? <Lock className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {video.locked ? 'Unlock' : 'Play'}
                </Button>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </div>

              {/* Lock indicator */}
              {video.locked && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white p-1 rounded">
                  <Lock className="w-3 h-3" />
                </div>
              )}

              {/* Views */}
              <div className="absolute top-2 right-2 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-2 mb-1">{video.title}</h3>
                <div className="flex items-center text-xs text-gray-600 space-x-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{video.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{video.court}</span>
                  </div>
                </div>
              </div>

              {video.locked && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Locked Video</span>
                    </div>
                    <span className="text-xs text-yellow-600">1 credit</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Use 1 credit to unlock and download this video
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleShareVideo(video)}
                    className="flex items-center space-x-1"
                  >
                    <Share2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownloadVideo(video)}
                    className="flex items-center space-x-1"
                    disabled={video.locked && userCredits === 0}
                  >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
                
                <Button size="sm" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
          <p className="text-gray-600 mb-6">Start recording your matches to build your video library!</p>
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            Record Your First Match
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
