import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-2 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back to Home</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-headline">Privacy Policy</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Privacy Policy for Play Pad: ABC, Stories & Art</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <p>
              Welcome to "Play Pad: ABC, Stories & Art". We are committed to protecting your privacy, especially for our youngest users. This Privacy Policy explains what information we collect and how we use it.
            </p>

            <h2 className="text-lg font-semibold text-foreground">Information We Collect</h2>
            <p>
              We do not collect any personally identifiable information from our users. Our app is designed to be used anonymously. We do not require users to create an account, and we do not ask for personal details like name, email address, or location.
            </p>

            <h2 className="text-lg font-semibold text-foreground">Advertisements</h2>
            <p>
              Our app displays advertisements through Google AdSense. Google AdSense may use cookies to serve ads based on a user's prior visits to this and other websites. These ads are managed by Google and are subject to Google's privacy policies. We have configured our ad settings to be suitable for a family and child-friendly audience.
            </p>

            <h2 className="text-lg font-semibold text-foreground">Non-Personal Information</h2>
            <p>
              We may collect non-personal information, such as device type and app usage data (e.g., which activities are most popular). This information is collected to improve the app's performance and user experience and is completely anonymous.
            </p>

            <h2 className="text-lg font-semibold text-foreground">Children's Privacy</h2>
            <p>
              Our application is designed for children. We do not knowingly collect any personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so we can take appropriate action.
            </p>

            <h2 className="text-lg font-semibold text-foreground">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-lg font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us through the app store listing page.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
