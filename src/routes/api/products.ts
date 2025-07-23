import { createServerFileRoute } from "@tanstack/react-start/server";
import { db } from "~/db";

export const ServerRoute = createServerFileRoute("/api/products").methods({
	GET: async ({ request }) => {
		console.info("GET /api/products @", request.url);

		const data = await db.query.product.findMany({
			with: {
				prices: {
					columns: {
						id: true,
						value: true,
						createdAt: true,
					},
					with: {
						location: true,
					},
				},
				productToTags: {
					with: { tag: true },
				},
			},
		});

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
});
