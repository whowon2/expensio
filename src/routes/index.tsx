import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session } = authClient.useSession();

	if (!session) {
		return (
			<div>
				You are not logged!{" "}
				<Link to="/login">
					<Button type="button">Login</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="p-8 font-bold text-xl">
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
}
