import { useEffect } from "react";
import { useTheme } from "../../provider/theme-provider";
import { Header } from "./header";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <div className="w-screen h-screen">
      <Header />
      {children}
    </div>
  );
}
