import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { Inbox } from 'lucide-react';

const items = [
	{
		title: 'Dashboard',
		url: '#',
		icon: Inbox,
	},
];

const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader>
				<ModeToggle />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<div className="flex-1 mt-3 mb-3">
						<div className="text-base font-semibold">Faizan Shaik</div>
						<div className="text-sm text-gray-500">fyzanshaik.work@gmail.com</div>
					</div>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											{item.title}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default AppSidebar;
