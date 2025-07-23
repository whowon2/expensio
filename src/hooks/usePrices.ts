import { useQuery } from "@tanstack/react-query";

export function usePrices() {
	return useQuery({
		queryKey: ["prices"], // 👈 important!
		queryFn: async () => {
			const res = await fetch("/api/prices");
			if (!res.ok) throw new Error("Failed to fetch prices");
			const data = await res.json();
			return data as Awaited<typeof data>;
		},
	});
}
