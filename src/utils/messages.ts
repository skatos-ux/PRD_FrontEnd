const InputError = {
	EmptyTestImmat: "Veuillez renseigner un numéro d'immatriculation.",
	EmptyTestDate: 'Veuillez renseigner une date de début au plus tôt.',
	EmptyTestTasks: 'Veuillez séléctionner au moins 1 tâche a réaliser.',
	EmptyTeamMembers: 'Veuillez séléctionner au moins 1 membre.',
};
const ServerError = {
	NoResponse: "Un problème est arrivé, le serveur n'as pas pu être joint.",
};

const ServerSuccess = {
	SuccessfulTestCreation: 'Test ajouté avec succès.',
	SuccessfulTestDeletion: 'Test supprimé avec succès.',
	SuccessfulTeamCreation: 'Equipe ajoutée avec succès.',
	SuccessfulTaskCreation: 'Tâche ajoutée avec succès.',
	SuccessfulSkillCreation: 'Compétence ajoutée avec succès.',
	SuccessfulMemberCreation: 'Membre ajouté avec succès.',
};
export { InputError, ServerError, ServerSuccess };
