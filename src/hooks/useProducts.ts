import { useQuery } from "@tanstack/react-query";
import type { product } from "~/db/schema";

export const useProducts = () =>
	useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await fetch("/api/products");
			return res.json() as Promise<(typeof product.$inferSelect)[]>;
		},
	});
