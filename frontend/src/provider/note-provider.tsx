import React, { createContext, useContext, useState } from "react";

type NoteProviderProps = {
  children: React.ReactNode;
};

type NoteProviderState = {
  showNewNotePopup: boolean;
  setShowNewNotePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: NoteProviderState = {
  showNewNotePopup: false,
  setShowNewNotePopup: () => {},
};

const NoteProviderContext = createContext<NoteProviderState>(initialState);

export function NoteProvider({ children, ...props }: NoteProviderProps) {
  const [showNewNotePopup, setShowNewNotePopup] = useState(true);

  const value = { showNewNotePopup, setShowNewNotePopup };

  return (
    <NoteProviderContext.Provider {...props} value={value}>
      {children}
    </NoteProviderContext.Provider>
  );
}

export const useNote = () => {
  const context = useContext(NoteProviderContext);

  if (context === undefined)
    throw new Error("useNote must be used within a NoteProvider");

  return context;
};
