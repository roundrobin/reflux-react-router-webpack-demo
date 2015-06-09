# Flux Insights

This documents acts as a collections for Flux architecture insights.

## Findings: Where to put async operations?

[This article](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/) gives an good explaination on why async operations should not leak into store:

> Asynchronously executed callbacks should not leak into Stores. The consequences of it are just to hard to fully foresee. This leads to elusive bugs. Stores should only execute synchronous code. Otherwise they are too hard to understand.


Another good point I found [here](http://stackoverflow.com/questions/26632415/where-should-ajax-request-be-made-in-flux-app/26633455#26633455): 
> Performing requests in stores mean that if 2 stores need the same data for a given action, they will issue 2 similar requets (unless you introduce dependencies between stores, which I really don't like)


## Findings: What is waitFor really for?

[This Reflux article](http://spoike.ghost.io/deconstructing-reactjss-flux/) by it's author explains how `waitFor` works in Reflux.

> The other thing that was puzzling me with the code of the TodoList example was that they included a waitFor functionality that is also admittedly broken. The situation is that a data store needs to wait for other datastores to complete their data handling after a particular action has been executed. This seems to go away from the single direction data-flow principle.

> Wouldn't it be easier if the Data Stores were listenable as well? Well, the way they're implemented in Reflux, you can aggregate the DataStores by listening to another data store's change event.



## Conclusions

* Avoid dependencies betweens stores if possible!
* You should only emit change once the data in the store has actually changed