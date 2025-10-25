import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogIn, Shield, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-2xl border-0 text-center">
          <CardHeader className="pb-4">
            {/* Animated 401 */}
            <div className="relative mb-6">
              <div className="text-8xl font-bold text-orange-500 opacity-20 select-none">401</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  401
                </div>
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-orange-500" />
              Access Denied
            </CardTitle>
            <CardDescription className="text-lg">
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Illustration */}
            <div className="w-32 h-32 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-orange-500" />
            </div>

            {/* Message */}
            {/* <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This area requires proper authentication. You may need to:
              </p>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 text-left">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Log in with your account credentials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Use an account with the required permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Contact administrator for access rights
                  </li>
                </ul>
              </div>
            </div> */}

            {/* User Role Info */}
            {/* <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 justify-center">
                <Shield className="h-4 w-4 text-blue-500" />
                Available Roles
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium">Rider</div>
                  <div className="text-muted-foreground">Book rides</div>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="font-medium">Driver</div>
                  <div className="text-muted-foreground">Provide rides</div>
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 gap-2"
              >
                Go Back
              </Button>
              <Button asChild className="flex-1 gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Need help? <Link to="/contact" className="text-orange-500 hover:underline">Contact administrator</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnAuthorized;