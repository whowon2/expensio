import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useProducts } from "~/hooks/useProducts";

export function PricesList() {
	const { data: products, isPending } = useProducts();

	if (isPending) return <div>Loading...</div>;

	if (!products?.length) return <div>No prices found</div>;

	// Helper: Get the lowest price entry
	function getLowestPrice(
		prices: {
			id: number;
			value: string;
			createdAt: Date;
			location: { id: number; name: string };
		}[],
	) {
		if (!prices.length) return null;

		return prices.reduce((min, p) =>
			parseFloat(p.value) < parseFloat(min.value) ? p : min,
		);
	}

	// Helper: Format price to R$ x.xx
	function formatPrice(value: string | number) {
		return `R$ ${parseFloat(value.toString()).toFixed(2)}`;
	}

	return (
		<div className="w-full max-w-xl mx-auto">
			<div className="flex flex-col gap-4">
				{products.map((product) => {
					const lowest = getLowestPrice(product.prices);

					return (
						<Card key={product.id}>
							<CardHeader>
								<CardTitle>{product.name}</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-2 text-sm text-gray-700">
								{/* Lowest Price */}
								{lowest ? (
									<div>
										<span className="font-medium">Lowest Price:</span>{" "}
										{formatPrice(lowest.value)} at {lowest.location.name}
									</div>
								) : (
									<div>No prices available</div>
								)}

								{/* Latest Prices */}
								{product.prices.length > 0 && (
									<div>
										<span className="font-medium">Recent Prices:</span>
										<ul className="list-disc list-inside">
											{product.prices.map((price) => (
												<li key={price.id}>
													{formatPrice(price.value)} at {price.location.name} (
													{new Date(price.createdAt).toLocaleDateString()})
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Future: Add price history chart or similar */}
								{/* <div>History (coming soon)</div> */}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
