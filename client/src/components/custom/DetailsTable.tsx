import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import data from "../../../mock_db/data.json";

const DetailsTable = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Age</TableHead>
					<TableHead>Phone Number</TableHead>
					<TableHead>Country</TableHead>
					<TableHead>Postal Code</TableHead>
					<TableHead>Farm Size</TableHead>
					<TableHead>A/c Number</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.id}>
						<TableCell>{item.id}</TableCell>
						<TableCell>{item.full_name}</TableCell>
						<TableCell>{item.age}</TableCell>
						<TableCell>{item.phone}</TableCell>
						<TableCell>{item.country}</TableCell>
						<TableCell>{item.postal_code}</TableCell>
						<TableCell>{item.farm_size_acres}</TableCell>
						<TableCell>{item.account_number}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default DetailsTable;
