<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue';
import '@fullcalendar/core/vdom';
import FullCalendar, { CalendarOptions } from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

import { EventInput, EventSourceInput } from '@fullcalendar/core';

import ToolBar from '@/components/templates/Toolbar.vue';
import OptionTestsModal from '@/components/templates/OptionTestsModal.vue';

import { useStore } from '@/store';

const store = useStore();

const optionTestModalOpenManager = ref(false);
const loadedTest = ref<EventInput>();

const initialEvents: EventSourceInput = [
	{
		title: 'Test',
		allDay: true,
		start: '2022-03-04T08:00:00',
		end: '2022-02-04T09:00:00',
		backgroundColor: 'green',
		daysOfWeek: [0, 1, 2, 3, 4, 4, 5, 6],
	},
	{
		title: '',
		extendedProps: {
			id: '1',
			members: [
				{
					id: 1,
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			tasks: [
				{
					id: 1,
					name: 'Vitres',
					duration: 1,
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			P1: 'SYG164',
			P2: 'NEDC + roulage (fait par greg)',
			P3: 'Grégory Pouce',
			P4: '',
			P5: '(-5)°C',
		},
		start: '2022-03-29T08:00:00',
		end: '2022-03-29T09:00:00',
	},
	{
		title: '',
		extendedProps: {
			id: '2',
			members: [
				{
					id: 1,
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			tasks: [
				{
					id: 1,
					name: 'Vitres',
					duration: 1,
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			P1: 'NE',
			P2: 'Préva + test',
			P3: 'Thierry Monte',
			P4: '12PE',
			P5: '',
		},
		start: '2022-03-29T09:00:00',
		end: '2022-03-29T10:00:00',
	},
	{
		title: '',
		extendedProps: {
			id: '3',
			members: [
				{
					id: 1,
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			tasks: [
				{
					id: 1,
					name: 'Vitres',
					duration: 1,
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			P1: 'SYG162-2',
			P2: 'Roulage côte + AB',
			P3: 'Frédéric Plote',
			P4: '',
			P5: '5KW',
		},
		start: '2022-03-29T10:00:00',
		end: '2022-03-29T12:00:00',
	},
	{
		title: '',
		extendedProps: {
			id: '4',
			members: [
				{
					id: 1,
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			tasks: [
				{
					id: 1,
					name: 'Vitres',
					duration: 1,
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			P1: 'PV1',
			P2: 'PV1',
			P3: 'Grégory Pouce',
			P4: '',
			P5: '',
		},
		start: '2022-03-30T14:00:00',
		end: '2022-03-30T16:00:00',
	},
	{
		title: '',
		extendedProps: {
			id: '5',
			members: [
				{
					id: 1,
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			tasks: [
				{
					id: 1,
					name: 'Vitres',
					duration: 1,
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			P1: 'SYS12 + 1',
			P2: 'NEDC',
			P3: 'Grégory Pouce',
			P4: '',
			P5: '(-12.2)°C',
		},
		start: '2022-03-31T14:00:00',
		end: '2022-03-31T18:00:00',
	},
	{
		title: '',
		extendedProps: {
			id: '6',
			members: [
				{
					id: 1,
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			tasks: [
				{
					id: 1,
					name: 'Vitres',
					duration: 1,
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			P1: 'RAPI1213',
			P2: 'Roulage',
			P3: 'Thierry Casus',
			P4: '',
			P5: '50KM/H',
		},
		start: '2022-03-28T08:00:00',
		end: '2022-03-28T18:00:00',
	},
];
const calendarOptions: CalendarOptions = {
	plugins: [
		timeGridPlugin,
	],
	headerToolbar: {
		left: 'prev,next today',
		center: 'title',
		right: '',
	},
	initialView: 'timeGridWeek',
	locale: frLocale,
	allDaySlot: true,
	expandRows: true,
	slotMinTime: '08:00:00',
	slotMaxTime: '18:00:00',
	businessHours: {
		daysOfWeek: [1, 2, 3, 4, 5],
		startTime: '08:00',
		endTime: '18:00',
	},
	events: initialEvents,
	allDayContent: '',
	editable: false,
	selectable: false,
	selectMirror: true,
	dayMaxEvents: true,
	weekends: true,
};

provide('optionTestModalOpenManager', optionTestModalOpenManager);

onMounted(async () => {
	await store.dispatch('mockLoadData');
});

function openOptionTestModal(event: EventInput) {
	optionTestModalOpenManager.value = true;
	loadedTest.value = event;
}

</script>

<template>
	<div>
		<ToolBar/>
		<FullCalendar class="calendar" :options="calendarOptions">
			<template #eventContent='arg'>
				<div v-if="arg.event.allDay" class="calendar__legend">
					<div class="cell dayCell">Nom Véh</div>
					<div class="cell dayCell">Hr %</div>
					<div class="cell dayCell">Temperature en °C</div>
				</div>
				<div v-if="!arg.event.allDay" @click="openOptionTestModal(arg.event)" class="calendar__event">
					<div class="cell p1">{{ arg.event.extendedProps.P1 }}</div>
					<div class="cell p2">{{ arg.event.extendedProps.P2 }}</div>
					<div class="cell p3">{{ arg.event.extendedProps.P3 }}</div>
					<div class="cell p4">{{ arg.event.extendedProps.P4 }}</div>
					<div class="cell p5">{{ arg.event.extendedProps.P5 }}</div>
				</div>
			</template>
		</FullCalendar>
		<OptionTestsModal :event="loadedTest"/>
	</div>
</template>

<style lang="scss" scoped>
.home {
	width: 100%;
}
.calendar {
	margin-top: 1rem;
	height: 100vh;
}

</style>
