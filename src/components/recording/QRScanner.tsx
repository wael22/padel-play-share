
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Camera, Play, Square, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (courtData: any) => void;
}

const QRScanner = ({ isOpen, onClose, onScanSuccess }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<any>(null);

  // Mock court data - in a real app, this would come from QR scanning
  const mockCourts = [
    {
      id: 'court-1',
      name: 'Court 1',
      club: 'Elite Padel Club',
      location: 'Downtown Center',
      qrCode: 'QR001',
      status: 'available'
    },
    {
      id: 'court-2',
      name: 'Court 2',
      club: 'Elite Padel Club',
      location: 'Downtown Center',
      qrCode: 'QR002',
      status: 'available'
    },
    {
      id: 'court-3',
      name: 'Court A',
      club: 'PadelMax Center',
      location: 'Sports Complex',
      qrCode: 'QR003',
      status: 'available'
    }
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate QR scanning delay
    setTimeout(() => {
      setIsScanning(false);
      const randomCourt = mockCourts[Math.floor(Math.random() * mockCourts.length)];
      setSelectedCourt(randomCourt);
      
      toast({
        title: 'Court Detected!',
        description: `Found ${randomCourt.name} at ${randomCourt.club}`,
      });
    }, 2000);
  };

  const handleStartRecording = () => {
    if (selectedCourt) {
      setIsRecording(true);
      onScanSuccess(selectedCourt);
      
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false);
        setSelectedCourt(null);
        onClose();
      }, 3000);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setSelectedCourt(null);
    onClose();
    
    toast({
      title: 'Recording Stopped',
      description: 'Your match video has been saved to your library.',
    });
  };

  const handleSelectCourt = (court: any) => {
    setSelectedCourt(court);
    toast({
      title: 'Court Selected',
      description: `Ready to record on ${court.name}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>Court Scanner</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedCourt && !isScanning && !isRecording && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <QrCode className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Scan Court QR Code</h3>
                <p className="text-gray-600 text-sm">
                  Point your camera at the QR code on the court to start recording
                </p>
              </div>
              
              <Button 
                onClick={handleStartScan}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>

              {/* Manual Court Selection for Demo */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3">Or select a court manually:</p>
                <div className="space-y-2">
                  {mockCourts.map((court) => (
                    <Card 
                      key={court.id} 
                      className="cursor-pointer hover:shadow-md transition-all duration-200"
                      onClick={() => handleSelectCourt(court)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{court.name}</div>
                            <div className="text-sm text-gray-600">{court.club}</div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            {court.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="text-center space-y-4 animate-pulse">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto">
                <Camera className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Scanning...</h3>
                <p className="text-gray-600 text-sm">
                  Point your camera at the QR code
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}

          {selectedCourt && !isRecording && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <MapPin className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedCourt.name}</h3>
                <p className="text-gray-600 text-sm">{selectedCourt.club}</p>
                <p className="text-gray-500 text-xs">{selectedCourt.location}</p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCourt(null)}
                  className="flex-1"
                >
                  Change Court
                </Button>
                <Button 
                  onClick={handleStartRecording}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              </div>
            </div>
          )}

          {isRecording && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">Recording in Progress</h3>
                <p className="text-gray-600 text-sm">{selectedCourt?.name} - {selectedCourt?.club}</p>
                <div className="flex items-center justify-center space-x-2 text-red-600 font-mono text-lg">
                  <span>00:03</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <Button 
                onClick={handleStopRecording}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
