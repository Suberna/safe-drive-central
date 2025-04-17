
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { Eye, AlertTriangle, Ban, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminUsers = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: 'u1',
          name: 'John Doe',
          email: 'john@example.com',
          driverScore: 85,
          licenseNumber: 'DL-1234567890',
          role: 'user',
          status: 'active'
        },
        {
          id: 'u2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          driverScore: 65,
          licenseNumber: 'DL-0987654321',
          role: 'user',
          status: 'active'
        },
        {
          id: 'u3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          driverScore: 35,
          licenseNumber: 'DL-5678901234',
          role: 'user',
          status: 'warning'
        },
        {
          id: 'u4',
          name: 'Alice Brown',
          email: 'alice@example.com',
          driverScore: 20,
          licenseNumber: 'DL-4321098765',
          role: 'user',
          status: 'suspended'
        },
        {
          id: 'u5',
          name: 'Admin User',
          email: 'admin@civitrack.gov',
          driverScore: 100,
          licenseNumber: 'ADM-123456',
          role: 'admin',
          status: 'active'
        }
      ];
      
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, [currentUser, isAdmin, navigate]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleUpdateStatus = (userId: string, newStatus: 'active' | 'warning' | 'suspended') => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    setFilteredUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    const action = newStatus === 'suspended' ? 'suspended' : (newStatus === 'warning' ? 'flagged' : 'activated');
    
    toast({
      title: `User ${action}`,
      description: `User has been ${action} successfully.`,
      variant: newStatus === 'suspended' ? 'destructive' : (newStatus === 'warning' ? 'default' : 'default'),
    });
  };

  const getStatusBadge = (status: string, score: number) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getScoreClassName = (score: number) => {
    if (score >= 70) return "text-green-600 font-medium";
    if (score >= 40) return "text-yellow-600 font-medium";
    return "text-red-600 font-medium";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600">View and manage registered users, their scores, and license status.</p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search by name, email, or license number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Driver Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.licenseNumber}</TableCell>
                      <TableCell className={getScoreClassName(user.driverScore)}>
                        {user.driverScore}
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status || 'active', user.driverScore)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => console.log('View user', user.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {user.role !== 'admin' && (
                            <>
                              {user.status !== 'warning' && user.driverScore < 50 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-yellow-600"
                                  onClick={() => handleUpdateStatus(user.id, 'warning')}
                                >
                                  <AlertTriangle className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {user.status !== 'suspended' && user.driverScore < 30 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-red-600"
                                  onClick={() => handleUpdateStatus(user.id, 'suspended')}
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {(user.status === 'warning' || user.status === 'suspended') && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-green-600"
                                  onClick={() => handleUpdateStatus(user.id, 'active')}
                                >
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
