---
name: desenvolver-funcionalidade
description: Orienta a análise, o planejamento, a implementação e a verificação de funcionalidades no projeto MDB — My Daily Bloom.
---

# Skill: Desenvolver Funcionalidade

## Objetivo

Orientar o desenvolvimento e a evolução de funcionalidades do MDB — My Daily Bloom, respeitando sua arquitetura, identidade visual e funcionalidades existentes.

## Etapa 1 — Análise da solicitação

Antes de começar:

1. Compreender o objetivo da funcionalidade solicitada.
2. Identificar o problema que ela pretende resolver.
3. Analisar como a funcionalidade se relaciona com o propósito do MDB.
4. Identificar as telas, componentes e serviços envolvidos.
5. Ler os arquivos relacionados antes de propor qualquer alteração.
6. Verificar se já existe alguma implementação semelhante.

Não presumir que uma funcionalidade está ausente sem analisar o código.

## Etapa 2 — Identificação de ambiguidades

Verificar se existem dúvidas sobre:

- Comportamento esperado;
- Informações que serão armazenadas;
- Interação do usuário;
- Navegação entre telas;
- Regras de negócio;
- Integração com Firebase ou armazenamento local;
- Impactos em funcionalidades existentes.

Se houver uma dúvida que possa comprometer a implementação, perguntar à responsável pelo projeto antes de prosseguir.

Não inventar requisitos.

## Etapa 3 — Planejamento

Antes de implementar:

1. Descrever resumidamente a solução proposta.
2. Identificar os arquivos que precisarão ser criados ou alterados.
3. Explicar o papel de cada arquivo envolvido.
4. Identificar possíveis impactos em outras funcionalidades.
5. Definir como o resultado será verificado.

Apresentar o planejamento para aprovação.

## Etapa 4 — Implementação

Somente após autorização explícita:

- Seguir os padrões existentes no projeto.
- Utilizar JavaScript e React Native.
- Respeitar a estrutura de pastas.
- Reaproveitar componentes quando apropriado.
- Preservar a identidade visual do aplicativo.
- Manter compatibilidade com Expo Router e Firebase.
- Evitar alterações desnecessárias.
- Não instalar dependências sem autorização.

Não modificar funcionalidades que não fazem parte da solicitação.

## Etapa 5 — Verificação

Depois da implementação autorizada:

1. Verificar se não existem erros de sintaxe.
2. Iniciar o aplicativo, quando possível.
3. Testar o comportamento esperado.
4. Verificar se a navegação continua funcionando.
5. Avaliar possíveis impactos em outras telas.
6. Consultar as ferramentas de testes e lint disponíveis no projeto.
7. Registrar testes não realizados e limitações encontradas.

Nunca afirmar que uma funcionalidade foi testada com sucesso sem executar a verificação correspondente.

## Etapa 6 — Relatório de conclusão

Ao finalizar, apresentar:

- Objetivo da alteração;
- Arquivos criados ou modificados;
- Resumo da implementação;
- Testes realizados;
- Resultados encontrados;
- Pendências ou limitações.

## Regras fundamentais

- Preservar o funcionamento do MDB.
- Não realizar alterações sem autorização.
- Não modificar arquivos fora do escopo.
- Não inventar funcionalidades ou resultados de testes.
- Priorizar clareza, organização e manutenção do código.
- Explicar o processo em etapas pequenas e compreensíveis.

**Princípio central:** toda evolução do MDB deve respeitar o que já foi desenvolvido e acontecer de forma planejada, autorizada e verificável.