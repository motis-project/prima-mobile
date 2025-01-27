// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Itinerary } from "$lib/openapi";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			selectFrom?: boolean;
			selectTo?: boolean;
			selectedItinerary?: Itinerary | null;
			selectedStop?: { name: string; stopId: string; time: Date };
			stopArriveBy?: boolean;
			tripId?: string;
		}
		// interface Platform {}
	}
}

export { };
