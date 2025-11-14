export function useChatHistory() {
  const getHistory = () => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("ai-studio-chat-history");
    return data ? JSON.parse(data) : [];
  };

  const saveMessage = (message: any) => {
    const history = getHistory();
    history.push(message);
    localStorage.setItem("ai-studio-chat-history", JSON.stringify(history));
  };

  const clearHistory = () => {
    localStorage.removeItem("ai-studio-chat-history");
  };

  return { getHistory, saveMessage, clearHistory };
}

export function useImageHistory() {
  const getHistory = () => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("ai-studio-image-history");
    return data ? JSON.parse(data) : [];
  };

  const saveImage = (image: any) => {
    const history = getHistory();
    history.push(image);
    localStorage.setItem("ai-studio-image-history", JSON.stringify(history));
  };

  const clearHistory = () => {
    localStorage.removeItem("ai-studio-image-history");
  };

  return { getHistory, saveImage, clearHistory };
}
