import { createFileRoute } from "@tanstack/react-router";
import { AddPrice } from "~/components/products/add";
import { PricesList } from "~/components/products/list";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, error, isPending } = authClient.useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!session) {
		return <div>Please log in to access your dashboard.</div>;
	}

	return (
		<div className="flex flex-col items-center gap-4 p-8">
			<AddPrice />
			<PricesList />
		</div>
	);
}
