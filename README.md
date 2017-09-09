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
-------
* [ESLint](https://github.com/eslint/eslint) -- Popular linting tool for code cleanliness
* [Flow](https://github.com/facebook/flow) -- Static typechecker

Deployment & Scripts
--------------------
* [PM2](https://github.com/Unitech/pm2) -- For managing consistent uptime on production

Support For
-----------
These features exist but are not setup initially in this boilerplate.

* [Husky](https://github.com/typicode/husky) -- Allows scrits to run defined in package.json when a Git hook is triggered. e.g.:

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

#### *Special Thanks*

James Gillmore -- [Redux First Router](https://github.com/faceyspacey/redux-first-router)
