import { Routes, Route } from "react-router-dom";
import FormPage from "./components/pages/FormPage";
import { SidebarProvider } from "./components/ui/sidebar";
import { FarmerForm } from "./components/custom/FarmerForm";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
	return (
		<>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<SidebarProvider>
					<Routes>
						<Route path="/" element={<FormPage />} />
						<Route path="/farmerform" element={<FarmerForm />} />
					</Routes>
				</SidebarProvider>
			</ThemeProvider>
		</>
	);
};
export default App;
