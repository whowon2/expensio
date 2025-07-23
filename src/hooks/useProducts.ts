import { useQuery } from "@tanstack/react-query";

export const useProducts = () =>
	useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await fetch("/api/products");
			return res.json() as Promise<
				{
					id: string;
					name: string;
					prices: {
						id: number;
						value: string;
						createdAt: Date;
						location: {
							id: number;
							name: string;
						};
					}[];
				}[]
			>;
		},
	});
