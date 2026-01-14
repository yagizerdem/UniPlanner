// import type { ApiResponse } from "../../../shared/ApiResponse";

declare global {
  interface Window {
    windowController: WindowController;
  }
}

interface WindowController {
  close: () => void;
  minimize: () => void;
  maximize: () => void;
}

export {};
