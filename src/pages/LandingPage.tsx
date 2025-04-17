
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, AlertTriangle, Award, Users, PieChart, Car } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-civitrack-blue-800 to-civitrack-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white text-civitrack-blue-800 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">CiviTrack</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            A centralized smart traffic violation management system powered by AI
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-civitrack-blue-800 hover:bg-gray-100" asChild>
              <Link to="/register">Register</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CiviTrack offers a comprehensive solution for both citizens and traffic authorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-civitrack-blue-50 p-3 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-civitrack-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Violation Management</h3>
              <p className="text-gray-600">
                View, manage, and pay for traffic violations all in one place with photo evidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-civitrack-blue-50 p-3 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-civitrack-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
              <p className="text-gray-600">
                Automated detection of traffic violations using advanced AI and CCTV integration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-civitrack-blue-50 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-civitrack-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Driver Score System</h3>
              <p className="text-gray-600">
                Maintain a good driver score, earn rewards, and avoid license suspension.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-civitrack-blue-50 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-civitrack-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Appeal System</h3>
              <p className="text-gray-600">
                Fair and transparent appeal process with AI-assisted review system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-civitrack-blue-50 p-3 rounded-full mb-4">
                <PieChart className="h-8 w-8 text-civitrack-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Traffic Analytics</h3>
              <p className="text-gray-600">
                Data-driven insights for authorities to improve traffic management and safety.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-civitrack-blue-50 p-3 rounded-full mb-4">
                <Car className="h-8 w-8 text-civitrack-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Citizen Reporting</h3>
              <p className="text-gray-600">
                Report traffic violations you witness to help make roads safer for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CiviTrack makes traffic violation management simple and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 bg-civitrack-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-semibold mb-4 mt-2">Register & Login</h3>
              <p className="text-gray-600 mb-4">
                Create your account with your license number and personal details to get started.
              </p>
              <Button variant="outline" className="mt-auto" asChild>
                <Link to="/register">Register Now</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 bg-civitrack-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-semibold mb-4 mt-2">Manage Violations</h3>
              <p className="text-gray-600 mb-4">
                View your violations, pay fines online, or submit appeals with supporting evidence.
              </p>
              <Button variant="outline" className="mt-auto" asChild>
                <Link to="/login">View Dashboard</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 bg-civitrack-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-semibold mb-4 mt-2">Improve Your Score</h3>
              <p className="text-gray-600 mb-4">
                Maintain good driving habits, avoid violations, and earn rewards for safe driving.
              </p>
              <Button variant="outline" className="mt-auto" asChild>
                <Link to="/login">Check Your Score</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-civitrack-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join CiviTrack today to manage your traffic violations efficiently and become a safer driver.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-civitrack-blue-800 hover:bg-gray-100" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
