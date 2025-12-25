import { ChatWidget } from "components/chat/ChatWidget";
import { TooltipProvider } from "components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <div className="h-screen w-full bg-gray-50 md:flex md:items-center md:justify-center">
                <div className="w-full h-full md:max-w-2xl md:h-[600px] md:border md:rounded-lg bg-white overflow-hidden">
                    <ChatWidget />
                </div>
            </div>
        </TooltipProvider>
    );
}

export default App;
