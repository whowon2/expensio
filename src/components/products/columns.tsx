"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
	name: string;
	price: string;
	location: string;
};

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "location",
		header: "Location",
	},
];
