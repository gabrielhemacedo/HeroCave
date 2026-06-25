-- Catalogo global de conquistas. Missoes diarias sao criadas por usuario via app
-- (ver src/features/missions) porque dependem de user_id.

insert into achievements (key, title, description, rarity, category, icon, xp_bonus) values
  ('primeiro_treino', 'Primeiro Passo', 'Complete seu primeiro treino.', 'comum', 'Treino', 'dumbbell', 20),
  ('primeira_semana', 'Primeira Semana', 'Mantenha 7 dias de streak.', 'rara', 'Consistencia', 'flame', 50),
  ('trinta_dias_ativos', 'Um Mes de Heroi', 'Mantenha 30 dias de streak.', 'epica', 'Consistencia', 'flame', 150),
  ('grupo_evoluido', 'Evolucao Muscular', 'Leve um grupo muscular a liga Prata.', 'rara', 'Corpo', 'shield', 40),
  ('lenda_muscular', 'Lenda Muscular', 'Leve um grupo muscular a liga Lendaria.', 'lendaria', 'Corpo', 'crown', 300),
  ('dez_treinos', 'Disciplina de Heroi', 'Complete 10 treinos.', 'rara', 'Treino', 'dumbbell', 60)
on conflict (key) do nothing;
