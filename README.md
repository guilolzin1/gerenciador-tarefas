Gerenciador de Tarefas - Exemplo de Git Flow
Este é um simples aplicativo de gerenciamento de tarefas desenvolvido para demonstrar a estratégia de branching Git Flow.
Sobre o Git Flow
O Git Flow é uma estratégia de branching desenvolvida por Vincent Driessen que define um modelo rigoroso de ramificação projetado em torno de lançamentos de projetos. Ele define funções específicas para diferentes branches e como elas devem interagir.
Branches principais

master: Contém código em estado de produção, sempre estável
develop: Branch de integração para recursos em desenvolvimento

Branches de suporte

feature/: Para desenvolvimento de novas funcionalidades
release/: Preparação para um novo lançamento em produção
hotfix/: Para correções urgentes em produção
bugfix/: Para correções não urgentes

Estrutura do Projeto

index.html: Interface principal do aplicativo
style.css: Estilos do aplicativo
script.js: Funcionalidades JavaScript do aplicativo

Como foi implementado o Git Flow neste projeto

Criamos a branch develop a partir da master
Para cada funcionalidade, criamos branches feature/ a partir da develop
Após conclusão, mesclamos as features de volta na develop
Criamos uma branch release/ quando um conjunto de features estava pronto para lançamento
Após testes na release/, mesclamos na master e na develop
Criamos uma tag para marcar a versão na master
Para correções urgentes, criamos uma branch hotfix/ a partir da master

Como executar
Basta abrir o arquivo index.html em qualquer navegador web.