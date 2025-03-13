import { create } from 'zustand';

interface NavigationHistoryState {
  history: string[];
  currentIndex: number;
  addUrl: (url: string) => void;
  goBack: () => string | null;
  goForward: () => string | null;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  getCurrentUrl: () => string | null;
  getHistory: () => string[];
  clearHistory: () => void;
}

export const useNavigationHistory = create<NavigationHistoryState>((set, get) => ({
  history: [],
  currentIndex: -1,
  
  addUrl: (url: string) => {
    const { history, currentIndex } = get();
    
    // If we're not at the end of the history, remove all entries after current index
    const newHistory = currentIndex < history.length - 1 
      ? history.slice(0, currentIndex + 1) 
      : [ ...history ];
    
    // Only add URL if it's different from the current one
    if (currentIndex === -1 || url !== newHistory[currentIndex]) {
      newHistory.push(url);
      set({ 
        history: newHistory,
        currentIndex: newHistory.length - 1
      });
    }
  },
  
  goBack: () => {
    const { history, currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
      return history[currentIndex - 1];
    }
    return null;
  },
  
  goForward: () => {
    const { history, currentIndex } = get();
    if (currentIndex < history.length - 1) {
      set({ currentIndex: currentIndex + 1 });
      return history[currentIndex + 1];
    }
    return null;
  },
  
  canGoBack: () => {
    return get().currentIndex > 0;
  },
  
  canGoForward: () => {
    const { history, currentIndex } = get();
    return currentIndex < history.length - 1;
  },
  
  getCurrentUrl: () => {
    const { history, currentIndex } = get();
    return currentIndex >= 0 ? history[currentIndex] : null;
  },
  
  getHistory: () => {
    return get().history;
  },
  
  clearHistory: () => {
    set({ history: [], currentIndex: -1 });
  }
}));
