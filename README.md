# Server-Side Prototype Pollution

Hej! :wave: This repository contains a collection of Server-Side Prototype
Pollution gadgets found in Node.js, Deno standard libraries, and various
third-party NPM packages. We also compile information about known exploits against
popular applications to showcase the impact of these gadgets.

- [What is Prototype Pollution?](#what-is-prototype-pollution)
- [Node.js Gadgets](#nodejs)
- [Deno Gadgets](#deno)
- [NPM Packages Gadgets](#npm-packages)
- [Exploits](#exploits)

## What is Prototype Pollution?

_Prototype pollution_ is a vulnerability specific to JavaScript and TypeScript
that allows an attacker to modify an object's prototype with attacker-controlled
properties. The severity of these vulnerabilities hinges on _gadgets_, fragments
of existing code in vulnerable applications that read undefined
properties and execute security-sentitive actions. For instance, these gadgets can
lead to Remote Code Execution (RCE) attacks.

<p><a href="http://www.youtube.com/watch?feature=player_embedded&v=gCVTbfDecwI" target="_blank">
  <img src="http://img.youtube.com/vi/gCVTbfDecwI/mqdefault.jpg" alt="Watch the video" border="10"  align="right"/>
</a></p>

If you're new to server-side Prototype Pollution, check out our
[DEF CON 31](https://www.youtube.com/watch?v=gCVTbfDecwI) talk for a quick
20-minute introduction to Prototype Pollution vulnerabilities in Node.js,
gadgets, and an example of a real RCE exploit. All accompanying materials, such
as CodeQL queries, benchmarks, experimental results, and links to extended
talks, are available in the repo
[Silent Spring](https://github.com/KTH-LangSec/silent-spring).

We also recommend checking out these papers and blog posts:

- The seminal paper
  ["JavaScript prototype pollution attack in NodeJS"](https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf)
  by Olivier Arteau provides many details on the exploitation and mitigation of
  Prototype Pollution on the server-side.
- The paper
  ["Silent Spring: Prototype Pollution Leads to Remote Code Execution in Node.js"](https://www.usenix.org/system/files/usenixsecurity23-shcherbakov.pdf)
  by Shcherbakov et al. introduces a tool for Prototype Pollution detection and
  and the first gadgets in Node.js stdlib, including a gadget in
  `require`. This repository was developed as a result of this research project. 🤓
- The blog post
  ["Server-side prototype pollution: Black-box detection without the DoS"](https://portswigger.net/research/server-side-prototype-pollution)
  by Gareth Heyes focuses on server-side gadgets and how to detect Prototype
  Pollution using black-box techniques.
- The paper
  ["Undefined-oriented Programming: Detecting and Chaining Prototype Pollution Gadgets in Node.js Template Engines for Malicious Consequences"](https://yinzhicao.org/UoP/UoP-Oakland.pdf)
  by Zhengyu Liu et al. presents a methodology for constructing chains of
  Prototype Pollution gadgets.
- The paper
  ["GHunter: Universal Prototype Pollution Gadgets in JavaScript Runtimes"](https://www.usenix.org/conference/usenixsecurity24/presentation/cornelissen)
  by Cornelissen et al. presents a semi-automated pipeline for systematically
  detecting prototype pollution-based gadgets in the Node.js and Deno runtimes.
- The write-up
  ["Remote Code Execution via Prototype Pollution in Blitz.js"](https://www.sonarsource.com/blog/blitzjs-prototype-pollution/)
  provides an exciting story of exploiting Prototype Pollution in Blitz.js, a
  fullstack toolkit for Next.js.
- Is Prototype Pollution possible on the client-side? Check out
  [this repo](https://github.com/BlackFan/client-side-prototype-pollution)


> [!NOTE]
> If you want to add new gadgets, please create a Pull Request. Feel
> free to ask any questions, discuss new ideas for Prototype Pollution research,
> or suggest improvements for this repo.
> Contact: [Mikhail Shcherbakov](https://twitter.com/yu5k3), [Eric Cornelissen](https://github.com/ericcornelissen), and [Musard Balliu](https://people.kth.se/~musard/)

## Node.js

| Function                                                                          | Polluted Properties                                                             | Type                               | Notes                                                                                                  | Found by                                                                                                                                                            |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [child_process.exec](/nodejs/child_process/exec.env.PoC.js)                       | `NODE_OPTIONS`                                                                  | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.execFile](/nodejs/child_process/execFile.env.PoC.js)               | `NODE_OPTIONS`                                                                  | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.execFileSync](/nodejs/child_process/execFileSync.env.PoC.js)       | `shell`; `NODE_OPTIONS`                                                         | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.execFileSync](/nodejs/child_process/execFileSync.input.win.PoC.js) | `shell`; `input`                                                                | ACI                                | :warning: Partially fixed now. For Windows only.                                                       | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.execSync](/nodejs/child_process/execSync.env.PoC.js)               | `NODE_OPTIONS`                                                                  | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.execSync](/nodejs/child_process/execSync.env.lnx.PoC.js)           | `shell`; `env`                                                                  | ACI                                | :warning: Fixed now. For Linux only.                                                                   | [Michał Bentkowski](https://research.securitum.com/prototype-pollution-rce-kibana-cve-2019-7609/) and [Silent Spring](https://github.com/KTH-LangSec/silent-spring) |
| [child_process.execSync](/nodejs/child_process/execSync.input.win.PoC.js)         | `shell`; `input`                                                                | ACI                                | :warning: Fixed now. For Windows only.                                                                 | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.fork](/nodejs/child_process/fork.env.PoC.js)                       | `NODE_OPTIONS`                                                                  | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.spawn](/nodejs/child_process/spawn.env.PoC.js)                     | `shell`; `env`                                                                  | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.spawn](/nodejs/child_process/spawn.input.win.PoC.js)               | `shell`; `input`                                                                | ACI                                | :warning: Fixed now. For Windows only.                                                                 | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.spawnSync](/nodejs/child_process/spawnSync.env.PoC.js)             | `shell`; `NODE_OPTIONS`                                                         | ACI                                | :warning: Partially fixed now. Connect by [shell.js](/nodejs/child_process/shell.js).                  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [child_process.spawnSync](/nodejs/child_process/spawnSync.env.lnx.PoC.js)         | `shell`; `env`                                                                  | ACI                                | :warning: Fixed (partially?) now. For Linux only.                                                      | [Michał Bentkowski](https://research.securitum.com/prototype-pollution-rce-kibana-cve-2019-7609/) and [Silent Spring](https://github.com/KTH-LangSec/silent-spring) |
| [child_process.spawnSync](/nodejs/child_process/spawnSync.input.win.PoC.js)       | `shell`; `input`                                                                | ACI                                | :warning: Partially fixed now. For Windows only.                                                       | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [fetch](/nodejs/http/fetch.options.PoC.js)                                        | `method`; `body`; `referrer`                                                    | Privilege Escalation               |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [fetch](/nodejs/http/fetch.socketPath.PoC.js)                                     | `socketPath`                                                                    | SSRF                               |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [http.get](/nodejs/http/get.options.PoC.js)                                       | `hostname`, `headers`, `method`, `path`, `port`                                 | SSRF                               |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [http.request](/nodejs/http/request.options.PoC.js)                               | `hostname`, `headers`, `method`, `path`, `port`                                 | SSRF                               |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [http.Server.listen](/nodejs/http/listen.host.PoC.js)                             | `backlog`                                                                       | Segfault                           |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [https.get](/nodejs/https/get.options.PoC.js)                                     | `hostname`, `headers`, `method`, `path`, `port`, `NODE_TLS_REJECT_UNAUTHORIZED` | SSRF                               |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [https.request](/nodejs/https/request.options.PoC.js)                             | `hostname`, `headers`, `method`, `path`, `port`, `NODE_TLS_REJECT_UNAUTHORIZED` | SSRF                               |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [import](/nodejs/import/import.source.PoC.js)                                     | `source`                                                                        | ACE                                |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [tls.connect](/nodejs/https/tls.connect.PoC.js)                                   | `path`, `port`, `NODE_TLS_REJECT_UNAUTHORIZED`                                  | Second order SSRF                  |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [require](/nodejs/require/require.main.PoC.js)                                    | `main`; `NODE_OPTIONS`                                                          | ACI                                | :warning: Fixed now. Requires the absence of `main` property in `package.json` of the loaded package   | [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                                                                                       |
| [require](/nodejs/require/require.main2.PoC.js)                                   | `main`; `NODE_OPTIONS`                                                          | ACI                                | :warning: Fixed in v18.19.0. Requires the absence of `package.json` in the directory from the argument | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |
| [Worker.constructor](/nodejs/working_threads/ctor.PoC.js)                         | `argv`, `env`, `eval`                                                           | Second order ACE and env injection |                                                                                                        | [GHunter](https://github.com/KTH-LangSec/ghunter)                                                                                                                   |

## Deno

| Function                                                                             | Polluted Properties                  | Type                        | Notes                                 | Found by                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------ | --------------------------- | ------------------------------------- | ------------------------------------------------- |
| [fetch](/deno/fetch/fetch.PoC.ts)                                                    | `body`; `headers`; `method`; `0`     | Server Side Request Forgery | Limited by network permissions        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.env.PoC.ts)                                             | `env`                                | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.ffi.PoC.ts)                                             | `ffi`                                | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.hrtime.PoC.ts)                                          | `hrtime`                             | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.net.PoC.ts)                                             | `net`                                | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.read.PoC.ts)                                            | `read`                               | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.run.PoC.ts)                                             | `run`                                | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.sys.PoC.ts)                                             | `sys`                                | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Worker](/deno/Worker/Worker.write.PoC.ts)                                           | `write`                              | Privilege Escalation        | Limited by parent process permissions | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempDir](/deno/Deno/makeTempDir/makeTempDir.dir.PoC.ts)                    | `dir`                                | Path Traversal              | Limited by file system permissions    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempDir](/deno/Deno/makeTempDir/makeTempDir.prefix.PoC.ts)                 | `prefix`                             | Path Traversal              | Limited by file system permissions`*` | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempDirSync](/deno/Deno/makeTempDir/makeTempDirSync.dir.PoC.ts)            | `dir`                                | Path Traversal              | Limited by file system permissions    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempDirSync](/deno/Deno/makeTempDir/makeTempDirSync.prefix.PoC.ts)         | `prefix`                             | Path Traversal              | Limited by file system permissions`*` | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempFile](/deno/Deno/makeTempFile/makeTempFile.dir.PoC.ts)                 | `dir`                                | Path Traversal              | Limited by file system permissions    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempFile](/deno/Deno/makeTempFile/makeTempFile.prefix.PoC.ts)              | `prefix`                             | Path Traversal              | Limited by file system permissions`*` | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempFileSync](/deno/Deno/makeTempFile/makeTempFileSync.dir.PoC.ts)         | `dir`                                | Path Traversal              | Limited by file system permissions    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.makeTempFileSync](/deno/Deno/makeTempFile/makeTempFileSync.prefix.PoC.ts)      | `prefix`                             | Path Traversal              | Limited by file system permissions`*` | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.mkdir](/deno/Deno/mkdir/mkdir.mode.PoC.ts)                                     | `mode`                               | Privilege Escalation        | `options` must not be undefined       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.mkdirSync](/deno/Deno/mkdir/mkdirSync.mode.PoC.ts)                             | `mode`                               | Privilege Escalation        | `options` must not be undefined       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.open](/deno/Deno/open/open.append.PoC.ts)                                      | `append`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.open](/deno/Deno/open/open.mode.PoC.ts)                                        | `mode`                               | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.open](/deno/Deno/open/open.truncate.PoC.ts)                                    | `truncate`                           | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.openSync](/deno/Deno/open/open.append.PoC.ts)                                  | `append`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.openSync](/deno/Deno/open/open.mode.PoC.ts)                                    | `mode`                               | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.openSync](/deno/Deno/open/open.truncate.PoC.ts)                                | `truncate`                           | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeFile](/deno/Deno/writeFile/writeFile.append.PoC.ts)                       | `append`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeFile](/deno/Deno/writeFile/writeFile.mode.PoC.ts)                         | `mode`                               | Privilege Escalation        | Affects new and existing files        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeFileSync](/deno/Deno/writeFile/writeFileSync.append.PoC.ts)               | `append`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeFileSync](/deno/Deno/writeFile/writeFileSync.mode.PoC.ts)                 | `mode`                               | Privilege Escalation        | Affects new and existing files        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeTextFile](/deno/Deno/writeTextFile/writeTextFile.append.PoC.ts)           | `append`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeTextFile](/deno/Deno/writeTextFile/writeTextFile.mode.PoC.ts)             | `mode`                               | Privilege Escalation        | Affects new and existing files        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeTextFileSync](/deno/Deno/writeTextFile/writeTextFileSync.append.PoC.ts)   | `append`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.writeTextFileSync](/deno/Deno/writeTextFile/writeTextFileSync.mode.PoC.ts)     | `mode`                               | Privilege Escalation        | Affects new and existing files        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.run](/deno/Deno/run/run.cwd.PoC.ts)                                            | `cwd`                                | Path Traversal              |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.run](/deno/Deno/run/run.uid.PoC.ts)                                            | `uid`                                | Privilege Escalation        | unstable option                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.run](/deno/Deno/run/run.gid.PoC.ts)                                            | `gid`                                | Privilege Escalation        | unstable option                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.Command](/deno/Deno/Command/Command.cwd.PoC.ts)                                | `cwd`                                | Path Traversal              |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.Command](/deno/Deno/Command/Command.uid.PoC.ts)                                | `uid`                                | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [Deno.Command](/deno/Deno/Command/Command.gid.PoC.ts)                                | `gid`                                | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.spawn](/deno/node/child_process/spawn.uid.PoC.ts)                | `uid`                                | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.spawn](/deno/node/child_process/spawn.gid.PoC.ts)                | `gid`                                | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.spawn](/deno/node/child_process/spawn.env.PoC.ts)                | `shell`; `env`                       | Arbitrary Code Execution    | Limited by run permissions            | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.spawnSync](/deno/node/child_process/spawnSync.env.PoC.ts)        | `shell`; `env`                       | Arbitrary Code Execution    | Limited by run permissions            | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.exec](/deno/node/child_process/exec.env.PoC.ts)                  | `shell`; `env`                       | Arbitrary Code Execution    | Limited by run permissions            | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.execSync](/deno/node/child_process/execSync.env.PoC.ts)          | `shell`; `env`                       | Arbitrary Code Execution    | Limited by run permissions            | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:child_process.execFileSync](/deno/node/child_process/execFileSync.env.PoC.ts)  | `shell`; `env`                       | Arbitrary Code Execution    | Limited by run permissions            | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:fs.appendFile](/deno/node/fs/appendFile.length.PoC.ts)                         | `length`                             | Hanging                     | Can't be prevented (not an option)    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:fs.appendFile](/deno/node/fs/appendFile.offset.PoC.ts)                         | `offset`                             | Out of Memory               | Can't be prevented (not an option)    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:fs.writeFile](/deno/node/fs/writeFile.length.PoC.ts)                           | `length`                             | Hanging                     | Can't be prevented (not an option)    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:fs.writeFile](/deno/node/fs/writeFile.offset.PoC.ts)                           | `offset`                             | Out of Memory               | Can't be prevented (not an option)    | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:http.request](/deno/node/http/request.hostname.PoC.ts)                         | `hostname`; `method`; `path`; `port` | Server Side Request Forgery | Limited by network permissions        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:https.request](/deno/node/https/request.hostname.PoC.ts)                       | `hostname`; `method`; `path`; `port` | Server Side Request Forgery | Limited by network permissions        | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [node:zlib.createBrotliCompress](/deno/node/zlib/createBrotliCompress.params.PoC.ts) | `params`                             | Panic                       |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [json.JsonStringifyStream](/deno/std/json/JsonStringifyStream.prefix.PoC.ts)         | `prefix`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [json.JsonStringifyStream](/deno/std/json/JsonStringifyStream.suffix.PoC.ts)         | `suffix`                             | Unauthorized Modifications  |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [log.FileHandler](/deno/std/log/FileHandler.formatter.PoC.ts)                        | `formatter`                          | Log Pollution               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.load](/deno/std/dotenv/load.any.PoC.ts)                                      | _any_                                | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.load](/deno/std/dotenv/load.defaultsPath.PoC.ts)                             | `defaultsPath`                       | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.load](/deno/std/dotenv/load.envPath.PoC.ts)                                  | `envPath`                            | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.load](/deno/std/dotenv/load.export.PoC.ts)                                   | `export`                             | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.loadSync](/deno/std/dotenv/loadSync.any.PoC.ts)                              | _any_                                | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.loadSync](/deno/std/dotenv/loadSync.defaultsPath.PoC.ts)                     | `defaultsPath`                       | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.loadSync](/deno/std/dotenv/loadSync.envPath.PoC.ts)                          | `envPath`                            | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [dotenv.loadSync](/deno/std/dotenv/loadSync.export.PoC.ts)                           | `export`                             | Env injection               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [tar.Tar.append](/deno/std/tar/Tar.uid.PoC.ts)                                       | `uid`                                | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [tar.Tar.append](/deno/std/tar/Tar.gid.PoC.ts)                                       | `gid`                                | Privilege Escalation        |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |
| [yaml.stringify](/deno/std/yaml/stringify.indent.PoC.ts)                             | `indent`                             | Out of Memory               |                                       | [GHunter](https://github.com/KTH-LangSec/ghunter) |


`*`: This was not the case prior to Deno v1.41.1, see `CVE-2024-27931`.

## NPM Packages

| Package             | Version | Function                                                                            | Polluted Properties          | Type | Found by                                                      |
| ------------------- | ------- | ----------------------------------------------------------------------------------- | ---------------------------- | ---- | ------------------------------------------------------------- |
| asyncawait          | 3.0.0   | [require](/npm-packages/asyncawait/asyncawait.PoC.js)                               | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| better-queue        | 3.8.12  | [push](/npm-packages/better-queue/better-queue.PoC.js)                              | `store`                      | LFI* | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| binary-parser       | 2.2.1   | [parse](/npm-packages/binary-parser/binary-parser.PoC.js)                           | `alias`                      | ACE  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| bson                | 4.7.2   | [deserialize](/npm-packages/bson/bson.PoC.js)                                       | `evalFunctions`              | ACE  | [Silent Spring](https://github.com/KTH-LangSec/silent-spring) |
| chrome-launcher     | 0.15.2  | [launch](/npm-packages/chrome-launcher/chrome-launcher.PoC.js)                      | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| coffee              | 5.5.0   | [fork](/npm-packages/coffee/coffee.fork.PoC.js)                                     | `env`                        | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| coffee              | 5.5.0   | [spawn](/npm-packages/coffee/coffee.spawn.PoC.js)                                   | `shell`; `env`               | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| crawler             | 1.4.0   | [queue](/npm-packages/crawler/crawler.PoC.js)                                       | `repo`                       | LFI* | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| cross-port-killer   | 1.4.0   | [kill](/npm-packages/cross-port-killer/cross-port-killer.PoC.js)                    | `shell`; `env`               | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| cross-spawn         | 7.0.3   | [spawn](/npm-packages/cross-spawn/cross-spawn.spawn.PoC.js)                         | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| cross-spawn         | 7.0.3   | [spawn.sync](/npm-packages/cross-spawn/cross-spawn.spawn.sync.PoC.js)               | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| csv-write-stream    | 2.0.0   | [end](/npm-packages/csv-write-stream/csv-write-stream.PoC.js)                       | `separator`                  | ACE  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| dockerfile_lint     | 0.3.4   | [DockerFileValidator](/npm-packages/dockerfile_lint/dockerfile_lint.PoC.js)         | `arrays.regex`               | ACE  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| download-git-repo   | 3.0.2   | [download-git-repo](/npm-packages/download-git-repo/download-git-repo.PoC.js)       | `clone`; `GIT_SSH_COMMAND`   | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| dtrace-provider     | 0.8.5   | [require](/npm-packages/dtrace-provider/dtrace-provider.PoC.js)                     | any                          | LFI* | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| ejs                 | 3.1.9   | [render](/npm-packages/ejs/ejs.PoC.js)                                              | `client`; `escapeFunction`   | ACE  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| esformatter         | 0.11.3  | [format](/npm-packages/esformatter/esformatter.PoC.js)                              | `plugins`                    | LFI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| exec                | 0.2.1   | [exec](/npm-packages/exec/exec.PoC.js)                                              | `shell`                      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| external-editor     | 3.1.0   | [edit](/npm-packages/external-editor/external-editor.edit.PoC.js)                   | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| external-editor     | 3.1.0   | [editAsync](/npm-packages/external-editor/external-editor.edit.PoC.js)              | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| fibers              | 5.0.3   | [require](/npm-packages/fibers/fibers.PoC.js)                                       | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| find-process        | 1.4.7   | [find-process](/npm-packages/find-process/find-process.PoC.js)                      | `shell`; `NODE_OPTIONS`      | ACI* | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| fluent-ffmpeg       | 2.1.2   | [preset](/npm-packages/fluent-ffmpeg/fluent-ffmpeg.PoC.js)                          | `presets`                    | LFI* | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| forever-monitor     | 3.0.3   | [start](/npm-packages/forever-monitor/forever-monitor.PoC.js)                       | `command`                    | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| gh-pages            | 5.0.0   | [publish](/npm-packages/gh-pages/gh-pages.PoC.js)                                   | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| gift                | 0.10.2  | [clone](/npm-packages/gift/gift.clone.PoC.js)                                       | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| git-clone           | 0.2.0   | [git-clone](/npm-packages/git-clone/git-clone.PoC.js)                               | `GIT_SSH_COMMAND`            | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| gm                  | 1.25.0  | [gm](/npm-packages/gm/gm.PoC.js)                                                    | `appPath`                    | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| growl               | 1.10.5  | [growl](/npm-packages/growl/growl.PoC.js)                                           | `exec`                       | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| handlebars          | 4.5.2   | [`ret`](/npm-packages/handlebars/handlebars.Poc.js)                                 | `type`;`body`                | ACE  |                                                               |
| hbsfy               | 2.8.1   | [configure](/npm-packages/hbsfy/hbsfy.configure.PoC.js)                             | `p`                          | LFI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| hbsfy               | 2.8.1   | [compile](/npm-packages/hbsfy/hbsfy.configure.PoC.js)                               | `p`                          | LFI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| jsdoc-api           | 8.0.0   | [explain](/npm-packages/jsdoc-api/jsdoc-api.explain.PoC.js)                         | `NODE_OPTIONS`               | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| jsdoc-api           | 8.0.0   | [explainSync](/npm-packages/jsdoc-api/jsdoc-api.explainSync.PoC.js)                 | `env.NODE_OPTIONS`           | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| jsdoc-api           | 8.0.0   | [renderSync](/npm-packages/jsdoc-api/jsdoc-api.renderSync.PoC.js)                   | `NODE_OPTIONS`               | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| jsdoc-to-markdown   | 8.0.0   | [render](/npm-packages/jsdoc-to-markdown/jsdoc-to-markdown.render.PoC.js)           | `NODE_OPTIONS`; `source`     | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| jsdoc-to-markdown   | 8.0.0   | [renderSync](/npm-packages/jsdoc-to-markdown/jsdoc-to-markdown.renderSync.PoC.js)   | `NODE_OPTIONS`; `source`     | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| liftoff             | 4.0.0   | [prepare](/npm-packages/liftoff/liftoff.PoC.js)                                     | `env.NODE_OPTIONS`           | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| lodash.template     | 4.5.0   | [lodash.template](/npm-packages/lodash.template/lodash.template.PoC.js)             | `sourceURL`                  | ACE  | [Alex Brasetvik](https://hackerone.com/alexbrasetvik)         |
| mrm-core            | 7.1.14  | [install](/npm-packages/mrm-core/mrm-core.PoC.js)                                   | `shell`; `env.NODE_OPTIONS`  | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| nodemailer          | 6.9.1   | [sendMail](npm-packages/nodemailer/nodemailer.PoC.js)                               | `sendmail`; `path`; `args`   | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| ping                | 0.4.4   | [sys.probe](/npm-packages/ping/ping.PoC.js)                                         | `shell`                      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| play-sound          | 1.1.5   | [play-sound](/npm-packages/play-sound/play-sound.ctor.PoC.js)                       | `players`                    | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| play-sound          | 1.1.5   | [play](/npm-packages/play-sound/play-sound.play.PoC.js)                             | `player`; `env.NODE_OPTIONS` | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| primus              | 8.0.7   | [parser](/npm-packages/primus/primus.parser.PoC.js)                                 | `parser`; value              | LFI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| primus              | 8.0.7   | [transformer](/npm-packages/primus/primus.transformer.PoC.js)                       | `transformer`; value         | LFI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| pug           | all versions  | [`Template`](/npm-packages/pug/pug.Poc.js)                                          | `block`                      | ACE  |                                                               |
| python-shell        | 5.0.0   | [runString](/npm-packages/python-shell/python-shell.PoC.js)                         | `pythonPath`; `NODE_OPTIONS` | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| require-from-string | 2.0.2   | [require-from-string](/npm-packages/require-from-string/require-from-string.PoC.js) | `prependPaths`               | LFI* | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| requireg            | 0.2.2   | [resolve](/npm-packages/requireg/requireg.PoC.js)                                   | `shell`; `env.NODE_OPTIONS`  | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| sonarqube-scanner   | 3.0.1   | [sonarqube-scanner](/npm-packages/sonarqube-scanner/sonarqube-scanner.PoC.js)       | `version`                    | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| teen_process        | 2.0.4   | [start](/npm-packages/teen_process/teen_process.PoC.js)                             | `shell`; `env.NODE_OPTIONS`  | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| the-script-jsdoc    | 2.0.4   | [the-script-jsdoc](/npm-packages/the-script-jsdoc/the-script-jsdoc.PoC.js)          | `shell`; `env.NODE_OPTIONS`  | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| tingodb             | 0.6.1   | [findOne](/npm-packages/tingodb/tingodb.PoC.js)                                     | `_sub`                       | ACE  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| window-size         | 1.1.1   | [tput](/npm-packages/window-size/window-size.PoC.js)                                | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| winreg              | 1.2.4   | [values](/npm-packages/winreg/winreg.PoC.js)                                        | `shell`; `NODE_OPTIONS`      | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| workerpool          | 6.4.0   | [exec](/npm-packages/workerpool/workerpool.PoC.js)                                  | `env.NODE_OPTIONS`           | ACI  | [Dasty](https://github.com/KTH-LangSec/Dasty)                 |
| node-blade          | 3.3.1   | [compile](/npm-packages/node-blade/app-1.js)                                 | `code`, `value`                       | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| node-blade          | 3.3.1   | [compile](/npm-packages/node-blade/app-5.js)                                 | `line`, `value`                       | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| node-blade          | 3.3.1   | [compile](/npm-packages/node-blade/app-2.js)                                 | `include`, `exposing`, `value`        | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| node-blade          | 3.3.1   | [compile](/npm-packages/node-blade/app-3.js)                                 | `output`, `value`           | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| node-blade          | 3.3.1   | [compile](/npm-packages/node-blade/app-4.js)                                 | `itemAlias`, `value`      | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| node-blade          | 3.3.1   | [compile](/npm-packages/node-blade/app-6.js)                                 | `templateNamespace`, `value`          | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| ejs                 | 2.7.4   | [renderFile](/npm-packages/ejs@2.7.4/app-1.js)                                  | `escape`, `client`                    | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| ejs                 | 2.7.4   | [renderFile](/npm-packages/ejs@2.7.4/app-2.js)                                  | `destructuredLocals`                  | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| squirrellyJS        | 8.0.8   | [renderFile](/npm-packages/squirrelly/app-0.js)                         | `settings`                            | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| squirrellyJS        | 8.0.8   | [renderFile](/npm-packages/squirrelly/app-1.js)                         | `settings`, `n`                       | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| dustjs              | 3.0.1   | [render](/npm-packages/dustjs/app-0.js)                                         | `title`                         | XSS   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| ect                 | 0.5.9   | [ECT](/npm-packages/ect/app-0.js)                                                | `indent`                              | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| ect (coffee-script) | 1.12.7  | [ECT](/npm-packages/ect/app-1.js)                                  | `filename`, `inlineMap`               | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| doT                 | 1.1.3   | [process](/npm-packages/doT/app-0.js)                                        | `global`                              | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| doT                 | 1.1.3   | [process](/npm-packages/doT/app-1.js)                                        | `destination`                         | FileIO | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| pug                 | 3.0.2   | [compile](/npm-packages/pug/app-0.js)                                        | `code`                                | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| pug                 | 3.0.2   | [compile](/npm-packages/pug/app-1.js)                                        | `attrs`, `val`                        | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| jade                | 1.11.0  | [renderFile](/npm-packages/jade/app-0.js)                                 | `code`, `self`                        | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| jade                | 1.11.0  | [renderFile](/npm-packages/jade/app-1.js)                                 | `block`, `self`                       | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| hamlet              | 0.3.3   | [hamlet](/npm-packages/hamlet/app-0.js)                                       | `filename`                            | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| hamlet              | 0.3.3   | [hamlet](/npm-packages/hamlet/app-1.js)                                       | `variable`                            | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| mote                | 0.2.0   | [compile](/npm-packages/mote/app-0.js)                                         | `ANYKEY*`                             | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| ractive.js          | 1.4.2   | [toHTML](/npm-packages/ractive.js/app-0.js)                                     | `statics`                             | ACE   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |
| saker               | 1.1.1   | [compile](/npm-packages/saker/app-0.js)                                        | `$saker_raw$`, `str`                  | XSS   | [UoPF](https://github.com/jackfromeast/UoPGadget)            |

`*`: denotes the gadgets that require the attacker’s control of a local file for
arbitrary code execution.

<!-- | consolidate         | 0.16.0  | [jazz](/npm-packages/consolidate/jazz.PoC.js)                                       |                    |     | | -->
<!-- | consolidate         | 0.16.0  | [underscore](/npm-packages/consolidate/underscore.PoC.js)                           |                    |     | | -->
<!-- | dot                 | 1.1.3   | [process](/npm-packages/dot/dot.PoC.js)                                             |                    |     | | -->
<!-- | koa-views           | 8.0.0   | [koa-views](/npm-packages/koa-views/koa-views.PoC.js)                               |                    |     | | -->

## Exploits

| Vulnerability Report                                                                                      | Application  | Version | Attack | Gadget                                                                    |
| --------------------------------------------------------------------------------------------------------- | ------------ | ------- | ------ | ------------------------------------------------------------------------- |
| [CVE-2019-7609](https://research.securitum.com/prototype-pollution-rce-kibana-cve-2019-7609/)             | Kibana       | 6.6.0   | RCE    | [child_process.spawn.lnx](/nodejs/child_process/spawnSync.env.lnx.PoC.js) |
| [HackerOne #852613](https://hackerone.com/reports/852613)                                                 | Kibana       | 7.6.2   | RCE    | [lodash.template](/npm-packages/lodash.template/lodash.template.PoC.js)   |
| [HackerOne #861744](https://hackerone.com/reports/861744)                                                 | Kibana       | 7.7.0   | RCE    | [lodash.template](/npm-packages/lodash.template/lodash.template.PoC.js)   |
| Reported by [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                 | npm cli      | 8.1.0   | RCE    | child_process.spawn                                                       |
| [CVE-2022-24760](https://huntr.com/bounties/ac24b343-e7da-4bc7-ab38-4f4f5cc9d099/)                        | Parse Server | 4.10.6  | RCE    | [bson](/npm-packages/bson/bson.PoC.js)                                    |
| [CVE-2022-39396](https://github.com/parse-community/parse-server/security/advisories/GHSA-prm5-8g2m-24gg) | Parse Server | 5.3.1   | RCE    | [bson](/npm-packages/bson/bson.PoC.js)                                    |
| [CVE-2022-41878](https://github.com/parse-community/parse-server/security/advisories/GHSA-xprv-wvh7-qqqx) | Parse Server | 5.3.1   | RCE    | [bson](/npm-packages/bson/bson.PoC.js)                                    |
| [CVE-2022-41879](https://github.com/parse-community/parse-server/security/advisories/GHSA-93vw-8fm5-p2jf) | Parse Server | 5.3.1   | RCE    | [bson](/npm-packages/bson/bson.PoC.js)                                    |
| Reported by [Silent Spring](https://github.com/KTH-LangSec/silent-spring)                                 | Parse Server | 5.3.1   | RCE    | [require #1](/nodejs/require/require.main.PoC.js)                         |
| [CVE-2023-23917](https://hackerone.com/reports/1631258)                                                   | Rocket.Chat  | 5.1.5   | RCE    | [bson](/npm-packages/bson/bson.PoC.js)                                    |
| CVE-2023-31414                                                                                            | Kibana       | 8.7.0   | RCE    | [require #2](/nodejs/require/require.main2.PoC.js)                        |
| CVE-2023-31415                                                                                            | Kibana       | 8.7.0   | RCE    | [nodemailer](npm-packages/nodemailer/nodemailer.PoC.js)                   |
| [CVE-2023-36475](https://github.com/parse-community/parse-server/security/advisories/GHSA-462x-c3jw-7vr6) | Parse Server | 6.2.1   | RCE    | [bson](/npm-packages/bson/bson.PoC.js)                                    |
