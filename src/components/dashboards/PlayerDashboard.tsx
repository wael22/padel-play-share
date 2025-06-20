
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Video, 
  Share2, 
  Download, 
  QrCode, 
  CreditCard, 
  LogOut, 
  Trophy,
  Clock,
  Calendar,
  Users,
  Star
} from 'lucide-react';
import QRScanner from '@/components/recording/QRScanner';
import VideoLibrary from '@/components/video/VideoLibrary';
import { toast } from '@/hooks/use-toast';

interface PlayerDashboardProps {
  user: any;
  onLogout: () => void;
}

const PlayerDashboard = ({ user, onLogout }: PlayerDashboardProps) => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [videos] = useState([
    {
      id: '1',
      title: 'Match vs Carlos & Miguel',
      date: '2024-06-15',
      duration: '45:30',
      thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop',
      court: 'Court 1 - ClubTech',
      locked: false,
      views: 12
    },
    {
      id: '2',
      title: 'Training Session',
      date: '2024-06-12',
      duration: '32:15',
      thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&h=200&fit=crop',
      court: 'Court 2 - PadelMax',
      locked: true,
      views: 0
    },
    {
      id: '3',
      title: 'Tournament Final',
      date: '2024-06-10',
      duration: '1:12:45',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
      court: 'Center Court - Elite Padel',
      locked: false,
      views: 25
    }
  ]);

  const stats = {
    totalMatches: videos.length,
    totalHours: '3.5',
    averageMatch: '42',
    winRate: '72'
  };

  const handleStartRecording = () => {
    setShowQRScanner(true);
  };

  const handleQRScan = (courtData: any) => {
    setShowQRScanner(false);
    toast({
      title: 'Recording Started!',
      description: `Now recording on ${courtData.name}`,
    });
  };

  const handleUnlockVideo = (videoId: string) => {
    if (user.credits > 0) {
      toast({
        title: 'Video Unlocked!',
        description: '1 credit has been used to unlock this video.',
      });
    } else {
      toast({
        title: 'Insufficient Credits',
        description: 'Please top up your credits to unlock this video.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">PadelVar</h1>
                <p className="text-sm text-gray-600">Player Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
                <CreditCard className="w-4 h-4" />
                <span className="font-semibold">{user.credits} Credits</span>
              </div>
              
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profilePhoto} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
                <p className="text-blue-100 mb-4">Ready to record your next epic match?</p>
                <Button 
                  onClick={handleStartRecording}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan Court QR
                </Button>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <Video className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.totalMatches}</div>
              <div className="text-sm text-gray-600">Total Matches</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.totalHours}h</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.averageMatch}min</div>
              <div className="text-sm text-gray-600">Avg Match</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.winRate}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="videos" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="videos">My Videos</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <VideoLibrary 
              videos={videos} 
              userCredits={user.credits}
              onUnlockVideo={handleUnlockVideo}
            />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.profilePhoto} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    {user.phone && <p className="text-gray-600">{user.phone}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Account Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Credits Balance:</span>
                        <Badge variant="secondary">{user.credits} credits</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Member Since:</span>
                        <span>June 2024</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Top Up Credits
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner 
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScanSuccess={handleQRScan}
      />
    </div>
  );
};

export default PlayerDashboard;
