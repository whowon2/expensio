import { createServerFileRoute } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "~/db";
import { location, price, product } from "~/db/schema";

const priceSchema = z.object({
	name: z.string().min(1),
	price: z.number(),
	location: z.string().min(2),
});

export const ServerRoute = createServerFileRoute("/api/prices").methods({
	GET: async ({ request }) => {
		console.info("GET /api/prices @", request.url);

		const data = await db.query.price.findMany({
			with: {
				location: true,
				product: true,
			},
		});

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
	POST: async ({ request }) => {
		console.info("POST /api/prices @", request.url);

		const body = await request.json();

		console.log(body);

		const parsed = priceSchema.safeParse(body);

		if (!parsed.success) {
			return new Response(
				JSON.stringify({ error: z.treeifyError(parsed.error) }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const { name, price: priceValue, location: locationName } = parsed.data;

		const [productRecord] = await db
			.insert(product)
			.values({ name })
			.onConflictDoNothing()
			.returning();

		const productId =
			productRecord?.id ??
			(await db
				.select({ id: product.id })
				.from(product)
				.where(eq(product.name, name))
				.then((r) => r[0].id));

		const [locationRecord] = await db
			.insert(location)
			.values({ name: locationName })
			.onConflictDoNothing()
			.returning();

		const locationId =
			locationRecord?.id ??
			(await db
				.select({ id: location.id })
				.from(location)
				.where(eq(location.name, locationName))
				.then((r) => r[0].id));

		const insertedPrice = await db
			.insert(price)
			.values({
				productId,
				locationId,
				value: priceValue.toString(),
			})
			.returning();

		return new Response(JSON.stringify(insertedPrice[0]), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	},
});
