# Testing

Goal of this document is to assemble a good list of ressources and getting
started guides to be able to test React components and our Reflux stores and 
actions.


## Getting started

Getting started testing your React components isn't unfortunately that straighforward, 
because it depends a bit on your app packaging, the JavaScript standard you are 
using (ES5, ES6, ES7) and your perferences towards a test runner.

Facebook suggests using [Jest](https://facebook.github.io/jest/), which would be 
a convenient solution if it wouldn't be so slow and [would work with Node.js 0.12.0](https://github.com/facebook/jest/issues/243).

Our main requirement was the test seutp has to work with [Webpack](http://webpack.github.io/) and is
able to parse our ES6 and JSX files.


## Libraries/Technologies

* Jest
* Mocha / Chai
* JSDOM
* Make
* Karma
* ES6
* JSX
* Reflux

## Known Issues



## Ressources
* [Article: Testing React](https://github.com/robertknight/react-testing)
* [Article: Testing React and Flux applications with Karma and Webpack](http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/)
* [Article: How to easily test React components with Karma and Webpacks](http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c)