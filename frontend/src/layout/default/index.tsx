import { Toaster } from "sonner";
import { NewNotePopup } from "../../components/notes/popup/newnote-popup";
import { useNote } from "../../provider/note-provider";
import { Header } from "./header";

interface PopoutLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: PopoutLayoutProps) {
  const { showNewNotePopup } = useNote();
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-full overflow-hidden relative ">
        {showNewNotePopup && <NewNotePopup />}
        {children}
      </div>
      <Toaster />
    </div>
  );
}
