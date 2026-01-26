import { Button } from "../ui/button";

export function SoundConfiguration() {
  return (
    <div className="w-full h-fit flex flex-wrap items-center align-start justify-center gap-2 p-4 bg-card">
      <Button
        variant="outline"
        className="w-36 font-bold text-foreground cursor-pointer transition-colors !bg-chart-2 hover:!bg-chart-2/40"
      >
        config
      </Button>
      <Button
        variant="outline"
        className="w-36 font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
      >
        config
      </Button>
      <Button
        variant="outline"
        className="w-36 font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
      >
        config
      </Button>
      <Button
        variant="outline"
        className="w-36 font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
      >
        config
      </Button>
      <Button
        variant="outline"
        className="w-36 font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
      >
        config
      </Button>
    </div>
  );
}
