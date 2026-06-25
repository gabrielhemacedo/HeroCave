export const TORI_MESSAGES = {
  welcome: 'Eu sou a Tori! Vamos despertar o heroi que existe em voce.',
  homeIdle: 'Hoje e um bom dia para evoluir. Vamos nessa?',
  workoutComplete: ['Boa! Voce ficou mais forte hoje.', 'Seu heroi evoluiu!', 'Treino registrado. Mais um passo!'],
  levelUp: 'Voce subiu de nivel! Continue assim.',
  missionComplete: 'Missao completa! Foco total.',
  streakKeep: 'Sua sequencia continua firme.',
  encourageAfterGap: 'Voce nao falhou. So encontrou um desafio novo.',
} as const;

export function pickRandom(messages: readonly string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}
