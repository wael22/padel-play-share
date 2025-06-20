
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Crown, 
  Users, 
  Building2, 
  Video, 
  CreditCard, 
  LogOut, 
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SuperAdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const SuperAdminDashboard = ({ user, onLogout }: SuperAdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [systemStats] = useState({
    totalUsers: 1247,
    totalClubs: 56,
    totalVideos: 8943,
    totalRevenue: 45678,
    activeRecordings: 23,
    monthlyGrowth: 12.5
  });

  const [players] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      credits: 5,
      videosCount: 23,
      joinDate: '2024-01-15',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      credits: 12,
      videosCount: 45,
      joinDate: '2024-02-20',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  const [clubs] = useState([
    {
      id: '1',
      name: 'Elite Padel Club',
      email: 'admin@elitepadel.com',
      courts: 8,
      players: 156,
      joinDate: '2024-01-10',
      status: 'active',
      monthlyRevenue: 4500
    },
    {
      id: '2',
      name: 'PadelMax Center',
      email: 'info@padelmax.com',
      courts: 6,
      players: 98,
      joinDate: '2024-02-15',
      status: 'active',
      monthlyRevenue: 3200
    }
  ]);

  const [recentVideos] = useState([
    {
      id: '1',
      title: 'Tournament Final - Court 1',
      player: 'Carlos Rodriguez',
      club: 'Elite Padel Club',
      date: '2024-06-20',
      duration: '1:12:45',
      views: 87,
      thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Training Session',
      player: 'Maria Garcia',
      club: 'PadelMax Center',
      date: '2024-06-20',
      duration: '45:30',
      views: 34,
      thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&h=200&fit=crop'
    }
  ]);

  const handleCreateUser = (type: 'player' | 'club') => {
    toast({
      title: `Create ${type === 'player' ? 'Player' : 'Club'}`,
      description: `${type === 'player' ? 'Player' : 'Club'} creation form would open here.`,
    });
  };

  const handleDeleteUser = (id: string, type: 'player' | 'club') => {
    toast({
      title: 'User Deleted',
      description: `${type === 'player' ? 'Player' : 'Club'} has been deleted successfully.`,
    });
  };

  const handleManageCredits = (playerId: string) => {
    toast({
      title: 'Credit Management',
      description: 'Credit management dialog would open here.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">PadelVar Admin</h1>
                <p className="text-sm text-gray-600">System Administration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Super Admin
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
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">System Overview</h2>
                <p className="text-purple-100 mb-4">Complete platform administration and analytics</p>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleCreateUser('player')}
                    className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Player
                  </Button>
                  <Button 
                    onClick={() => handleCreateUser('club')}
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Club
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8 animate-fade-in">
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{systemStats.totalUsers}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{systemStats.totalClubs}</div>
              <div className="text-sm text-gray-600">Total Clubs</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Video className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{systemStats.totalVideos}</div>
              <div className="text-sm text-gray-600">Total Videos</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">${systemStats.totalRevenue}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <Video className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{systemStats.activeRecordings}</div>
              <div className="text-sm text-gray-600">Live Recordings</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">+{systemStats.monthlyGrowth}%</div>
              <div className="text-sm text-gray-600">Growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="players" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="videos">All Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="players">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search players..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleCreateUser('player')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Player
                </Button>
              </div>
              
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
                            <p className="text-xs text-gray-500">Joined: {player.joinDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{player.credits}</div>
                            <div className="text-xs text-gray-600">Credits</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{player.videosCount}</div>
                            <div className="text-xs text-gray-600">Videos</div>
                          </div>
                          <Badge variant={player.status === 'active' ? 'default' : 'secondary'}>
                            {player.status}
                          </Badge>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleManageCredits(player.id)}>
                              <CreditCard className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUser(player.id, 'player')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clubs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clubs..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleCreateUser('club')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Club
                </Button>
              </div>
              
              <div className="space-y-4">
                {clubs.map((club) => (
                  <Card key={club.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{club.name}</h3>
                            <p className="text-sm text-gray-600">{club.email}</p>
                            <p className="text-xs text-gray-500">Joined: {club.joinDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{club.courts}</div>
                            <div className="text-xs text-gray-600">Courts</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{club.players}</div>
                            <div className="text-xs text-gray-600">Players</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">${club.monthlyRevenue}</div>
                            <div className="text-xs text-gray-600">Revenue</div>
                          </div>
                          <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>
                            {club.status}
                          </Badge>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUser(club.id, 'club')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                    <div className="absolute top-2 left-2 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs">
                      {video.views} views
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Player: {video.player}</div>
                      <div>Club: {video.club}</div>
                      <div>Date: {video.date}</div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Analytics charts would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Revenue charts would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
