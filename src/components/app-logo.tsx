
import { cn } from "@/lib/utils";
import Image from 'next/image';

/**
 * A reusable component for the app logo.
 * It uses the Next.js Image component for optimization.
 * The logo image file should be placed in the `public` folder.
 */
export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
        <Image
            src="/logo.png"
            alt="Play Pad App Logo"
            width={40}
            height={40}
            className="object-contain"
        />
    </div>
  );
}
