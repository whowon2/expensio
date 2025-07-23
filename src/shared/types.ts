// server/types.ts or shared/types.ts

import type { db } from "~/db";

export type PriceWithRelationsArray = Awaited<
	ReturnType<typeof db.query.price.findMany>
>;
