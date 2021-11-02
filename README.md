# Matrix Screensaver

![Nodejs](https://img.shields.io/badge/nodejs-%3E=%2014.16-green) ![Electronjs](https://img.shields.io/badge/electronjs-12.0.2-green)

Aplicação desenvolvida em ElectronJs imitando o comportamento da screensaver do SO com efeito Matrix

<div align="center">
	<img src="https://cdn.discordapp.com/attachments/904884390407065660/904886112953188363/matrix-screensave.gif" />
</div>

### Instalação

```
yarn install
```

### Gerar instalador

```
yarn dist
```

Será criada uma pasta "dist" contendo o instalador após a execução.
Exemplo: no caso do Windows "matrix-screensaver Setup x.x.x.exe"

### Funcionalidades

A screensaver irá aparecer após 10 min de inatividade do mouse ou teclado.

#### Features

- [x] Fullscreen em múltiplos monitores
- [x] Screensaver desaparece aos seguintes inputs:
  - [x] Movimento do mouse
  - [x] Click esquerdo do mouse
  - [x] Tecla pressionada
- [x] Menu na barra de tarefas com as seguintes opções:
  - [x] checkbox Ligado/Desligado _(Ativa e desativa manualmente a aparição da screensaver)_
  - [x] Sair _(Encerra o aplicativo)_
  - [x] Click direito do mouse abre instantaneamente a screensaver
  - [ ] Ajuste do tempo de inatividade
  - [ ] Opção de iniciar junto ao logon
