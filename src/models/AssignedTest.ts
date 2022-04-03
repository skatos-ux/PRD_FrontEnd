import { DateInput } from '@fullcalendar/core';
import { Member } from '@/models/Member';

export interface AssignedTest {
	id: string,
	operators: [Member[]]
	infos : {
		P1?: string
		P2?: string
		P3?: string
		P4?: string
		P5?: string
	}
	start_date: DateInput
	end_date: DateInput
}
