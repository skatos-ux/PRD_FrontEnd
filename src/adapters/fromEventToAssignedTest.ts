import { EventInput } from '@fullcalendar/core';
import { AssignedTest } from '@/models/AssignedTest';

function eventToTest(event: EventInput): AssignedTest {
	return {
		id: event.extendedProps!.id,
		operators: event.extendedProps!.operators,
		infos: {
			P1: event.extendedProps!.P1,
			P2: event.extendedProps!.P2,
			P3: event.extendedProps!.P3,
			P4: event.extendedProps!.P4,
			P5: event.extendedProps!.P5,
		},
		start_date: event.start!,
		end_date: event.end!,
	};
}

export default eventToTest;
