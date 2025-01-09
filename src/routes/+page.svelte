<script lang="ts">
	import { browser } from '$app/environment';
	import AddressTypeahead from '$lib/AddressTypeahead.svelte';
	import { type Location } from '$lib/Location';
	import { Input } from '$lib/components/ui/input';
	import { t } from '$lib/i18n/translation';
	import { plan, type Itinerary, type Match, type PlanData, type PlanResponse } from '$lib/openapi';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { lngLatToStr } from '$lib/lngLatToStr';
	import ItineraryList from './ItineraryList.svelte';
	import ConnectionDetail from './ConnectionDetail.svelte';

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

	const toPlaceString = (l: Location) => {
		if (l.value.match?.type === 'STOP') {
			return l.value.match.id;
		} else if (l.value.match?.level) {
			return `${lngLatToStr(l.value.match!)},${l.value.match.level}`;
		} else {
			return `${lngLatToStr(l.value.match!)},0`;
		}
	};
	let baseQuery = $derived(
		from.value.match && to.value.match
			? ({
					query: {
						time: new Date().toISOString(),
						fromPlace: toPlaceString(from),
						toPlace: toPlaceString(to),
						timetableView: true
					}
				} as PlanData)
			: undefined
	);

	type Timeout = ReturnType<typeof setTimeout>;
	let baseResponse = $state<Promise<PlanResponse>>();
	let routingResponses = $state<Array<Promise<PlanResponse>>>([]);
	let searchDebounceTimer: Timeout;
	$effect(() => {
		if (baseQuery) {
			clearTimeout(searchDebounceTimer);
			searchDebounceTimer = setTimeout(() => {
				const base = plan<true>(baseQuery).then((response) => response.data);
				baseResponse = base;
				routingResponses = [base];
			}, 400);
		}
	});

	let connectionsEl = $state<HTMLDivElement>();
	onMount(() => {
		if (connectionsEl) {
			connectionsEl.scrollTop = 48;
		}
	});
</script>

<div class="h-screen p-2">
	{#if page.state.selectFrom}
		<AddressTypeahead placeholder={t.from} bind:selected={from} items={fromItems} />
	{:else if page.state.selectTo}
		<AddressTypeahead placeholder={t.to} bind:selected={to} items={toItems} />
	{:else if page.state.selectedItinerary}
		<ConnectionDetail
			itinerary={page.state.selectedItinerary}
			onClickStop={(name: string, stopId: string, time: Date) =>
				pushState('', { stop: { name, stopId, time } })}
			onClickTrip={(tripId: string) => pushState('', { tripId })}
		/>
	{:else}
		<div class="flex h-full flex-col gap-4">
			<div class="relative flex flex-col gap-4">
				<Input
					placeholder={t.from}
					class="text-sm"
					onfocus={() => pushState('', { selectFrom: true })}
					value={from.label}
				/>
				<Input
					placeholder={t.to}
					class="text-sm"
					onfocus={() => pushState('', { selectTo: true })}
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
				<Button class="h-8 grow gap-1 text-center text-sm font-medium">
					Abfahrt Do, Jan 12, 14:21
					<ChevronDown />
				</Button>
				<Button class="h-8  gap-1 text-center text-sm font-medium">
					All Modes
					<ChevronDown />
				</Button>
			</div>
			<div bind:this={connectionsEl} class="flex grow flex-col gap-4 overflow-y-auto">
				<ItineraryList
					{baseQuery}
					{baseResponse}
					{routingResponses}
					selectItinerary={(it: Itinerary) => pushState('', { selectedItinerary: it })}
				/>
			</div>
		</div>
	{/if}
</div>
