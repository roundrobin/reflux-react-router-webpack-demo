# Testing

Goal of this document is to assemble a good list of ressources and getting
started guides to be able to test React components and our Reflux stores and 
actions.


## Getting started

Start testing your React components isn't unfortunately that straighforward, 
because it depends a bit on your app packaging, the JavaScript standard you are 
using (ES5, ES6 or ES7), if you use JSX and your perferences towards a test runner.

Facebook suggests using [Jest](https://facebook.github.io/jest/), which would be 
a convenient solution if it wouldn't be so slow and [would work with Node.js 0.12.0](https://github.com/facebook/jest/issues/243).

Our main requirement was that the test setup has to work with [Webpack](http://webpack.github.io/) and is
able to parse our ES6 and JSX files.


## How to stub a component?

[Simple stub example for react-router](https://github.com/wbkd/react-starterkit/blob/master/test-utils/stubRouterContext.jsx)

## Setup: React + Mocha

* [Example project](https://github.com/danvk/mocha-react)

## Setup: Webpack + React + Some ES6 Files

* [Example project](https://github.com/shanewilson/react-webpack-example)


## Libraries / Technologies / Terms

* Jest
* Mocha / Chai
* JSDOM
* Make
* Karma
* ES6
* JSX
* Reflux
* Code coverage
* Stub / Mock

## Known Issues
* Jest can cause problems if it runs along with Node 0.12.0


## Questions
Can I integrate Jest into my Jenkins setup?

## Ressources
* [Article: Testing React Components](https://github.com/robertknight/react-testing)
* [Article: Testing React and Flux applications with Karma and Webpack](http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/)
* [Article: How to easily test React components with Karma and Webpacks](http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c)
* [Article: Why not to use Jest?](http://substantial.com/blog/2014/11/11/test-driven-react-how-to-manually-mock-components/)