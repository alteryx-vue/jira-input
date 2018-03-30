<img src='./public/banner.png' height='48'>

[![Build Status](https://travis-ci.org/alteryx-vue/jira-input.svg?branch=master)](https://travis-ci.org/alteryx-vue/jira-input) [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE)
> An Alteryx Connector built with Vue.js and Vuetify

The Jira Input connector for Alteryx downloads project issues from your Jira instance REST API.  This is an updated version of the [original Alteryx macro](https://gallery.alteryx.com/#!app/JIRA-Connector/58d87c2feffc2a0dd0b5ed8f) in the public [Alteryx Gallery](https://gallery.alteryx.com).

# New Features
- Pull issues from multiple projects
- Pull all available issues with single tool instance (recursive pagination)
- Enhanced field selection
- Enhanced filtering with JQL support

### Requirements
- [NodeJS/npm](https://nodejs.org)


## Install/Download

A compiled build can be installed with the [.YXI installer here]() or by downloading from the [Alteryx Gallery]().  Use the instructions below for installing from source.

### clone to HtmlPlugins or Roaming directory

``` bash
# typically in this location - use this option if you have admin rights on your machine
cd "c:/Program Files/Alteryx/bin/HtmlPlugins"

# or if you don't have admin rights...
# cd "c:/Users/{user}/AppData/Roaming/Alteryx/Tools"

# clone this repository
git clone https://github.com/alteryx-vue/jira-input

# cd to project
cd jira-input
```

## Build Setup & Testing

### install dependencies

`npm install`

### Dev Environment Testing

You can use `npm run dev` to serve the project with hot reload for testing in a browser.  
>limited functionality in browser - use for Vue component and/or state management debugging, etc.

__Note__: When using Chrome, be sure to make use of the [Vue.js Devtools Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

### Build Production

Webpack and such..

``` bash
# build & compile
npm run build
```

Webpack [vue-loader](http://vuejs.github.io/vue-loader) is used for compiling `.vue` files.