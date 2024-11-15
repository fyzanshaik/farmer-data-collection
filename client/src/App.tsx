import Page from "./components/custom/Page";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";

const App = () => {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<SidebarProvider>
					<Page />
				</SidebarProvider>
			</ThemeProvider>
		</>
	);
};
export default App;
