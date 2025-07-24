import { cn } from "@/lib/utils";

/**
 * A reusable component for the app logo.
 * It's an SVG, so it will be sharp and clear at any size.
 * You can replace the content of this file with your own SVG logo later.
 */
export function AppLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-12 w-12", className)}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect width="100" height="100" rx="24" fill="hsl(var(--primary))" />
      <path
        d="M40 30 L40 70 L65 50 Z"
        fill="hsl(var(--primary-foreground))"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
