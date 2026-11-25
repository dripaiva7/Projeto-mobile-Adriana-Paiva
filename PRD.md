# PRD — MDB (My Daily Bloom)

## 1. Identificação do produto

- **Nome:** MDB — My Daily Bloom
- **Categoria:** Desenvolvimento pessoal, hábitos, rotina e bem-estar
- **Plataforma:** Aplicativo móvel
- **Versão documentada:** 1.0.0
- **Tecnologias principais:** React Native, Expo e JavaScript
- **Banco de dados:** Firebase Cloud Firestore
- **Armazenamento local:** AsyncStorage

## 2. Objetivo e descrição do sistema

O MDB — My Daily Bloom é um aplicativo móvel desenvolvido para auxiliar pessoas na construção e no acompanhamento de hábitos positivos, contribuindo para uma rotina mais organizada, equilibrada e produtiva.

O aplicativo parte do princípio de que pequenas ações realizadas com constância podem gerar mudanças significativas ao longo do tempo.

Sua proposta é oferecer uma experiência simples, agradável e motivadora, permitindo que o usuário organize hábitos e tarefas, acompanhe suas atividades e visualize sua evolução.

O conceito de Bloom, que significa florescer, representa o desenvolvimento gradual e individual de cada pessoa, respeitando seu próprio ritmo.

## 3. Público-alvo

O aplicativo destina-se a pessoas interessadas em:

- Organização pessoal;
- Desenvolvimento de hábitos;
- Autocuidado e bem-estar;
- Produtividade;
- Planejamento de rotina;
- Acompanhamento de objetivos pessoais.

Embora sua identidade visual tenha como inspiração conteúdos de lifestyle e autocuidado, o sistema possui uma proposta ampla, podendo atender pessoas de diferentes perfis.

## 4. Problema que o sistema pretende resolver

Muitas pessoas encontram dificuldades para manter uma rotina organizada e desenvolver hábitos de maneira consistente.

A ausência de acompanhamento e de registros pode dificultar a percepção da evolução pessoal e contribuir para o abandono de objetivos.

O MDB busca oferecer um ambiente centralizado para organizar hábitos e tarefas, registrar atividades e acompanhar o progresso ao longo do tempo.

## 5. Requisitos funcionais

### RF01 — Apresentação inicial

O sistema deverá apresentar uma tela de boas-vindas, permitindo que o usuário informe seu nome para iniciar a utilização do aplicativo.

### RF02 — Cadastro de hábitos

O sistema deverá permitir cadastrar hábitos informando título, descrição, categoria, frequência semanal e horário.

### RF03 — Edição de hábitos

O sistema deverá permitir alterar as informações de hábitos previamente cadastrados.

### RF04 — Exclusão de hábitos

O sistema deverá permitir excluir hábitos cadastrados, mediante confirmação do usuário.

### RF05 — Acompanhamento diário

O sistema deverá apresentar os hábitos previstos para a data selecionada e permitir marcar ou desmarcar sua conclusão.

### RF06 — Registro de hábitos

O sistema deverá registrar as ocorrências dos hábitos conforme os dias da semana selecionados, identificando seus respectivos estados.

### RF07 — Histórico de hábitos

O sistema deverá disponibilizar um histórico dos registros de hábitos, permitindo consultar a realização das atividades em diferentes períodos.

### RF08 — Visualização de progresso

O sistema deverá apresentar indicadores e representações gráficas que permitam acompanhar a evolução dos hábitos.

### RF09 — Cadastro e gerenciamento de tarefas

O sistema deverá permitir cadastrar, editar e excluir tarefas, incluindo título, descrição, data e horário.

### RF10 — Planejamento de atividades

O sistema deverá disponibilizar uma visualização de calendário para consultar hábitos e tarefas de acordo com a data selecionada.

### RF11 — Gerenciamento de perfil

O sistema deverá permitir consultar e atualizar informações básicas do perfil, como nome, e-mail e foto.

### RF12 — Configuração de notificações

O sistema deverá permitir configurar lembretes para hábitos e tarefas, incluindo ativação, desativação e definição de horários.

## 6. Requisitos não funcionais

### RNF01 — Usabilidade

A interface deverá ser simples, intuitiva e organizada, facilitando a utilização das funcionalidades principais.

### RNF02 — Compatibilidade

O aplicativo deverá ser desenvolvido com React Native e Expo, permitindo sua execução em dispositivos móveis Android e iOS compatíveis.

### RNF03 — Persistência de dados

O sistema deverá utilizar mecanismos de armazenamento local e em nuvem para manter as informações conforme a implementação de cada funcionalidade.

### RNF04 — Organização do código

O código deverá apresentar separação entre telas, componentes reutilizáveis e serviços, facilitando a manutenção e a evolução do aplicativo.

