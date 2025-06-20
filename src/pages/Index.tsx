
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Users, Building2, Crown, Video, QrCode, Share2, Trophy } from 'lucide-react';
import LoginModal from '@/components/auth/LoginModal';
import PlayerDashboard from '@/components/dashboards/PlayerDashboard';
import ClubDashboard from '@/components/dashboards/ClubDashboard';
import SuperAdminDashboard from '@/components/dashboards/SuperAdminDashboard';

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setShowLogin(true);
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser({ ...user, role: selectedRole });
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
  };

  if (currentUser) {
    switch (currentUser.role) {
      case 'player':
        return <PlayerDashboard user={currentUser} onLogout={handleLogout} />;
      case 'club':
        return <ClubDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin':
        return <SuperAdminDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PadelVar
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Record • Share • Play</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Elevate Your Padel Game
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Record, analyze, and share your padel matches with the ultimate platform for players and clubs. 
              Connect with the padel community and take your game to the next level.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover-scale">
              <Video className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Recording</h3>
              <p className="text-gray-600 text-center">QR code court integration for seamless match recording</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover-scale">
              <Share2 className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Social Sharing</h3>
              <p className="text-gray-600 text-center">Share highlights instantly on social media platforms</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover-scale">
              <Trophy className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-center">Connect players and clubs in one unified platform</p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Choose Your Role</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-xl transition-all duration-300 hover-scale border-2 hover:border-blue-200 cursor-pointer group"
                    onClick={() => handleRoleSelect('player')}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-600">Player</CardTitle>
                  <CardDescription>Record and share your matches</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Personal video library</li>
                    <li>• QR code court scanning</li>
                    <li>• Social media sharing</li>
                    <li>• Credit-based system</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Join as Player
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover-scale border-2 hover:border-green-200 cursor-pointer group"
                    onClick={() => handleRoleSelect('club')}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-green-600">Club</CardTitle>
                  <CardDescription>Manage your courts and players</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Court video management</li>
                    <li>• Player activity tracking</li>
                    <li>• Credit top-up system</li>
                    <li>• Analytics dashboard</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Join as Club
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover-scale border-2 hover:border-purple-200 cursor-pointer group"
                    onClick={() => handleRoleSelect('admin')}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-purple-600">Super Admin</CardTitle>
                  <CardDescription>Platform administration</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• User management</li>
                    <li>• Global video access</li>
                    <li>• Credit administration</li>
                    <li>• System analytics</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    Admin Access
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        role={selectedRole}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
