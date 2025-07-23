import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

const formSchema = z.object({
	email: z.email(),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
});

function RouteComponent() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		const { data, error } = await authClient.signIn.email({
			email: values.email,
			password: values.password,
			callbackURL: "/dashboard",
			rememberMe: true,
		});
	}

	return (
		<div className="p-8 flex flex-col items-center justify-center">
			<Card>
				<CardHeader>
					<CardTitle>Welcome</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<Input {...field} placeholder="user@email.com" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<Input {...field} placeholder="********" type="password" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								Don't have an account yet?{" "}
								<Link to={"/signup"} className="text-blue-500 underline">
									Register
								</Link>
							</div>
							<Button variant={"default"} type="submit" className="w-full">
								Login
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
