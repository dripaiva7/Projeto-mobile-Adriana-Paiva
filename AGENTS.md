# AGENTS.md — Orientações para agentes de IA

## 1. Sobre o projeto

O **MDB — My Daily Bloom** é um aplicativo mobile de organização pessoal e acompanhamento de hábitos.

Seu propósito é ajudar as pessoas a desenvolverem uma rotina mais equilibrada e produtiva por meio de pequenas ações diárias, acompanhamento de hábitos e visualização do próprio progresso.

Toda contribuição deve respeitar a proposta do aplicativo: promover constância e desenvolvimento pessoal sem transformar a rotina em uma fonte de pressão.

## 2. Tecnologias utilizadas

- JavaScript (JS)
- React 19.3.0
- React Native 0.88.1
- Expo SDK 58
- Expo Router para navegação
- Firebase 12.18.0
- Cloud Firestore para armazenamento de dados
- AsyncStorage para armazenamento local
- Expo Notifications para notificações
- Expo Image Picker para seleção de imagens
- React Native SVG para elementos gráficos

Não introduza novas bibliotecas sem antes verificar se são realmente necessárias e obter autorização.

## 3. Organização do projeto

### `app/`

Contém as telas e rotas do aplicativo, incluindo:

- Boas-vindas e perfil do usuário;
- Cadastro e edição de hábitos;
- Cadastro e edição de tarefas;
- Planner;
- Histórico de hábitos;
- Progresso;
- Notificações.

### `componentes/`

Contém componentes reutilizáveis da interface, como cartões, calendários, gráficos, indicadores de progresso e menu de navegação.

### `servicos/`

Contém funcionalidades e regras de apoio, incluindo serviços relacionados às notificações e aos registros de hábitos.

### Arquivos de configuração

- `package.json`: dependências e comandos do projeto.
- `app.json`: configurações do Expo.
- `eas.json`: configurações de compilação com EAS.
- `firebaseConfig.js`: inicialização e configuração do Firebase.

## 4. Padrões de desenvolvimento

- Utilizar JavaScript, sem introduzir TypeScript sem autorização.
- Manter componentes funcionais e utilizar Hooks do React quando necessário.
- Utilizar `StyleSheet` para organização dos estilos.
- Priorizar componentes reutilizáveis quando fizer sentido.
- Respeitar a estrutura de pastas já existente.
- Manter a identidade visual e a experiência de uso do MDB.
- Utilizar nomes claros e consistentes para variáveis, funções e componentes.
- Evitar duplicação de código.
- Manter a navegação compatível com a estrutura existente do Expo Router.

## 5. Regras obrigatórias para alterações

Antes de qualquer alteração no código:

1. Analisar a solicitação e identificar quais arquivos estão relacionados.
2. Ler os arquivos envolvidos antes de propor mudanças.
3. Verificar se a funcionalidade já existe total ou parcialmente.
4. Identificar possíveis impactos em outras telas, componentes e serviços.
5. Apresentar um plano objetivo antes de implementar.

Durante as alterações:

- Não modificar arquivos que não sejam necessários para a solicitação.
- Não realizar refatorações gerais sem autorização.
- Não remover funcionalidades existentes.
- Não alterar a identidade visual sem solicitação.
- Não substituir implementações existentes sem justificar a necessidade.
- Não instalar dependências sem autorização.
- Preservar o comportamento das funcionalidades que já estão funcionando.

**Regra principal:** nenhuma alteração em arquivos do aplicativo deve ser realizada sem autorização explícita da responsável pelo projeto.

Quando a solicitação envolver somente documentação, modificar exclusivamente os arquivos de documentação solicitados.

## 6. Dados e armazenamento

O projeto utiliza o Firebase Firestore e o AsyncStorage.

Entre as coleções utilizadas no Firestore estão:

- `habitos`
- `tarefas`
- `registrosHabitos`

O AsyncStorage é utilizado para informações locais, como dados de perfil e preferências de notificações.

A inicialização do Firebase também inclui Firebase Authentication, mas não foi identificada uma tela ou fluxo de autenticação implementado nas telas analisadas.

Não presumir que existe autenticação de usuários ou isolamento individual dos dados no Firestore.

## 7. Comandos disponíveis

Executar os comandos na raiz do projeto.

| Objetivo | Comando |
|---|---|
| Iniciar o Expo | `npm start` |
| Executar no Android | `npm run android` |
| Executar no iOS | `npm run ios` |
| Executar na Web | `npm run web` |

O `package.json` atualmente não apresenta scripts específicos de testes automatizados ou lint.

Não afirmar que testes ou verificações foram executados sem realmente realizá-los.

## 8. Verificação das alterações

Após qualquer implementação autorizada:

1. Verificar se a aplicação inicia corretamente.
2. Testar a funcionalidade alterada.
3. Verificar se as funcionalidades relacionadas continuam funcionando.
4. Observar erros no terminal e no aplicativo.
5. Verificar se existem testes ou ferramentas de lint disponíveis.
6. Registrar limitações e verificações que não puderam ser realizadas.

Caso não seja possível executar algum teste, informar isso claramente.

## 9. Comunicação e documentação

- Explicar as alterações em linguagem clara.
- Apresentar instruções em etapas pequenas.
- Informar quais arquivos foram criados ou modificados.
- Não afirmar que uma funcionalidade foi concluída sem verificar seu funcionamento.
- Manter a documentação coerente com o código existente.
- Diferenciar funcionalidades implementadas, planejadas e futuras.

## 10. Princípio de preservação

O MDB já possui uma estrutura e funcionalidades desenvolvidas. Toda contribuição deve partir da análise do estado atual do projeto.

A prioridade é preservar o que já funciona, realizar somente o que foi solicitado e manter a evolução do aplicativo organizada e documentada.