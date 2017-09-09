import { configure } from '@storybook/react';
import 'babel-polyfill';

function loadStories() {
  require('../src/stories/index.js');
}

configure(loadStories, module);
