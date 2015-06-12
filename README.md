# Reflux demo app

[![Build Status](https://travis-ci.org/roundrobin/reflux-react-router-webpack-demo.svg?branch=master)](https://travis-ci.org/roundrobin/reflux-react-router-webpack-demo)


![Package status](https://david-dm.org/roundrobin/reflux-react-router-webpack-demo.svg)


This demo app uses [`Reflux`](https://github.com/spoike/refluxjs) as a Flux implementation and `React` in conjunction with the `react-router` component. It's goal is to show how to use Flux in modern web apps.

![Demo of the app](/docs/DemoApp.gif?raw=true)


## Install dependencies

```bash
$ npm install -d # Install the local dependencies
$ npm run local  # And finally build the app assets (bundle.js and main.css) 
```
To run a simple http server (runs on port `8124` and be configured in [`webpack.config.js`](/webpack.config.js)) 
run: 

```bash
$ npm run dev
```

**Side note: The demo was tested with Node.js 0.12 Mac OSX / React 0.13.3**

Then go to `http://localhost:8124` in your browser

## Demo: Single page application (SPA)

This demo SPA shows how stores and actions in Flux work in conjunction with the react-router component. For the
purpose of the demo, we implement a chat room store,  which holds the data of all rooms and a list of
all active rooms. Based on that data we implement a couple of views visualizing lists and chat rooms.

## Features of the demo
* Flux implementation via `Reflux`
* Master/Detail view via `react-Router`
* CSS animations via React's `CSSTransitionGroup`.
* Canonical URLs via `react-Router`
* Application logging via `Bragi`
* Usage of E7 features via `Bable`
* Data structures with `Immutable.js`
* Uses BEM as CSS naming conventation
* App asset generation via `Webpack` and `NPM`!

## Advantages Reflux
* Small code base (~13kb)
* For devs coming from Backbone.js it's easy to pick up
* Has hooks into the event lifecyle (`preEmit`, `shouldEmit`)
* Stores can listens to stores (not sure yet if an advantage)

## Tests

The demo app contains a little test suite written with Facebook's test library [`Jest`](https://facebook.github.io/jest/).
You can run the tests like this: `$ npm test`.

That should print out something like this:

![Testing output](/docs/Testing.png?raw=true)

**Note:** *Tests run only with Io.js, which should be soon obsolete, after Node.js and Io.js merge.*

Unfortunately `Jest` has one dependency (`JSDOM`) which doesn't work on Node.js 0.12.
If you running this `Node.js` version you have to install [`Io.js`](https://iojs.org/en/index.html), which is super quickly done.
Another good way doing it is using [NVM](https://github.com/creationix/nvm), which is a tool to manage multiple
`Node.js` versions on a machine. This way you can simply switch back and forth between `Node.js` and `Io.js`

## Not included
* Isomorphic setup (no server side rendering)

## Resources
* [Reflux Documentation](https://github.com/spoike/refluxjs)
* [Article: Building an app using React and](http://henleyedition.com/building-an-app-using-react-and-refluxjs/)
* [Article: Introdction to contexts](https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html)
* [Async request with Flux](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/)
* [An example on how to model stores](https://discuss.reactjs.org/t/computed-properties-in-flux/443/2)

## Feedback

If you have any questions or if there is something you would like to see in the demo 
app, just open an issue and I will try to get to it asap.
