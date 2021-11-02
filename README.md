# Matrix Screensaver

![enter image description here](https://img.shields.io/badge/nodejs-%3E=%2014.16-green) ![enter image description here](https://img.shields.io/badge/electronjs-12.0.2-green)

Aplicação desenvolvida em ElectronJs imitando o comportamento da screensaver do SO com efeito Matrix

### Instalação
```
yarn install
```

### Gerar instalador
```
yarn dist
```
Será criada uma pasta "dist" contendo o instalador após a execução.

### Funcionalidades
A screensaver irá aparecer após 10 min de inatividade do mouse ou teclado.

#### Features
 - [x] Fullscreen em múltiplos monitores
 - [x] Screensaver desaparece aos seguintes inputs:
	 - [x] Movimento do mouse
	 - [x] Click esquerdo do mouse
	 - [x] Tecla pressionada
 - [x] Menu na barra de tarefas com as seguintes opções:
	 - [x] checkbox Ligado/Desligado *(Ativa e desativa manualmente a aparição da screensaver)*
	 - [x] Sair *(Encerra o aplicativo)*
	 - [x] Click direito do mouse abre instantaneamente a screensaver  
	 - [ ]  Ajuste do tempo de inatividade
	 - [ ] Opção de iniciar junto ao logon
