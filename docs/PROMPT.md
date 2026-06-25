# Spec original — Modo Heroi

Este documento preserva a especificacao completa fornecida pelo usuario para o app
"Modo Heroi", usada como base para a implementacao deste repositorio. O texto original
foi escrito para ser colado em uma ferramenta de geracao de apps (Blink.new) e cobre o
produto completo (24 telas, 5 pilares: treino, nutricao, corpo, parar de fumar, financas).

A primeira entrega deste repositorio implementa a fundacao do app (autenticacao, onboarding,
design system, motor de XP/nivel/streak, Home) mais o pilar de Treino e Corpo (mapa muscular)
de forma completa. Os demais pilares existem como telas "em breve" e schema de banco pronto,
para serem implementados em entregas futuras. Veja o `README.md` para o estado atual.

---

## Conceito do app

O app e um sistema de evolucao pessoal gamificado onde o usuario evolui como um heroi.

Ele deve ajudar o usuario a melhorar: treinos, alimentacao, composicao corporal, habitos,
financas e parar de fumar — tudo com linguagem de jogo. Completar treino, comer bem,
economizar dinheiro e ficar sem fumar geram XP; consistencia sobe de nivel; melhorar grupos
musculares sobe de patente/ranking; sequencias diarias geram streak; marcos desbloqueiam
ligas, emblemas e conquistas.

## Direcao visual

Dark mode elegante como padrao, fundo azul-marinho/roxo escuro, cards arredondados grandes,
botoes em formato pill, muitas barras de progresso, feedback visual em XP/badges/streak,
icones grandes e expressivos, visual cartoon premium. Paleta:

- Fundo principal: `#09061A`
- Fundo secundario: `#131026`
- Azul vibrante: `#43B3FF`
- Roxo neon: `#8B5CFF`
- Verde progresso: `#33D17A`
- Laranja streak: `#FF8A1F`
- Amarelo ouro: `#FFC83D`
- Vermelho alerta: `#FF5B5B`
- Branco principal: `#F8F9FC`
- Cinza claro (texto secundario): `#B9B8C7`

Top bar com avatar, nivel, barra de XP, streak (fogo), moedas e ajuda. Navegacao com abas
arredondadas (Corpo / Ligas / Galeria / Missoes) e bottom nav com icones grandes. Tela de
ranking corporal com mapa muscular frontal/traseiro, grupos destacados por cor, ligas por
grupo muscular (Madeira, Bronze, Prata, Ouro, Platina, Diamante, Mestre, Lendario).

## Mascote — Tori

Mascote original (sem copiar Duolingo ou outros apps): um pequeno dragao/axolote azul-arroxeado,
olhos grandes, formato arredondado e simpatico, com expressoes (feliz, orgulhoso, incentivando,
preocupado de forma fofa, comemorando level up, motivando apos falha). Aparece no onboarding,
mensagens motivacionais, telas vazias, conclusao de missao, streak, level up, lembretes,
conquistas e recaidas no tabagismo (sempre de forma acolhedora, nunca agressiva). Tom: amigavel,
curto, direto, divertido, acolhedor, motivador.

## Pilares

1. Treino
2. Nutricao
3. Corpo / Evolucao Muscular
4. Parar de fumar
5. Financas

Conectados por XP, nivel, streak, missoes, ligas, emblemas, conquistas e atributos do heroi.

## Onboarding

Coleta: nome, idade, altura, peso, objetivo fisico, nivel de treino, frequencia semanal, local
de treino, objetivo alimentar, se fuma, quantos cigarros por dia, objetivo financeiro, nome do
heroi, escolha de avatar inicial. Termina com criacao do perfil, escolha de classe e tela de
boas-vindas com o mascote.

## Classes do heroi

- **Guerreiro** — foco em treino e forca
- **Guardiao** — foco em saude e consistencia
- **Estrategista** — foco em financas e rotina
- **Renascido** — foco em parar de fumar e disciplina

Cada classe da pequenas vantagens simbolicas (mais XP em certa categoria, mais missoes
relacionadas, identidade visual complementar).

## Atributos do heroi

Forca, Vitalidade, Disciplina, Resistencia, Foco, Sabedoria. Exemplos de ganho: treino de
forca → Forca; cardio → Resistencia; comer bem → Vitalidade; nao fumar → Disciplina; registrar
gastos → Sabedoria; seguir plano → Foco.

## XP, nivel e streak

XP por acao (exemplos da spec original):

- Treino concluido: +50 XP
- Treino intenso: +70 XP
- Refeicao boa: +25 XP
- Bater meta de proteina: +40 XP
- Bater meta de agua: +25 XP
- Registrar gastos: +20 XP
- Economizar no dia: +40 XP
- Dia sem fumar: +80 XP
- Meta semanal concluida: bonus
- Todas missoes do dia concluidas: bonus extra

Nivel comeca em 1, com barra de XP visivel no topo e animacao ao subir de nivel. Streak conta
dias ativos consecutivos, com marcos em 3, 7, 14, 30 e 100 dias.

## Ligas e rankings

