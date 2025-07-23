import { useQuery } from "@tanstack/react-query";
import type { location } from "~/db/schema";

export const useLocations = () =>
	useQuery({
		queryKey: ["locations"],
		queryFn: async () => {
			const res = await fetch("/api/locations");
			return res.json() as Promise<(typeof location.$inferSelect)[]>;
		},
	});
