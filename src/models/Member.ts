import { Skill } from '@/models/Skill';
import { Displayable } from '@/models/Displayable';

export interface Member extends Displayable{
	id: number,
	name: string,
	skills: Skill[]
}
