'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findVideos = exports.findVideos = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(category, jwToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fakeDelay(1000);

          case 2:
            if (jwToken) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', []);

          case 4:
            _context.t0 = category;
            _context.next = _context.t0 === 'fp' ? 7 : _context.t0 === 'react-redux' ? 8 : _context.t0 === 'db-graphql' ? 9 : 10;
            break;

          case 7:
            return _context.abrupt('return', fpVideos);

          case 8:
            return _context.abrupt('return', reactReduxVideos);

          case 9:
            return _context.abrupt('return', dbGraphqlVideos);

          case 10:
            return _context.abrupt('return', []);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function findVideos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var findVideo = exports.findVideo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(slug, jwToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fakeDelay(500);

          case 2:
            if (jwToken) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return', null);

          case 4:
            return _context2.abrupt('return', allVideos.find(function (video) {
              return video.slug === slug;
            }));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function findVideo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var fakeDelay = function fakeDelay() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

var fpVideos = [{
  youtubeId: '6mTbuzafcII',
  slug: 'transducers',
  title: 'Transducers',
  by: 'Rich Hickey',
  category: 'Functional Programming',
  color: 'blue',
  tip: 'Redux-First Router does not require you to embed actual links into the page \n            to get the benefit of a synced address bar. Regular actions if matched\n            will change the URL. That makes it easy to apply to an existing SPA Redux\n            lacking in routing/URLs!'
}, {
  youtubeId: 'zBHB9i8e3Kc',
  slug: 'introduction-to-elm',
  title: 'Introduction to Elm',
  by: 'Richard Feldman',
  category: 'Functional Programming',
  color: 'blue',
  tip: 'Redux reducers programmatically allow you to produce any state you need.\n          So logically Route Matching components such as in React Reacter only\n          allow you to do LESS, but with a MORE complicated API.'
}, {
  youtubeId: 'mty0RwkPmE8',
  slug: 'next-five-years-of-clojurescript',
  title: 'The Next Five Years of ClojureScript ',
  by: 'David Nolen',
  category: 'Functional Programming',
  color: 'blue',
  tip: 'In your actions.meta.location key passed to your reducers you have all sorts\n          of information: the previous route, its type and payload, history, whether\n          the browser back/next buttons were used and if the action was dispatched on load.\n          Check the "kind" key.'
}];

var reactReduxVideos = [{
  youtubeId: 'qa72q70gAb4',
  slug: 'unraveling-navigation-in-react-native',
  title: 'Unraveling Navigation in React Native',
  by: 'Adam Miskiewicz',
  category: 'React & Redux',
  color: 'red',
  tip: 'Redux-First Router tries in all cases to mirror the Redux API. There is no need\n          to pass your thunk :params such as in an express request or the like. Just grab it\n          from the payload stored in the location state.'
}, {
  youtubeId: 'zD_judE-bXk',
  slug: 'recomposing-your-react-application',
  title: 'Recomposing your React application at react-europe ',
  by: 'Andrew Clark',
  category: 'React & Redux',
  color: 'red',
  tip: 'Redux-First Router requires your payload to be objects, as its keys are directionally extracted\n          and from your URLs and passed from payloads to URL path segments. Your free\n          to use whatever payload you like for redux actions not connected to your routes. Not all\n          actions need to be connected to routes.'
}, {
  youtubeId: 'uvAXVMwHJXU',
  slug: 'the-redux-journey',
  title: 'The Redux Journey',
  by: 'Dan Abramov',
  category: 'React & Redux',
  color: 'red',
  tip: 'The <Link /> component embeds paths in hrefs for SEO, but you don\'t need to use it\n          to get the benefits of a changing address bar. Actions that match routes will\n          trigger the corresponding URL even if you dispatch them directly.'
}];

var dbGraphqlVideos = [{
  youtubeId: 'fU9hR3kiOK0',
  slug: 'turning-the-db-inside-out',
  title: 'Turning the database inside out',
  by: 'Martin Kleppmann',
  category: 'Database & GraphQL',
  color: 'orange',
  tip: 'The \'thunk\' feature is optional, but very useful. Using our \'thunk\' feature allows you\n          to define it in one place while linking to the route from many places without\n          worrying about getting the data first. It\'s also very easy to handle server-side.'
}, {
  youtubeId: '_5VShOmnfQ0',
  slug: 'normalized-caching-in-apollo-ios',
  title: 'Normalized Caching in Apollo iOS',
  by: 'Martijn Walraven',
  category: 'Database & GraphQL',
  color: 'orange',
  tip: 'Structure your reducers so that less actions are used to trigger the same state. \n          Your actions will become more \'page-like\'. As a result your reducers\n          will need to do more "tear down" work when leaving corresponding pages. It\'s also\n          recommended to set action types as the capitalized noun name of the page.'
}, {
  youtubeId: 'm-hre1tt9C4',
  slug: 'first-thoughts-on-apollo-and-graphql',
  title: 'First Thoughts On Apollo and GraphQL',
  by: 'Sacha Greif',
  category: 'Database & GraphQL',
  color: 'orange',
  tip: 'Using a hash of slugs within one of your reducers is the recommended approach to \n          maintain a normalized set of entities to get the benefits of SEO. This is as opposed\n          to using IDs. Refrain from using normalizr or Apollo until your app justifies it.'
}];

var allVideos = reactReduxVideos.concat(dbGraphqlVideos, fpVideos);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(findVideos, 'findVideos', 'server/api.js');

  __REACT_HOT_LOADER__.register(findVideo, 'findVideo', 'server/api.js');

  __REACT_HOT_LOADER__.register(fakeDelay, 'fakeDelay', 'server/api.js');

  __REACT_HOT_LOADER__.register(fpVideos, 'fpVideos', 'server/api.js');

  __REACT_HOT_LOADER__.register(reactReduxVideos, 'reactReduxVideos', 'server/api.js');

  __REACT_HOT_LOADER__.register(dbGraphqlVideos, 'dbGraphqlVideos', 'server/api.js');

  __REACT_HOT_LOADER__.register(allVideos, 'allVideos', 'server/api.js');
}();

;
