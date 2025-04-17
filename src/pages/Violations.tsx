
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ViolationsList } from '@/components/dashboard/ViolationsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Violation } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getUserViolations } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Violations = () => {
  const { currentUser } = useAuth();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [filteredViolations, setFilteredViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userViolations = getUserViolations(currentUser.id);
      setViolations(userViolations);
      setFilteredViolations(userViolations);
      setIsLoading(false);
    }, 500);
  }, [currentUser, navigate]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredViolations(violations);
      return;
    }
    
    const filtered = violations.filter((violation) => {
      return (
        violation.type.toLowerCase().includes(query) ||
        violation.location.toLowerCase().includes(query) ||
        violation.datetime.toLowerCase().includes(query) ||
        violation.lawReference.toLowerCase().includes(query) ||
        violation.status.toLowerCase().includes(query)
      );
    });
    
    setFilteredViolations(filtered);
  };

  const filterByStatus = (status: string) => {
    if (status === 'all') {
      setFilteredViolations(violations);
    } else {
      const filtered = violations.filter(
        (violation) => violation.status === status
      );
      setFilteredViolations(filtered);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Violations</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Violations</h1>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Search and Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search violations..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={filterByStatus}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="appealed">Appealed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <ViolationsList 
        violations={filteredViolations} 
        title={`${filteredViolations.length} Violation${filteredViolations.length !== 1 ? 's' : ''}`}
        showAll={false}
      />
      
      {filteredViolations.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center mt-6">
          <h3 className="text-lg font-medium mb-2">No violations found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? "No violations match your search criteria." 
              : "You don't have any violations in this category."}
          </p>
          {searchQuery && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setFilteredViolations(violations);
              }}
            >
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Violations;
