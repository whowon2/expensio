import { createServerFileRoute } from "@tanstack/react-start/server";
import { db } from "~/db";
import { location } from "~/db/schema";

export const ServerRoute = createServerFileRoute("/api/locations").methods({
	GET: async ({ request }) => {
		console.info("GET /api/locations @", request.url);

		const data = await db.select().from(location);

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
});
