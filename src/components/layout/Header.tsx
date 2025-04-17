
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center">
              <div className="text-civitrack-blue-700 font-bold text-xl flex items-center gap-2">
                <div className="bg-civitrack-blue-700 text-white p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                </div>
                <span>CiviTrack</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentUser && (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/violations" className="text-gray-600 hover:text-civitrack-blue-700">Violations</Link>
                    <Link to="/admin/users" className="text-gray-600 hover:text-civitrack-blue-700">Users</Link>
                    <Link to="/admin/reports" className="text-gray-600 hover:text-civitrack-blue-700">Reports</Link>
                    <Link to="/admin/analytics" className="text-gray-600 hover:text-civitrack-blue-700">Analytics</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-civitrack-blue-700">Dashboard</Link>
                    <Link to="/violations" className="text-gray-600 hover:text-civitrack-blue-700">My Violations</Link>
                    <Link to="/appeals" className="text-gray-600 hover:text-civitrack-blue-700">Appeals</Link>
                    <Link to="/report" className="text-gray-600 hover:text-civitrack-blue-700">Report Violation</Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link to={isAdmin ? "/admin/notifications" : "/notifications"}>
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-civitrack-red-500"></span>
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`} alt={currentUser.name} />
                        <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={isAdmin ? "/admin/profile" : "/profile"} className="cursor-pointer flex w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button className="bg-civitrack-blue-700 hover:bg-civitrack-blue-800" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-3">
              {currentUser ? (
                isAdmin ? (
                  <>
                    <Link 
                      to="/admin/violations" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Violations
                    </Link>
                    <Link 
                      to="/admin/users" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Users
                    </Link>
                    <Link 
                      to="/admin/reports" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Reports
                    </Link>
                    <Link 
                      to="/admin/analytics" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/violations" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Violations
                    </Link>
                    <Link 
                      to="/appeals" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Appeals
                    </Link>
                    <Link 
                      to="/report" 
                      className="text-gray-600 hover:text-civitrack-blue-700 py-2 px-4 rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Report Violation
                    </Link>
                  </>
                )
              ) : (
                <Link 
                  to="/login" 
                  className="text-civitrack-blue-700 hover:text-civitrack-blue-800 py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              {currentUser && (
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start text-red-600 hover:text-red-800 py-2 px-4"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
