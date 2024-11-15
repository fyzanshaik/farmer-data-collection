import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
	FormDescription,
} from "../ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	dateOfBirth: z.date({ message: "Date of birth is required." }),
	age: z.number().min(1, { message: "Age must be a positive number" }),
	country: z.string().min(1, { message: "Country is required" }),
	state: z.string().min(1, { message: "State is required" }),
	city: z.string().min(1, { message: "City is required" }),
	district: z.string().min(1, { message: "District is required" }),
	mandal: z.string().min(1, { message: "Mandal is required" }),
	village: z.string().min(1, { message: "Village is required" }),
	panchayath: z.string().min(1, { message: "Panchayath is required" }),
	contactNumber: z.string().min(10, { message: "Contact Number is required" }),
	accountNumber: z.string().min(1, { message: "Account Number is required" }),
	ifscCode: z.string().min(1, { message: "IFSC Code is required" }),
	bankDetails: z.string().min(1, { message: "Bank Details are required" }),
	fieldName: z.string().min(1, { message: "Field Name is required" }),
	geoTag: z.string().min(1, { message: "Geo Tag is required" }),
	surveyNo: z.string().min(1, { message: "Survey No. is required" }),
	area: z.number().positive({ message: "Area must be a positive number" }),
	yieldEstimate: z
		.number()
		.positive({ message: "Yield Estimate must be positive" }),
	aadharUpload: z
		.any()
		.refine((file) => file, { message: "Aadhar file is required" }),
	bankAccountUpload: z
		.any()
		.refine((file) => file, { message: "Bank account file is required" }),
	landDocumentUpload: z
		.any()
		.refine((file) => file, { message: "Land document file is required" }),
});

export const FarmerForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			dateOfBirth: undefined,
			age: 0,
			country: "",
			state: "",
			city: "",
			district: "",
			mandal: "",
			village: "",
			panchayath: "",
			contactNumber: "",
			accountNumber: "",
			ifscCode: "",
			bankDetails: "",
			fieldName: "",
			geoTag: "",
			surveyNo: "",
			area: 0,
			yieldEstimate: 0,
		},
	});

	const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date of birth</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormDescription>
									Your date of birth is used to calculate your age.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Age</FormLabel>
								<FormControl>
									<Input placeholder="Enter your age" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a country" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="india">India</SelectItem>
											<SelectItem value="usa">USA</SelectItem>
											<SelectItem value="canada">Canada</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a state" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="telangana">Telangana</SelectItem>
											<SelectItem value="maharashtra">Maharashtra</SelectItem>
											<SelectItem value="punjab">Punjab</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a city" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="mumbai">Mumbai</SelectItem>
											<SelectItem value="nagpur">Nagpur</SelectItem>
											<SelectItem value="pune">Pune</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="district"
						render={({ field }) => (
							<FormItem>
								<FormLabel>District</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a district" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="rangareddy">Ranga Reddy</SelectItem>
											<SelectItem value="sangareddy">Sanga Reddy</SelectItem>
											<SelectItem value="malkajgiri">Malkajgiri</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contactNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contact Number</FormLabel>
								<FormControl>
									<Input placeholder="Enter your contact number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="accountNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>A/c Number</FormLabel>
								<FormControl>
									<Input placeholder="Enter your account number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
};
