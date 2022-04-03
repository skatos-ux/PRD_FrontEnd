import { Skill } from '@/models/Skill';
import { Displayable } from '@/models/Displayable';

export interface Task extends Displayable {
	id: number,
	name: string,
	duration: number,
	skills: Skill[]
}
