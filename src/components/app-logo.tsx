
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
            fill
            className="object-contain"
            sizes="(max-width: 768px) 40px, 64px"
        />
    </div>
  );
}
