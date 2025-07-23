import { zodResolver } from "@hookform/resolvers/zod";
import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

const formSchema = z.object({
	email: z.email(),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});

function RouteComponent() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		const { data, error } = await authClient.signUp.email({
			email: values.email,
			password: values.password,
			name: values.name,
			callbackURL: "/dashboard",
		});

		if (error) {
			toast.error(error.message);
		}

		if (data) {
			toast.success("Account created successfully!");
			navigate({ href: "/dashboard" });
		}
	}

	return (
		<div className="p-8 flex flex-col items-center justify-center">
			<Card>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
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
							<FormField
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<Input {...field} placeholder="User" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								Already have an account?{" "}
								<Link to={"/login"} className="text-blue-500 underline">
									Login
								</Link>
							</div>
							<Button variant={"default"} type="submit" className="w-full">
								Register
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
