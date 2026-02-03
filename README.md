<h1 align="center">🎮 Roblox Experience Template (roblox-ts)</h1>

<p align="center">
Estrutura base para criação de jogos no <b>Roblox</b> usando <b>TypeScript com roblox-ts</b>, 
focada em organização, modularidade e escalabilidade.
</p>

<hr>

<h2>🚀 Tecnologias</h2>
<ul>
  <li><b>roblox-ts</b> — TypeScript para Roblox</li>
  <li><b>@rbxts/services</b> — Acesso tipado aos serviços do Roblox</li>
  <li><b>ProfileService (Lua)</b> — Sistema robusto de DataStore</li>
  <li><b>Roact (Lua)</b> — Sistema de GUI anvançada implementada em breve</li>
  <li><b>ESLint + Prettier</b> — Padronização de código</li>
</ul>

<hr>

<h2>📱 Funcionalidades inclusas</h2>
<ul>
  <li><b>Leaderstats</b> — Sistema básico de leaderstats</li>
  <li><b>Run</b> — Sistema básico de corrida</li>
</ul>

<h2>📲 Funcionalidades para os futuros updates</h2>

<ul>
  <li><b>ProfileService</b> — Criação de um DataStore utilizando o Profile Service estilo profissional</li>
  <li><b>Roact</b> — Criação de um sistema de GUI personalisado com <strong>tipagens</strong> utilizando Roact</li>
</ul>

<hr>

<h2>📁 Estrutura do Projeto</h2>

<pre>
src/
│
├── client/            → Scripts do lado do jogador com module loader e uma funcionalidade de RUN
├── server/            → Lógica do servidor
│   ├── Services/      → Sistemas principais do jogo
│   ├── Modules/       → Módulos organizados por função
│   └── main.server.ts → Index do servidor
│                      
├── shared/            → Scripts compartilhados
│   └── Types/         → Tipos como o GameModule e o TagHandler
</pre>

<hr>

<h2>🐶 Wally</h2>

<p>O projeto conta com o Wally, biblioteca para os serviços do roblox como NetworkService, o próprio Profile Service e entre outros.</p>

<h3>Como adicionar outras Packages:</h3>

<p>Primeiro, entre no link do site do <a href="https://wally.run">Wally</a> após isso escolha o package e copie o código, geralmente o código vem com esse modelo:</p>

<pre><code>nomedapackage="nomedoautor/repositório@versão"</code></pre>

<p>Em seguida abra o arquivo <pre>wally.toml</pre> e coloque o código copiado depois da linha que contém <code>[dependencies]</code> porém se sua package for uma package de server, então precisará adicionar a seguinte linha de código: <code>[server-dependices]</code> adicione o link logo em seguida e finalmente rode o comando:</p>

<pre><code>wally install</code></pre>

<p>E pronto, sua package já está no jogo</p>

<hr>

<h2>🧠 Sistema de Módulos</h2>

<p>O projeto usa um <b>Module Loader</b>, onde cada sistema do jogo é um módulo com prioridade.</p>

<h3>Interface padrão de módulo</h3>

<pre><code>export interface GameModule {
    Name: string;
    Priority?: number;
    Init?(): void;
    Start?(): void;
}
</code></pre>

<h3>Adicionar modulos ao Loader</h3>

<p>Existe 2 arquivos cujos papéis de enviar o módulo para que seja carregado.</p>
<br>
<p><code>ModulesServer.ts</code> Basta adicionar o Import do módulo na linha:</p>

<pre><code>const ServerModules: GameModule[] = [Leaderstats, TagHandler, /* DataService, */ PlayerMultiplier];</code></pre>

<p><code>ClientModules.ts</code> Basta adicionar o import do módulo client na linha:</p>

<pre><code>const ClientModules: GameModule[] = [Test];</code></pre>

<h3>Ordem de execução</h3>

<ol>
  <li><code>Init()</code> de todos os módulos (ordem por prioridade)</li>
  <li><code>Start()</code> de todos os módulos</li>
</ol>

<pre><code>modules.sort((a, b) => (a.Priority ?? 100) &lt; (b.Priority ?? 100));</code></pre>

<hr>

<h2>🏷️ Sistema de Tags (CollectionService)</h2>

<p>Existe um <b>TagHandler</b> que detecta objetos com tags e executa scripts automaticamente.</p>

<h3>Interface padrão de Tags</h3>

<pre><code>export interface TagHandler {
  Tag: string;
  Init(instance: Instance): void | string;
}
</code></pre>

<h3>Exemplo de Tag Handler</h3>

<pre><code>import TagHandler from "shared/Types/TagHandler.ts"
  
const Nome: TagHandler = {
    Tag: "TagName",

    Init(instance) {
        if (!instance.IsA("BasePart")) return;

        instance.Touched.Connect((hit) => {
            // lógica
        });
    },
};
</code></pre>

<p>
Basta:
</p>
<ul>
  <li>Criar um módulo de tag</li>
  <li>Definir a propriedade <code>Tag</code></li>
  <li>Colocar a tag no objeto dentro do Roblox Studio</li>
</ul>

<p>O sistema conecta automaticamente via <code>CollectionService</code>.</p>

<hr>

<h2>DEPRECATED: 💾 Sistema de Dados (ProfileService)</h2>

<p>Os dados do jogador são carregados ao entrar e salvos ao sair.</p>

<pre><code>const ProfileStore = ProfileService.GetProfileStore("PlayerData_V1", {
    Coins: 0,
});
</code></pre>

<p>Os perfis ativos ficam armazenados em memória:</p>

<pre><code>const Profiles = new Map&lt;Player, Profile&lt;PlayerData&gt;&gt;();</code></pre>

<p>Isso permite acessar dados do jogador de qualquer sistema do servidor.</p>

<hr>

<h2>🛠️ Como Rodar o Projeto</h2>

<h3>Instalar dependências</h3>
<pre><code>npm install</code></pre>

<h3>Compilar</h3>
<pre><code>npx rbxtsc</code></pre>

<h3>Modo watch</h3>
<pre><code>npx rbxtsc -w</code></pre>

<hr>

<h2>📌 Padrões do Projeto</h2>

<ul>
  <li>✔ Código modular</li>
  <li>✔ Separação clara entre client/server/shared</li>
  <li>✔ Uso de tipos para tudo</li>
  <li>✔ Nada de lógica solta fora de módulos</li>
  <li>✔ Sistemas baseados em eventos e tags</li>
</ul>

<hr>

<h2>🧩 Ideal Para</h2>

<ul>
  <li>Jogos com vários sistemas independentes</li>
  <li>Projetos grandes que precisam de organização</li>
  <li>Desenvolvedores que querem usar Roblox como um ambiente mais profissional</li>
</ul>

<hr>

<h2>👑 Autor</h2>

<p>
Desenvolvido como base de aprendizado e estrutura profissional para criação de experiências no Roblox usando <b>TypeScript</b>.
</p>
