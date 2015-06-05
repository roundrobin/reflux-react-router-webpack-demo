# Reflux demo app

This demo app uses `Reflux` as a Flux implementation and `React` in conjunction with the `react-router` component. It's goal is to show how to use Flux in modern web apps.

![Demo of the app](https://raw.githubusercontent.com/roundrobin/reflux-react-router-webpack-demo/master/docs/DemoApp.gif)


## Install dependencies



```bash
$ npm install -g webpack            # Install the two following global node modules for ease.
$ npm install -g webpack-dev-server
$ npm install -d                    # Next install the local dependencies
$ npm run local                     # And finally build the app assets (bundle.js and main.css) 
```
To run a simple http server (runs on port `8124` and be configured in webpack.config.js) 
run: 

```bash
$ npm run dev
```

Then go to `http://localhost:8124` in your browser

## App

This demo app shows how stores and actions in Flux work in conjunction with the react-router component. For the
purpose of the demo, we implement a chat room store,  which holds the data of all rooms and a list of
all active rooms. Based on that data we implement a couple of views visualizing lists and chat rooms.

##Features of the demo
* Flux implementation via Flux
* Master/Detail view via React-Router
* CSS animations via React's CSSTransitionGroup.
* Canonical URLs via React-Router
* Application logging via Bragi
* Data structures with Immutable.js

## Advantages Reflux
* Small code base (~13kb)
* For devs with Backbone.js background easy to pick up
* Has hooks into the event lifecyle (preEmit, shouldEmit)
	

## Not included
* Isomorphic setup (no server side rendering)

## TODOs

* Show how to use Ajax requests in Flux
* Show how to use WebSockets in Flux
* Show how to use Localstorage in Flux

## Resources

* [Reflux Documentation](https://github.com/spoike/refluxjs)
* [Article: Reflux](http://henleyedition.com/building-an-app-using-react-and-refluxjs/)

## Feedback

If you have any questions or if there is something you would like to see in the demo 
app, just open an issue and I will try to get to it asap.
