import { createContext, useContext, useState } from "react";

type LinkProviderProps = {
  children: React.ReactNode;
};

type LinkProviderState = {
  showNewLinkPopup: boolean;
  setShowNewLinkPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: LinkProviderState = {
  showNewLinkPopup: false,
  setShowNewLinkPopup: () => {},
};

const LinkProviderContext = createContext<LinkProviderState>(initialState);

export function LinkProvider({ children, ...props }: LinkProviderProps) {
  const [showNewLinkPopup, setShowNewLinkPopup] = useState(false);

  const value = { showNewLinkPopup, setShowNewLinkPopup };

  return (
    <LinkProviderContext.Provider {...props} value={value}>
      {children}
    </LinkProviderContext.Provider>
  );
}

export const useLink = () => {
  const context = useContext(LinkProviderContext);

  if (context === undefined)
    throw new Error("useLink must be used within a LinkProvider");

  return context;
};
