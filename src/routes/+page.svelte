<script lang="ts">
	import { browser } from '$app/environment';
	import AddressTypeahead from '$lib/AddressTypeahead.svelte';
	import { type Location } from '$lib/Location';
	import { Input } from '$lib/components/ui/input';
	import { t } from '$lib/i18n/translation';
	import type { Match } from '$lib/openapi';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { ChevronDown } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';

	const urlParams = browser ? new URLSearchParams(window.location.search) : undefined;

	let fromParam: Match | undefined = undefined;
	let toParam: Match | undefined = undefined;
	if (browser && urlParams && urlParams.has('from') && urlParams.has('to')) {
		fromParam = JSON.parse(urlParams.get('from') ?? '') ?? {};
		toParam = JSON.parse(urlParams.get('to') ?? '') ?? {};
	}
	let fromMatch = { match: fromParam };
	let toMatch = { match: fromParam };
	let from = $state<Location>({
		label: fromParam ? fromParam['name'] : '',
		value: fromParam ? fromMatch : {}
	});
	let to = $state<Location>({
		label: toParam ? toParam['name'] : '',
		value: toParam ? toMatch : {}
	});
	let fromItems = $state<Array<Location>>([]);
	let toItems = $state<Array<Location>>([]);
</script>

<div class="h-screen p-2">
	{#if page.state.selectFrom}
		<AddressTypeahead placeholder={t.from} bind:selected={from} items={fromItems} />
	{:else if page.state.selectTo}
		<AddressTypeahead placeholder={t.to} bind:selected={to} items={toItems} />
	{:else}
		<div class="flex h-full flex-col gap-4">
			<div class="relative flex flex-col gap-4">
				<Input
					placeholder={t.from}
					class="text-sm"
					onfocus={() => {
						pushState('', {
							selectFrom: true,
							selectTo: false
						});
					}}
					value={from.label}
				/>
				<Input
					placeholder={t.to}
					class="text-sm"
					onfocus={() => {
						pushState('', {
							selectFrom: false,
							selectTo: true
						});
					}}
					value={to.label}
				/>
				<Button
					class="absolute right-4 top-6 z-10 rounded-full"
					size="icon"
					onclick={() => {
						const tmp = to;
						to = from;
						from = tmp;

						const tmpItems = toItems;
						toItems = fromItems;
						fromItems = tmpItems;
					}}
				>
					<ArrowUpDown class="size-2" />
				</Button>
			</div>
			<div class="flex gap-4">
				<Button class="h-8 grow text-center text-xs font-medium">
					Depart at Thu, Jan 12, 14:21
					<ChevronDown />
				</Button>
				<Button class="h-8  text-center text-xs font-medium">
					All Modes
					<ChevronDown />
				</Button>
			</div>
			<div class="flex grow flex-col gap-4 overflow-y-auto">
				<Card.Root class="border-input">
					<Card.Content class="flex flex-col gap-4 p-4">
						<div class="flex gap-4">
							<span>5 hr 23 min</span>
							<Separator orientation="vertical" />
							2 Transfers
						</div>
						<span>16:00 (Thursday) - 07:58 (Friday)</span>
						<div class="flex gap-4">
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 1102
							</div>
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 101
							</div>
							<div
								class="w-32 rounded-md border bg-accent px-2 py-1 text-center text-sm font-semibold"
							>
								RB 75
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root class="border-input">
					<Card.Content class="flex flex-col gap-4 p-4">
						<div class="flex gap-4">
							<span>5 hr 23 min</span>
							<Separator orientation="vertical" />
							2 Transfers
						</div>
						<span>16:00 (Thursday) - 07:58 (Friday)</span>
						<div class="flex gap-4">
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 1102
							</div>
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 101
							</div>
							<div
								class="w-32 rounded-md border bg-accent px-2 py-1 text-center text-sm font-semibold"
							>
								RB 75
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root class="border-input">
					<Card.Content class="flex flex-col gap-4 p-4">
						<div class="flex gap-4">
							<span>5 hr 23 min</span>
							<Separator orientation="vertical" />
							2 Transfers
						</div>
						<span>16:00 (Thursday) - 07:58 (Friday)</span>
						<div class="flex gap-4">
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 1102
							</div>
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 101
							</div>
							<div
								class="w-32 rounded-md border bg-accent px-2 py-1 text-center text-sm font-semibold"
							>
								RB 75
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root class="border-input">
					<Card.Content class="flex flex-col gap-4 p-4">
						<div class="flex gap-4">
							<span>5 hr 23 min</span>
							<Separator orientation="vertical" />
							2 Transfers
						</div>
						<span>16:00 (Thursday) - 07:58 (Friday)</span>
						<div class="flex gap-4">
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 1102
							</div>
							<div class="w-48 rounded-md border px-2 py-1 text-center text-sm font-semibold">
								ICE 101
							</div>
							<div
								class="w-32 rounded-md border bg-accent px-2 py-1 text-center text-sm font-semibold"
							>
								RB 75
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	{/if}
</div>
