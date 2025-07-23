import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePrice() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			name: string;
			price: number;
			location: string;
		}) => {
			const res = await fetch("/api/prices", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(input),
			});

			if (!res.ok)
				throw new Error("Failed to add price", {
					cause: await res.text(),
				});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => {
			console.error(err);
		},
	});
}
