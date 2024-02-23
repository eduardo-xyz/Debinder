# Debinder experiment

The purpose of this experiment is to demonstrate that external sorting actually works.
I tried to do this in Hacker Rank and it didn't work there.

## Why is this important?

Because when handling big inputs and outputs, you can use "out of the box" solutions, like external sorting.
Time complexity is `O(N log N)` and space complexity is linear `O(1)`. If a local variable were used instead it will be O(N).

## Content

- dataReceiver.js: Stream proccesor with external file sorting.
- consoleSimulator.js: A randomizer program to test the experiment.

## Why does it works? Why is it a good idea?

Because you can delegate sorting to other processes or tools, instead or doing it with local resources.

``` tyescript
const tempFile = path.join(tempDir, `${author}_${title}.json`);
```
This is a simple trick to use the name and title together, for easy handling.
This way you don't need to use runtime memory or complex sorting algorithms.

``` typescript
externalFiles.sort();
```

For demostration purpose.
In here, instead of sorting big data sets, I'm just sorting the paths.
You can achieve sorting with other modules, disk-based sorting, etc.

## How to use
``` zsh
npm install
node consoleSimulator.js
```

## Improvements / Changes
- In this version I'm doing all the sorting and merging of data in just two lines, using destructuring, spread, aliasing, etc.
- The cleanup can use the `close` event from stdin for an improvement in the flow.
- The structure and some details can be different because I lost the original Hacker Rank instructions.