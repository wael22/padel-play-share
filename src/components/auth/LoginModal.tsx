
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: string | null;
  onLoginSuccess: (user: any) => void;
}

const LoginModal = ({ isOpen, onClose, role, onLoginSuccess }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const getRoleConfig = () => {
    switch (role) {
      case 'player':
        return {
          title: 'Player',
          color: 'blue',
          icon: User,
          description: 'Join the padel community'
        };
      case 'club':
        return {
          title: 'Club',
          color: 'green',
          icon: Building2,
          description: 'Manage your padel facility'
        };
      case 'admin':
        return {
          title: 'Super Admin',
          color: 'purple',
          icon: Building2,
          description: 'Platform administration'
        };
      default:
        return {
          title: 'User',
          color: 'blue',
          icon: User,
          description: 'Welcome to PadelVar'
        };
    }
  };

  const config = getRoleConfig();
  const IconComponent = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      phone: formData.phone,
      credits: role === 'player' ? 5 : undefined,
      profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };

    toast({
      title: `Welcome ${isLogin ? 'back' : ''} to PadelVar!`,
      description: `Successfully ${isLogin ? 'logged in' : 'registered'} as ${config.title}`,
    });

    onLoginSuccess(user);
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: `user@${provider}.com`,
      name: `${provider} User`,
      credits: role === 'player' ? 5 : undefined,
      profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };

    toast({
      title: `Welcome to PadelVar!`,
      description: `Successfully logged in with ${provider}`,
    });

    onLoginSuccess(user);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 rounded-2xl flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {isLogin ? 'Welcome Back' : 'Join PadelVar'}
          </DialogTitle>
          <p className="text-center text-gray-600">{config.description}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          {!isLogin && role === 'player' && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className={`w-full bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 hover:from-${config.color}-600 hover:to-${config.color}-700`}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {role === 'player' && (
          <>
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('Google')}
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('Facebook')}
              >
                Continue with Facebook
              </Button>
            </div>
          </>
        )}

        <div className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={`text-${config.color}-600 hover:underline font-medium`}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
