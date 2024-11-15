import { Button } from "../ui/button";
import AppSidebar from "./AppSidebar";
import DetailsTable from "./DetailsTable";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const Page = () => {
	return (
		<div className="flex h-screen w-full">
			<AppSidebar />
			<main className="flex-1 my-4 mx-8 ">
				<div className="flex flex-col">
					<p className="text-3xl font-semibold">Dashboard</p>
					<div className="ml-auto flex gap-2 mb-2">
						<Button>Add new field</Button>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant={"outline"}>Export Document</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Export as</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>CSV</DropdownMenuItem>
								<DropdownMenuItem>Json</DropdownMenuItem>
								<DropdownMenuItem>XLSX</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Farmer Details Dashboard</CardTitle>
					</CardHeader>
					<CardContent>
						<DetailsTable />
					</CardContent>
				</Card>
			</main>
		</div>
	);
};
export default Page;
