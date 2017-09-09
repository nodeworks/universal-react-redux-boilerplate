# Universal React/Redux Boilerplate

This is a full-scale, scalable, and universal React/Redux boilerplate. It provides a lot of choices and may be a bit heavy for use. Make sure to evaluate if you need a boilerplate of this size before diving in.

Some of the features include:

Core & Functionality
--------------------
* [React](https://github.com/facebook/react) -- JavaScript library for building user interfaces
* [Redux](https://github.com/reactjs/redux) -- Universal state container
* [Redux First Router](https://github.com/faceyspacey/redux-first-router) -- Routing managed by Redux
* [Reselect](https://github.com/reactjs/reselect) -- Selector library
* [Express](https://github.com/expressjs/express) -- Server
* [Axios](https://github.com/mzabriskie/axios) -- Promise based HTTP client
* [Firebase](https://github.com/firebase/firebase-js-sdk) -- Streaming data store

Bundling, Compilers, and Package Management
------------------------
* [Webpack](https://github.com/webpack/webpack) -- Bundler that manages compiling all assets
* [Babel](https://github.com/babel/babel) -- Allows use of future/non-universally supported Javascript features
* [Yarn](https://github.com/yarnpkg/yarn) -- Package manager. Replaces NPM

UI
--
* [Reactstrap](https://github.com/reactstrap/reactstrap) -- Bootstrap 4 components
* [React Redux Toastr](https://github.com/diegoddox/react-redux-toastr) -- Wrapper for Toastr notifications and pop-ups
* [React Helmet](https://github.com/nfl/react-helmet) -- Document \<head> manager
* [React Chart.js 2](https://github.com/jerairrest/react-chartjs-2) -- React wrapper for Chart.js
* [SASS](https://github.com/sass/sass) -- CSS pre-processor

Testing
-------
* [Mocha](https://github.com/mochajs/mocha) -- Test runner
* [Chai](https://github.com/chaijs/chai) -- Test assertion library
* [Enzyme](https://github.com/airbnb/enzyme) -- Testing utility for React
* [Storybook](https://github.com/storybooks/storybook) -- View and tweak components and containers in isolation
* [Browsersync](https://github.com/BrowserSync/browser-sync) -- Allows syncing browsers for testing

Linting & Type Checking
-----------------------
* [ESLint](https://github.com/eslint/eslint) -- Popular linting tool for code cleanliness
* [Flow](https://github.com/facebook/flow) -- Static typechecker

Deployment & Scripts
--------------------
* [PM2](https://github.com/Unitech/pm2) -- For managing consistent uptime on production

Support For
-----------
These features exist but are not setup initially in this boilerplate.

* [Husky](https://github.com/typicode/husky) -- Allows scripts to run defined in package.json when a Git hook is triggered. e.g.:

```$javascript
{
  "scripts": {
    "precommit": "npm test",
    "prepush": "npm test",
    "...": "..."
  }
}
```

* [Commitizen](https://github.com/commitizen/cz-cli) -- Standardized commit messages that are customizable

Prerequisites
-------------
**You must have the following npm packages installed globally**
* node & npm
  * Mac: ```brew install node```
  * Windows: Download the [Windows Installer](http://nodejs.org/#download) directly from the nodejs.org web site
  * Debian & Ubuntu: 
  ```
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo apt-get install -y build-essential
  ```
  * RHEL, CentOS and Fedora:
  ```
  curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
  sudo yum -y install nodejs
  sudo yum install gcc-c++ make
  ```
* yarn -- ```npm install -g yarn```

**Suggested packages to install globally**
* flow-typed: ```npm install -g flow-typed```

Setup
-----
1. Clone this repo to your dev environment
2. Run ```yarn``` on the command line in your project root where you cloned the repo to install the required packages
3. Copy ```.env.sample``` to ```.env``` in the root of the project
4. Fill out the ```.env``` file with the required credentials

Commands
--------
#### Server
```yarn start``` -- Starts the dev server 
  * Dev Server: ```http://localhost:3000```, unless changed
  * Dev Server with Browsersync: ```http://localhost:3001```, unless changed
  * Browsersync Dashboard: ```http://localhost:3002```, unless changed

```yarn start:prod``` -- Build and start the prod server

```yarn serve``` -- Start the prod server (without building) -- *warning: must have already been built!*

```yarn prod``` -- Start the prod server using PM2 (without building) -- *warning: must have already been built!*

#### Build & Compile
```yarn build``` -- Build the 3 environments (client, server, node)

```yarn build:client``` -- Build just the client environment

```yarn build:server``` -- Build just the server environment

```yarn build:node``` -- Build just thee node environment

#### Testing & Linting
```yarn test``` -- Run the Mocha/Chai/Enzyme tests

```yarn analyze``` -- Run flow checking

```yarn lint``` -- Run eslint

```yarn lint:fix``` -- Run eslint and automatically fix what it can

```yarn suite``` -- Run tests, linting, and analyzing all at once

```yarn build-storybook``` -- Builds Storybook. This needs to be done before trying to run Storybook for the first time

```yarn storybook``` -- Run storybook (make sure to run build-storybook first if you haven't done it yet)
  * Storybook server: ```http://localhost:9001```, unless changed

#### *Special Thanks*

James Gillmore -- [Redux First Router](https://github.com/faceyspacey/redux-first-router)
