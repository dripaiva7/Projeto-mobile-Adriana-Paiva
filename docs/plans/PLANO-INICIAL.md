# Plano Inicial — MDB (My Daily Bloom)

## 1. Visão geral

O MDB — My Daily Bloom é um aplicativo mobile de organização pessoal e acompanhamento de hábitos.

O projeto tem como propósito ajudar os usuários a desenvolverem uma rotina mais equilibrada por meio do registro de hábitos, organização de tarefas, acompanhamento de progresso e incentivo à constância.

Este documento organiza o planejamento e a avaliação do estado atual do aplicativo, tomando como referência os requisitos definidos no `PRD.md`.

**Contexto:** o aplicativo já possui uma implementação funcional em desenvolvimento. Este plano documenta sua estrutura e estabelece as etapas de análise, validação e possíveis evoluções, sem pressupor que o desenvolvimento original será refeito.

## 2. Objetivo do planejamento

- Organizar os requisitos do MDB.
- Documentar as funcionalidades existentes.
- Identificar possíveis melhorias e limitações.
- Estabelecer critérios de verificação.
- Preservar a arquitetura e o funcionamento atual.
- Manter a evolução do projeto alinhada ao PRD.

## 3. Etapas do projeto

### Etapa 1 — Definição e documentação

**Objetivo:** estabelecer a documentação de referência.

Atividades:
- Definir o propósito e o público-alvo do aplicativo.
- Documentar os requisitos funcionais e não funcionais.
- Registrar as regras de negócio.
- Definir orientações para agentes de IA.
- Criar uma Skill para orientar o desenvolvimento de funcionalidades.

Entregáveis:
- `PRD.md`
- `AGENTS.md`
- `.claude/skills/desenvolver-funcionalidade/SKILL.md`

### Etapa 2 — Análise da implementação existente

**Objetivo:** compreender a estrutura atual do MDB.

Atividades:
- Analisar as telas existentes.
- Identificar os componentes reutilizáveis.
- Verificar os serviços e integrações.
- Identificar o uso do Firebase e do armazenamento local.
- Comparar as funcionalidades implementadas com os requisitos do PRD.

Entregável:
- Registro das funcionalidades existentes e das limitações identificadas.

### Etapa 3 — Organização e planejamento técnico

**Objetivo:** estabelecer uma referência para futuras evoluções.

Atividades:
- Identificar pontos de atenção na arquitetura.
- Mapear dependências entre telas e componentes.
- Priorizar possíveis melhorias.
- Definir critérios para avaliar novas funcionalidades.
- Evitar alterações fora do escopo aprovado.

Entregável:
- Plano inicial documentado neste arquivo.

### Etapa 4 — Verificação da aplicação

**Objetivo:** avaliar o funcionamento do aplicativo.

Atividades:
- Verificar se o aplicativo inicia corretamente.
- Testar o cadastro e a edição de hábitos.
- Testar o registro de tarefas.
- Verificar a atualização dos registros de hábitos.
- Avaliar o histórico e os indicadores de progresso.
- Verificar o funcionamento das notificações.
- Avaliar o armazenamento dos dados.
- Registrar erros e limitações encontrados.

As verificações devem ser executadas e seus resultados registrados. Não considerar uma funcionalidade validada apenas por existir no código.

### Etapa 5 — Compilação e disponibilização

**Objetivo:** preparar uma versão para avaliação.

Atividades:
- Verificar as configurações do Expo e do EAS.
- Gerar uma versão de instalação Android.
- Instalar e testar a aplicação em dispositivo compatível.
- Disponibilizar a versão para os avaliadores.

Entregável:
- APK de avaliação, após compilação e validação.

## 4. Priorização das funcionalidades

| Prioridade | Funcionalidade | Situação identificada |
|---|---|---|
| Alta | Cadastro e edição de hábitos | Implementada |
| Alta | Registro de conclusão dos hábitos | Implementada |
| Alta | Organização de tarefas | Implementada |
| Alta | Planner e calendário | Implementados |
| Alta | Histórico de hábitos | Implementado |
| Alta | Acompanhamento do progresso | Implementado |
| Média | Perfil do usuário | Implementado |
| Média | Configuração de notificações | Implementada |
| Futura | Autenticação de usuários | Não identificada na implementação analisada |
| Futura | Isolamento dos dados por usuário | Necessita avaliação |
| Futura | Sugestões personalizadas com IA | Não implementada |

A situação das funcionalidades deverá ser atualizada conforme as verificações forem realizadas.

## 5. Critérios de conclusão

O planejamento será considerado concluído quando:

- A documentação estiver organizada na raiz do projeto e nas pastas correspondentes.
- Os requisitos estiverem registrados no PRD.
- As orientações para agentes estiverem documentadas.
- A Skill estiver criada.
- A estrutura e as funcionalidades existentes estiverem analisadas.
- As verificações da aplicação estiverem registradas.
- As limitações conhecidas estiverem documentadas.
- A versão de avaliação estiver disponível, quando aplicável.

## 6. Ferramentas e tecnologias

- Visual Studio Code;
- JavaScript;
- React Native;
- Expo;
- Expo Router;
- Firebase Firestore;
- AsyncStorage;
- Expo Notifications;
- EAS Build;
- Git e GitHub;
- ChatGPT como ferramenta de apoio à análise e documentação.

## 7. Observações

Este plano representa a organização documental e a avaliação do projeto MDB em seu estado atual.

A utilização de ferramentas de inteligência artificial deve ser transparente. O apoio de IA na análise e produção da documentação não deve ser apresentado como se tivesse sido responsável pela implementação original do aplicativo.

Qualquer evolução no código deverá seguir as orientações do `AGENTS.md` e da Skill `desenvolver-funcionalidade`, respeitando a necessidade de aprovação prévia para alterações.