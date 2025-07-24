
import { cn } from "@/lib/utils";
import Image from 'next/image';

/**
 * A reusable component for the app logo.
 * It uses the Next.js Image component for optimization.
 * The logo image file should be placed in the `public` folder.
 */
export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-12 w-12", className)}>
        <Image
            src="/logo.png"
            alt="Play Pad App Logo"
            fill
            sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 3vw"
            className="object-contain"
        />
    </div>
  );
}
