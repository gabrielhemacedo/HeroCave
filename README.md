# Modo Heroi

App gamificado de habitos: treine, evolua seu heroi, suba de nivel e de liga. Construido com Expo + TypeScript e Supabase.

## Status atual

| Pilar | Status |
| --- | --- |
| Autenticacao (e-mail/senha) | Completo |
| Onboarding (perfil, objetivos, classe) | Completo |
| Treino (registrar, concluir, ganhar XP) | Completo |
| Corpo (mapa muscular, ligas por grupo) | Completo |
| Ligas (geral + por grupo muscular) | Completo |
| Missoes diarias/semanais + Conquistas (Galeria) | Completo |
| Nutricao | Tela "em breve" - schema de banco ja existe |
| Financas | Tela "em breve" - schema de banco ja existe |
| Parar de Fumar | Tela "em breve" - schema de banco ja existe |
| Integracao com Apple Health / Health Connect | Nao implementada (ver secao abaixo) |

## Stack

- [Expo](https://expo.dev) + TypeScript + [Expo Router](https://docs.expo.dev/router/introduction/) (rotas por arquivo, pasta `app/`)
- [Supabase](https://supabase.com) (Postgres + Auth) como backend
- [TanStack Query](https://tanstack.com/query) para data-fetching/mutations
- [Zustand](https://github.com/pmndrs/zustand) para estado de sessao/onboarding
- `react-native-svg` + `expo-linear-gradient` para a mascote Tori e o mapa muscular

## Rodando localmente

```bash
npm install
```

Crie um arquivo `.env` na raiz com as credenciais do seu projeto Supabase:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

Depois suba o projeto:

```bash
npx expo start        # abre o menu do Metro (escolha web, iOS ou Android)
npx expo start --web  # direto no navegador
```

## Banco de dados (Supabase)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode a migration inicial (cria todas as tabelas com RLS por `user_id`):
   ```bash
   psql "$SUPABASE_DB_URL" -f supabase/migrations/0001_init.sql
   ```
   ou cole o conteudo do arquivo no SQL Editor do painel Supabase.
3. Rode o seed (catalogo global de conquistas):
   ```bash
   psql "$SUPABASE_DB_URL" -f supabase/seed.sql
   ```

## Gerando os projetos nativos (iOS / Android)

Este e um app Expo gerenciado; os projetos nativos `ios/` e `android/` nao sao versionados. Para gera-los:

```bash
npx expo prebuild
```

- **iOS**: abra `ios/ModoHeroi.xcworkspace` no Xcode (precisa de macOS + Xcode instalado).
- **Android**: abra a pasta `android/` no Android Studio.

> Build nativo real (compilar e instalar em simulador/dispositivo) nao pode ser executado em ambientes sandboxed sem Xcode/Android Studio/emulador - faca isso na sua maquina local.

## Estrutura do projeto

```
app/                       # Expo Router - cada arquivo/pasta e uma rota
  (auth)/                  # login, signup
  (onboarding)/            # welcome, profile, goals, class-select
  (tabs)/                  # Treino, Inicio, Progresso, Nutricao, Perfil
  finance.tsx, smoking.tsx # stubs "em breve", acessiveis via Perfil/Home

src/
  theme/                   # cores, espacamento, tipografia
  components/ui/           # Button, Card, ProgressBar, XPBar, Pill, ComingSoon, ...
  components/mascot/       # Tori (SVG) e variantes de expressao
  components/body-map/     # mapa muscular (frente/costas) e cards de grupo muscular
  components/gamification/ # HeroTopBar, MissionCard, AchievementCard, LeagueCard, modais
  features/                # auth, onboarding, hero, workouts, muscleProgress, missions, achievements
  lib/supabase.ts          # cliente Supabase
  lib/health/              # interface de integracao com saude (ver abaixo)
  store/                   # Zustand (sessao, onboarding)
  utils/xpEngine.ts        # XP, niveis, ligas e streak

supabase/migrations/0001_init.sql  # schema completo (todas as tabelas + RLS)
supabase/seed.sql                  # catalogo de conquistas
docs/PROMPT.md                     # especificacao original do produto
```

## Motor de gamificacao

`src/utils/xpEngine.ts` concentra as regras: XP necessario por nivel, tabela de XP por acao, ligas (Madeira -> Lendaria) e calculo de streak. As mesmas funcoes de liga (`leagueForProgress`, `leagueProgressDetail`) sao usadas tanto para a liga geral do heroi quanto para a liga de cada grupo muscular, garantindo consistencia visual entre as telas de Corpo, Ligas e Perfil.

## Integracao com Apple Health / Health Connect (proximo passo)

A camada de servico ja existe em `src/lib/health/index.ts`, com a interface `HealthService` (`isAvailable`, `requestPermissions`, `getDailySummary`) e uma implementacao "stub" que nao retorna dados. Isso permite que a UI ja chame essa interface sem travar o app, mesmo sem o SDK nativo instalado.

Para implementar de fato (requer build nativo + dispositivo fisico, por isso nao foi feito aqui):

1. **iOS (HealthKit)**: instalar `react-native-health`, configurar as permissoes (`NSHealthShareUsageDescription` / `NSHealthUpdateUsageDescription` ja estao em `app.json`) e implementar `HealthService` usando a API do pacote.
2. **Android (Health Connect)**: instalar `react-native-health-connect`, declarar as permissoes (`android.permission.health.READ_STEPS` / `READ_EXERCISE` ja estao em `app.json`) e implementar `HealthService` de forma equivalente.
3. Trocar `export const healthService = new StubHealthService()` pela implementacao real (ou uma que escolhe a implementacao por plataforma com `Platform.OS`).
4. Rodar `npx expo prebuild` para gerar os projetos nativos com os módulos instalados, já que ambos os pacotes exigem código nativo.

## Verificacao

```bash
npm run typecheck   # tsc --noEmit
```
