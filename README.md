# React Auto Generator
*Version Beta*

> A React App CLI generator.

Create a new project in react with a simple command. Select wich template you like and get started and which features would you like it to have.

## 🛠️ Built With

- Javascript, Typescript
- React, Node

## 📥 Installation

You can use npx or install it globally

```
$ npm install -g react-auto-generator
```

## ⚡ Quick Start

Start by creating a full react app project with
```
$ react-auto-generator create
or
$ rag c
```

Add schematics to your project, such as functional components, redux or routers with
```
$ react-auto-generator generate
or
$ rag g
```

Or just create your project with those features configurated already with --use-redux or --use-reach-router
```
$ rag create --use-redux
or 
$ rag create --use-reach-router
or
$ rag create --use-redux --use-reach-router
```

## 📣 Commands

### *Create, c*
Creates a new React App project, based on templates.

```
$ rag create <template> <name> <flags>
or
$ rag c <template> <name> <flags>
```

### *Generate, g*
Generates and/or modifies files based on a schematic.
```
$ rag generate <schematic> <name> <flags>
or
$ rag g <schematic> <name> <flags>
```

### *Help, h*
Lists available commands and their short descriptions.
```
$ rag help
or
$ rag h
```
## 🗂️ Templates

### *Basic*
A starter React App with Typescript
```
$ rag create basic <name> <flags>
or
$ rag c basic <name> <flags>
```
## 📑 Schematics

### *Component, c*
A Functional Component with its styles using styled-components.
```
$ rag generate component <name> <flags>
or
$ rag g component <name> <flags>
```

### *Reach-router, rr*
A Functional Component with a @Reach/Router Router wrapper.
```
$ rag generate reach-router <name> <flags>
or
$ rag g reach-router <name> <flags>
```
### *Redux-component, rc*
A reducer, actions and types file.
```
$ rag generate redux-component <name> <flags>
or
$ rag g redux-component <name> <flags>
```
### *Redux-slice, rs*
A @reduxjs/toolkit slice file to insert in the rootReducer.
```
$ rag generate redux-slice <name> <flags>
or
$ rag g redux-slice <name> <flags>
```
### *Redux-config, rconf*
A Redux store, rootReducer and personalized hooks, using @reduxjs/toolkit
```
$ rag generate redux-config <name> <flags>
or
$ rag g redux-config <name> <flags>
```

## 🎌 Option Flags

### *--use-redux*
Initialize project with a redux starter configuration.
```
$ rag create <schematic> <name> --use-redux
or
$ rag c <schematic> <name> --use-redux
```

### *--use-reach-router*
Initialize project with a @reach/router starter configuration.
```
$ rag create <schematic> <name> --use-reach-router
or
$ rag c <schematic> <name> --use-reach-router
```

### *--help*
Lists Available Templates, Schematics, flags, or information about the params needed.
```
$ rag create <schematic> <name> --help
or
$ rag c <schematic> <name> --help
```

### *--install*
Installs Schematics extra dependencies.
```
$ rag generate <schematic> <name> --install
or
$ rag g <schematic> <name> --install
```

## Authors

👤 **Author**

- GitHub: [@Gabriel1590](https://github.com/Gabriel1590)
- LinkedIn: [Gabriel Escorche](https://linkedin.com/in/gabriel-escorche)

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](./MIT.md) licensed.