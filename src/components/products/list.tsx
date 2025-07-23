import { usePrices } from "~/hooks/usePrices";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function PricesList() {
	const { data: prices, isPending } = usePrices();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!prices) {
		return <div>No prices found</div>;
	}

	return (
		<div className="w-full max-w-xl">
			<pre>{JSON.stringify(prices, null, 2)}</pre>
			<DataTable columns={columns} data={prices} />
		</div>
	);
}
