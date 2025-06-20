
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Video, 
  Users, 
  CreditCard, 
  LogOut, 
  TrendingUp,
  Calendar,
  MapPin,
  Settings,
  Plus
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ClubDashboardProps {
  user: any;
  onLogout: () => void;
}

const ClubDashboard = ({ user, onLogout }: ClubDashboardProps) => {
  const [courts] = useState([
    { id: '1', name: 'Court 1', status: 'active', qrCode: 'QR001', todayVideos: 5 },
    { id: '2', name: 'Court 2', status: 'active', qrCode: 'QR002', todayVideos: 3 },
    { id: '3', name: 'Court 3', status: 'maintenance', qrCode: 'QR003', todayVideos: 0 },
    { id: '4', name: 'Court 4', status: 'active', qrCode: 'QR004', todayVideos: 7 }
  ]);

  const [recentVideos] = useState([
    {
      id: '1',
      title: 'Court 1 - Match Recording',
      player: 'John Doe',
      date: '2024-06-20',
      duration: '45:30',
      thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Court 2 - Training Session',
      player: 'Maria Garcia',
      date: '2024-06-20',
      duration: '32:15',
      thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Court 4 - Tournament Match',
      player: 'Carlos Rodriguez',
      date: '2024-06-19',
      duration: '1:12:45',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop'
    }
  ]);

  const [players] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      credits: 5,
      videosThisMonth: 8,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      credits: 12,
      videosThisMonth: 15,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Carlos Rodriguez',
      email: 'carlos@example.com',
      credits: 2,
      videosThisMonth: 6,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  const stats = {
    totalVideos: 156,
    activeUsers: 48,
    todayRevenue: 1250,
    activeCourts: courts.filter(c => c.status === 'active').length
  };

  const handleTopUpCredits = (playerId: string) => {
    toast({
      title: 'Credits Added',
      description: '10 credits have been added to the player account.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">PadelVar Club</h1>
                <p className="text-sm text-gray-600">Club Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {stats.activeCourts} Active Courts
              </Badge>
              
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
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Club Dashboard</h2>
                <p className="text-green-100 mb-4">Manage your courts and track player activity</p>
                <div className="flex space-x-4">
                  <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Court
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.totalVideos}</div>
              <div className="text-sm text-gray-600">Total Videos</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.activeUsers}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">${stats.todayRevenue}</div>
              <div className="text-sm text-gray-600">Today Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.activeCourts}/4</div>
              <div className="text-sm text-gray-600">Active Courts</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courts" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courts">Courts</TabsTrigger>
            <TabsTrigger value="videos">Recent Videos</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>

          <TabsContent value="courts">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courts.map((court) => (
                <Card key={court.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{court.name}</CardTitle>
                      <Badge 
                        variant={court.status === 'active' ? 'default' : 'secondary'}
                        className={court.status === 'active' ? 'bg-green-500' : ''}
                      >
                        {court.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">QR Code:</span>
                        <span className="font-mono text-blue-600">{court.qrCode}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Today's Videos:</span>
                        <span className="font-semibold">{court.todayVideos}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3" />
                        <span>{video.player}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>{video.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="players">
            <div className="space-y-4">
              {players.map((player) => (
                <Card key={player.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-gray-600">{player.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{player.credits}</div>
                          <div className="text-xs text-gray-600">Credits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{player.videosThisMonth}</div>
                          <div className="text-xs text-gray-600">Videos</div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleTopUpCredits(player.id)}
                          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Top Up
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClubDashboard;
