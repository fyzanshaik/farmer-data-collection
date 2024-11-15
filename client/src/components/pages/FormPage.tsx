import { Button } from '../ui/button';
import AppSidebar from '../custom/AppSidebar';
import DetailsTable from '../custom/DetailsTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const FormPage = () => {
	return (
		<div className="flex h-screen w-full">
			<AppSidebar />
			<main className="flex-1 my-4 mx-8 ">
				<div className="flex flex-col">
					<p className="text-3xl font-semibold">Dashboard</p>
					<div className="ml-auto flex gap-2 mb-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button>ADD FARMER DATA</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md">
								<DialogHeader>
									<DialogTitle>Enter Farmer Details</DialogTitle>
									<DialogDescription>Lorem Ipsum Description for the form...</DialogDescription>
								</DialogHeader>
								<div className="flex items-center space-x-2">
									<div className="grid flex-1 gap-2">
										<Label htmlFor="link" className="sr-only">
											Link
										</Label>
										<Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" />
									</div>
								</div>
								<DialogFooter className="sm:justify-start">
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Close
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant={'outline'}>Export Document</Button>
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
export default FormPage;