### RNF05 — Identidade visual

O aplicativo deverá manter uma identidade visual coerente com sua proposta de desenvolvimento pessoal, utilizando elementos visuais acolhedores e consistentes.

## 7. Regras de negócio

### RN01 — Frequência dos hábitos

Cada hábito deverá possuir pelo menos um dia da semana selecionado para sua realização.

### RN02 — Identificação das ocorrências

As ocorrências dos hábitos deverão ser geradas de acordo com a data de criação e os dias da semana definidos pelo usuário.

### RN03 — Estados dos registros

Os registros dos hábitos poderão apresentar os seguintes estados:

- `pendente`: ocorrência prevista que ainda não foi concluída;
- `concluido`: ocorrência marcada como realizada;
- `nao_realizado`: ocorrência anterior que permaneceu pendente.

### RN04 — Atualização de conclusão

Ao concluir um hábito, o sistema deverá atualizar seu estado e registrar o horário da conclusão.

### RN05 — Desmarcação de conclusão

Caso o usuário desmarque um hábito concluído, seu estado deverá retornar para pendente.

### RN06 — Cadastro de tarefas

Uma tarefa deverá possuir título, descrição e data obrigatórios. O horário poderá ser informado conforme a necessidade do usuário.

### RN07 — Dados do perfil

As informações básicas do perfil deverão ser armazenadas localmente no dispositivo por meio do AsyncStorage.

### RN08 — Notificações

As preferências de notificações e os horários configurados deverão ser armazenados localmente, permitindo sua recuperação durante a utilização do aplicativo.

## 8. Critérios de aceitação

| ID | Critério de aceitação |
|---|---|
| CA01 | O usuário consegue informar seu nome na tela de boas-vindas e iniciar a navegação. |
| CA02 | O usuário consegue cadastrar um hábito com título, descrição, categoria, frequência e horário. |
| CA03 | O sistema impede o cadastro de hábitos sem título, descrição ou frequência selecionada. |
| CA04 | O usuário consegue editar e excluir hábitos cadastrados. |
| CA05 | O usuário consegue marcar e desmarcar a conclusão de um hábito. |
| CA06 | O sistema registra ocorrências de hábitos conforme a frequência configurada. |
| CA07 | O usuário consegue consultar o histórico e visualizar indicadores de progresso. |
| CA08 | O usuário consegue cadastrar, editar e excluir tarefas. |
| CA09 | O calendário permite selecionar datas e consultar as atividades correspondentes. |
| CA10 | O usuário consegue atualizar suas informações de perfil. |
| CA11 | O usuário consegue configurar os lembretes de hábitos e tarefas. |
| CA12 | As informações persistem conforme o mecanismo de armazenamento utilizado por cada funcionalidade. |

## 9. Tecnologias e arquitetura

O projeto utiliza as seguintes tecnologias e bibliotecas principais:

- **JavaScript:** linguagem de programação;
- **React Native:** desenvolvimento da interface móvel;
- **Expo SDK 58:** ambiente e ferramentas de desenvolvimento;
- **Expo Router:** navegação entre telas;
- **Firebase 12:** integração com serviços do Firebase;
- **Cloud Firestore:** armazenamento de dados em nuvem;
- **AsyncStorage:** armazenamento local;
- **Expo Notifications:** gerenciamento de notificações;
- **Expo Image Picker:** seleção de imagens;
- **React Native SVG:** recursos gráficos;
- **DateTimePicker:** seleção de datas e horários.

A arquitetura está organizada principalmente em três diretórios:

- `app/`: telas e rotas do aplicativo;
- `componentes/`: componentes reutilizáveis da interface;
- `servicos/`: funcionalidades e operações auxiliares.

## 10. Limitações conhecidas da versão documentada

- O Firebase Authentication está inicializado na configuração, mas não há fluxo de autenticação de usuários implementado nas telas analisadas.
- Os dados das coleções de hábitos, tarefas e registros não possuem filtros por usuário na implementação analisada.
- As informações de perfil e algumas preferências são armazenadas localmente no dispositivo.
- O projeto não apresenta, no `package.json` analisado, scripts específicos de testes automatizados ou lint.
- A versão documentada não contempla funcionalidades futuras como desafios, conquistas, sugestões personalizadas por inteligência artificial ou sincronização individual de perfis.

## 11. Considerações finais

O MDB — My Daily Bloom busca oferecer uma ferramenta de apoio à organização pessoal e ao desenvolvimento de hábitos, valorizando a constância e o progresso gradual.

A versão documentada contempla funcionalidades de gerenciamento de hábitos e tarefas, planejamento, histórico, acompanhamento de progresso, perfil e notificações.

O presente documento descreve os requisitos e características da versão existente do aplicativo, servindo como referência para sua documentação, manutenção e evolução.