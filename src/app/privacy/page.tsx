
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

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
            <CardTitle>Privacy Policy for AlphaJoy Kids: ABC, Stories & Art</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>Last Updated:</strong> {lastUpdated || 'Loading...'}</p>

            <p>
              Welcome to "AlphaJoy Kids: ABC, Stories & Art". We are committed to protecting your privacy, especially for our youngest users. This Privacy Policy explains what information we collect and how we use it.
            </p>

            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              We do not collect any personally identifiable information (like name, email, or location) from our users. Our app is designed to be used anonymously and does not require an account to play.
            </p>

            <h2 className="text-lg font-semibold text-foreground">2. Non-Personal Information</h2>
            <p>
              We may collect anonymous, non-personal information to improve the app. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Usage Data:</strong> Which activities are most popular and how they are used.</li>
              <li><strong>Device Information:</strong> The type of device (e.g., mobile or tablet) being used, to help us optimize our design.</li>
            </ul>
             <p>This information is completely anonymous and cannot be used to identify any individual user.</p>

            <h2 className="text-lg font-semibold text-foreground">3. Artificial Intelligence (AI) Features</h2>
            <p>
              Our app uses Artificial Intelligence (AI) to provide a better experience.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Coloring Page Generation:</strong> When a user enters a word (e.g., "Apple") to create a coloring page, that word is sent to an AI service to generate an image. We do not store these words or the generated images.</li>
               <li><strong>Adaptive Difficulty:</strong> The app analyzes anonymous gameplay data (like success rate and time taken in tracing games) to suggest a more suitable difficulty level. This data is not linked to any individual and is processed ephemerally.</li>
            </ul>

            <h2 className="text-lg font-semibold text-foreground">4. Advertisements</h2>
            <p>
             To keep the app free, we display advertisements within the mobile application using Google AdMob. We have configured our ad settings to be suitable for a family and child-friendly audience. Google may use advertising identifiers to serve ads. For more information on how Google handles data, please review Google's Privacy & Terms. No ads are shown on our website.
            </p>

            <h2 className="text-lg font-semibold text-foreground">5. Children's Privacy</h2>
            <p>
              Our application is designed for children. We are committed to protecting children's privacy and do not knowingly collect any personal information from them in compliance with the Children's Online Privacy Protection Act (COPPA) and other applicable regulations. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so we can take appropriate action.
            </p>

            <h2 className="text-lg font-semibold text-foreground">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-lg font-semibold text-foreground">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us through our app store listing page.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
