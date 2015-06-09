# Flux

This documents acts as a collections for Flux architecture insights.

## Findings

In [this article](http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/) I found a good explaination on why async operations should not leak into the store:

> Asynchronously executed callbacks should not leak into Stores. The consequences of it are just to hard to fully foresee. This leads to elusive bugs. Stores should only execute synchronous code. Otherwise they are too hard to understand.