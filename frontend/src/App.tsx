import { ChatWidget } from "@/components/chat/ChatWidget";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <div className="App min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[calc(100vh-2rem)] min-h-[500px] max-h-[800px]">
          <ChatWidget />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
