import { zodResolver } from "@hookform/resolvers/zod";

import { Check, ChevronsUpDown } from "lucide-react";

import { useForm } from "react-hook-form";

import z from "zod";

import { Button } from "~/components/ui/button";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";

import { Input } from "~/components/ui/input";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

import { useCreatePrice } from "~/hooks/useCreatePrice";

import { useLocations } from "~/hooks/useLocations";

import { useProducts } from "~/hooks/useProducts";

import { cn } from "~/lib/utils";

const formSchema = z.object({
	name: z.string().min(3, {
		message: "Must be at least 3 characters long",
	}),

	price: z.number(),

	location: z.string().min(2, {
		message: "Must be at least 2 characters long",
	}),
});

export function AddPrice() {
	const createPrice = useCreatePrice();

	const { data: products } = useProducts();

	const { data: locations } = useLocations();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),

		defaultValues: {
			name: "",

			price: 0,

			location: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		createPrice.mutate(values);
	}

	if (!products) {
		return <div>Loading...</div>;
	}

	if (!locations) {
		return <div>Loading...</div>;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					name="name"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Product</FormLabel>

							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-full justify-between",

												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? products.find(
														(product) => product.name === field.value,
													)?.name
												: "Select Product"}

											<ChevronsUpDown className="opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>

								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput
											placeholder="Search Product..."
											className="h-9"
										/>

										<CommandList>
											<CommandEmpty>Create Product</CommandEmpty>

											<CommandGroup>
												{products.map((product) => (
													<CommandItem
														value={product.name}
														key={product.id}
														onSelect={() => {
															form.setValue("name", product.name);
														}}
													>
														{product.name}

														<Check
															className={cn(
																"ml-auto",

																product.name === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>

							<Input
								{...form.register("price", { valueAsNumber: true })}
								type="number"
								step={0.01}
							/>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="location"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Location</FormLabel>

							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-full justify-between",

												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? locations.find(
														(location) => location.name === field.value,
													)?.name
												: "Select Location"}

											<ChevronsUpDown className="opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>

								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput
											placeholder="Search Location..."
											className="h-9"
										/>

										<CommandList>
											<CommandEmpty>Create Location</CommandEmpty>

											<CommandGroup>
												{locations.map((location) => (
													<CommandItem
														value={location.name}
														key={location.id}
														onSelect={() => {
															form.setValue("location", location.name);
														}}
													>
														{location.name}

														<Check
															className={cn(
																"ml-auto",

																location.name === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="w-full">Add Product</Button>
			</form>
		</Form>
	);
}
