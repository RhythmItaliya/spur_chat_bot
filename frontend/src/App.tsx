import { ChatWidget } from "components/chat/ChatWidget";
import { TooltipProvider } from "components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
                <div className="w-11/12 h-[50vh] md:max-w-2xl md:h-[600px] border rounded-lg bg-white shadow-lg">
                    <ChatWidget />
                </div>
            </div>
        </TooltipProvider>
    );
}

export default App;
