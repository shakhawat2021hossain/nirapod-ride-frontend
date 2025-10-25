import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-2xl border-0 text-center">
          <CardHeader className="pb-4">
            {/* Animated 404 */}
            <div className="relative mb-6">
              <div className="text-8xl font-bold text-primary opacity-20 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  404
                </div>
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold mb-2">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-lg">
              Oops! The page you're looking for seems to have taken a wrong turn.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Illustration */}
            <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-muted-foreground" />
            </div>

            {/* Suggestions */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p>This might be because:</p>
              <ul className="space-y-1 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  The page has been moved or deleted
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  You typed the wrong URL
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  The link might be broken
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button asChild className="flex-1 gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Still lost? <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;