Liga geral do usuario: Madeira, Bronze, Prata, Ouro, Platina, Diamante, Mestre, Heroi Supremo.
Ligas por area (progressao separada): Bracos, Pernas, Peito, Costas, Ombros, Abdomen, Cardio,
Nutricao, Disciplina, Financas, Sem fumar. Tela com cards grandes: nome do grupo, icone,
patente atual, marcos faltantes, progresso interno.

## Tela Corpo / mapa muscular

Visao frontal e traseira do corpo, destaque dos musculos treinados recentemente, cores por
intensidade de evolucao, ranking de grupos musculares, ultimo treino associado. Grupos:
bracos, peitorais, costas, ombros, abdomen, pernas, gluteos.

## Treino

Registrar treino (exercicios, series, repeticoes, carga, descanso, duracao, intensidade,
observacoes), historico, evolucao de carga. Modos: manual, sugerido, pronto por grupo
muscular. Ao concluir: animacao de XP, grupo muscular destacado, mensagem do mascote, ganho
de nivel muscular, streak atualizado.

## Nutricao

Registrar refeicoes (cafe, almoco, lanche, jantar, ceia, livre), agua, proteina, calorias
estimadas, qualidade da refeicao, metas do dia. Missoes alimentares (beber 2L de agua, comer
proteina em 3 refeicoes, evitar refrigerante, comer fruta, nao pedir delivery, refeicao
limpa). Feedback com barras de progresso, selo do dia, medalhas, elogio do mascote.

## Parar de fumar

Secao "Respirar" / "Livre do Fumo": contador de dias sem fumar, registrar cigarros por dia,
registrar recaida (gatilho, vontade/craving), dinheiro economizado, cigarros evitados, marcos
conquistados. Tom sempre acolhedor, nunca agressivo, em caso de recaida.

## Financas

Secao "Tesouro" / "Cofre do Heroi": entradas, saidas, categorias (alimentacao, transporte,
saude, academia, lazer, casa, dividas, assinaturas, compras, outros), orcamento, meta de
economia, saldo, graficos simples. Gamificacao: registrar gastos do dia, ficar abaixo do
orcamento, guardar dinheiro e bater metas geram XP/bonus.

## Missoes

Diarias (ex.: concluir treino do dia, beber agua, comer proteina suficiente, registrar gastos,
ficar sem fumar, dormir bem, alongar), semanais (ex.: treinar 4x, economizar X reais, 7 dias
sem fumar) e especiais (ex.: primeiro treino, 30 dias ativos, primeiro R$100 economizados).
Cada missao tem titulo, descricao, categoria, XP, progresso, status, icone e acao.

## Conquistas

Tela "Conquistas" colecionavel, por categoria (Treino, Corpo, Nutricao, Foco, Sem fumar,
Financas, Consistencia), com nome, icone, raridade (Comum, Rara, Epica, Lendaria), data de
desbloqueio, descricao e XP bonus.

## Dashboard / Home

Avatar, nivel, barra de XP, streak, moeda/pontos, mensagem do mascote, resumo do dia, missoes
diarias, atalhos para registrar treino/refeicao/gasto/cigarro, resumo semanal. Cards rapidos:
treino de hoje, estado corporal, agua do dia, dias sem fumar, cofre da semana, missao em
destaque, proxima recompensa.

## Navegacao

Barra inferior: Treino, Inicio, Niveis/Progresso, Nutricao, Perfil. Dentro de
Niveis/Progresso: Corpo, Ligas, Galeria/Conquistas. Area extra ("Mais"): Financas, Livre do
Fumo, Configuracoes.

## Telas obrigatorias (lista completa da spec)

Splash, Login, Cadastro, Onboarding, Escolha de classe, Home, Treino, Registrar treino,
Detalhes do treino, Corpo, Ligas, Galeria/Conquistas, Nutricao, Registrar refeicao, Registrar
agua, Financas, Registrar gasto, Registrar entrada, Livre do Fumo, Registrar cigarro/recaida,
Perfil do heroi, Configuracoes, Tela de level up, Tela de missao concluida.

## Tom de escrita

Curto, motivacional, amigavel, energetico, claro. Exemplos: "Boa!", "Voce evoluiu!", "Missao
completa", "Foco total", "Mais um passo", "Voce esta indo muito bem", "Hoje seu heroi ficou
mais forte".

## Integracao com Apple Health / Android Health

Estrutura pronta para Apple Health/HealthKit (iOS) e Health Connect/Google Fit (Android) —
passos, calorias gastas, treinos, distancia, frequencia cardiaca, sono, energia ativa.

## Banco de dados (entidades da spec original)

`users`, `hero_profiles`, `user_goals`, `workouts`, `workout_exercises`, `muscle_progress`,
`meals`, `water_logs`, `smoking_logs`, `financial_transactions`, `missions`, `achievements`,
`user_achievements` — ver `supabase/migrations/0001_init.sql` para o schema implementado.

## MVP funcional (objetivo da spec original)

Criar conta, fazer onboarding, escolher classe, registrar treino/refeicao/agua/gasto/cigarro,
completar missao, ganhar XP, subir de nivel, evoluir grupos musculares, visualizar ligas e
conquistas.

## Expansoes futuras previstas

Notificacoes push, desafios com amigos, guildas, ranking social, IA para sugerir
treino/alimentacao, loja de itens cosmeticos, integracao com smartwatch, relatorios
exportaveis, widgets mobile.
