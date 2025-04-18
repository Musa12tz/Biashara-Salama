
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-6xl font-bold text-kuza-600">404</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mb-4 text-muted-foreground">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild>
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
