import { useQuery } from "@tanstack/react-query";
import type { location, product } from "~/db/schema";

export function usePrices() {
	return useQuery({
		queryKey: ["prices"], // 👈 important!
		queryFn: async () => {
			const res = await fetch("/api/prices");
			if (!res.ok) throw new Error("Failed to fetch prices");
			const data: {
				id: string;
				product: typeof product.$inferSelect;
				location: typeof location.$inferSelect;
			} = await res.json();

			return data;
		},
	});
}
