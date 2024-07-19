import "./App.css";
import { Header } from "@/components/core/Header";

import { MainComponent } from "./components/core/MainComponent";

function App() {
	// try to load figures from local storage if available
	// otherwise load to the local storage

	return (
		<div
			className="flex w-screen flex-col bg-base-100 lg:h-screen lg:max-h-screen"
			onContextMenu={(e) => e.preventDefault()}
		>
			<Header />
			<MainComponent />
		</div>
	);
}

export default App;
