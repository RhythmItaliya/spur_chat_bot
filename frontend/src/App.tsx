import { ChatWidget } from "components/chat/ChatWidget";
import { TooltipProvider } from "components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-2xl h-[600px] border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <ChatWidget />
                </div>
            </div>
        </TooltipProvider>
    );
}

export default App;
