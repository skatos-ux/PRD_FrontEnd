import { Displayable } from '@/models/Displayable';

function sortDisplayable(array: Displayable[]): Displayable[] {
	return array.sort((first, second) => first.id - second.id);
}

function getCurrentIndex(array: Displayable[]): number {
	return Math.max.apply(Math, array.map((displayable) => displayable.id));
}
export { sortDisplayable, getCurrentIndex };
