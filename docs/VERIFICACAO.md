# Verificação e Validação — MDB (My Daily Bloom)

## 1. Objetivo

Este documento registra as verificações realizadas no aplicativo MDB — My Daily Bloom, incluindo funcionamento das funcionalidades, identificação de erros e validação da versão disponibilizada para avaliação.

Os resultados devem refletir testes realmente executados.

## 2. Ambiente de desenvolvimento

| Item | Tecnologia |
|---|---|
| Editor | Visual Studio Code |
| Linguagem | JavaScript |
| Framework | React Native |
| Plataforma de desenvolvimento | Expo |
| Navegação | Expo Router |
| Banco de dados | Firebase Firestore |
| Armazenamento local | AsyncStorage |
| Notificações | Expo Notifications |
| Controle de versão | Git e GitHub |

## 3. Verificação das funcionalidades

Os itens abaixo estão pendentes de execução e confirmação.

| Funcionalidade | Verificação necessária | Resultado |
|---|---|---|
| Boas-vindas | Informar nome e avançar | Pendente |
| Cadastro de hábitos | Cadastrar hábito com dias da semana | Pendente |
| Edição de hábitos | Alterar informações de um hábito | Pendente |
| Exclusão de hábitos | Excluir um hábito | Pendente |
| Registro diário | Marcar hábito como concluído | Pendente |
| Planner | Consultar hábitos e tarefas por data | Pendente |
| Cadastro de tarefas | Cadastrar tarefa com data | Pendente |
| Histórico | Consultar registros anteriores | Pendente |
| Progresso | Visualizar indicadores e gráficos | Pendente |
| Perfil | Consultar e atualizar informações | Pendente |
| Foto de perfil | Selecionar uma imagem | Pendente |
| Notificações | Ativar, desativar e configurar horários | Pendente |

## 4. Verificação técnica

| Verificação | Resultado |
|---|---|
| Inicialização do aplicativo | Pendente |
| Navegação entre telas | Pendente |
| Persistência dos dados no Firestore | Pendente |
| Persistência dos dados locais | Pendente |
| Ausência de erros durante a execução | Pendente |
| Compilação Android | Pendente |
| Instalação da APK | Pendente |

## 5. Testes automatizados e qualidade

No momento da análise do `package.json`, não foram identificados scripts específicos para execução de testes automatizados ou lint.

| Item | Situação |
|---|---|
| Script de testes automatizados | Não identificado |
| Script de lint | Não identificado |
| Testes manuais | A realizar |
| Revisão de erros de execução | A realizar |

A ausência de scripts não significa que a aplicação tenha sido aprovada nesses critérios. As verificações disponíveis devem ser realizadas e registradas.

## 6. Registro de problemas

Utilizar esta seção para documentar problemas encontrados durante os testes.

| Data | Problema identificado | Ação realizada | Situação |
|---|---|---|---|
| — | Nenhum registro realizado até o momento | — | A verificar |

## 7. Validação da versão Android

A versão Android deverá ser instalada em um dispositivo compatível e avaliada quanto a:

- Abertura e inicialização;
- Navegação;
- Cadastro e gerenciamento de hábitos;
- Cadastro e gerenciamento de tarefas;
- Atualização do progresso;
- Funcionamento das notificações;
- Persistência dos dados;
- Estabilidade durante o uso.

**Status da validação:** Pendente de execução.

## 8. Considerações finais

A validação do MDB deve considerar tanto os requisitos funcionais definidos no PRD quanto a experiência de uso.

Os resultados deste documento deverão ser atualizados após cada rodada de testes, registrando aprovações, falhas e limitações encontradas.

Nenhum teste deve ser considerado aprovado sem evidência de sua execução.