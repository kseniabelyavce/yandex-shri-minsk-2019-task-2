'use strict';

const solution = function (graph, start, finish) {

  // costs table
  const costs = {};

  // parents table
  const parents = {};

  // filling tables
  Object.keys(graph).forEach(function (key) {
    if (key !== start && !parents[key]) {
      costs[key] = Infinity;
      parents[key] = null;
    } else {
      Object.keys(graph[start]).forEach(function (n) {
        costs[n] = graph[start][n];
        parents[n] = start;
      });
    }
  });

  let processed = [];

  const findLowestCostNode = (itCosts) => {
    let lowestCost = Infinity;
    let lowestCostNode = null;

    Object.keys(itCosts).forEach((node) => {
      const cost = itCosts[node];
      // If it's the lowest cost so far and hasn't been processed yet...
      if (cost < lowestCost && (processed.indexOf(node) === -1)) {
        // ... set it as the new lowest-cost node.
        lowestCost = cost;
        lowestCostNode = node;
      }
    });
    return lowestCostNode;
  };

  let node = findLowestCostNode(costs);

  while (node !== null) {
    const cost = costs[node];
    // Go through all the neighbors of this node
    const neighbors = graph[node];
    Object.keys(neighbors).forEach((n) => {
      const newCost = cost + neighbors[n];
      // If it's cheaper to get to this neighbor by going through this node
      if (costs[n] > newCost) {
        // ... update the cost for this node
        costs[n] = newCost;
        // This node becomes the new parent for this neighbor.
        parents[n] = node;
      }
    });

    // Mark the node as processed
    processed = processed.concat(node);

    // Find the next node to process, and loop
    node = findLowestCostNode(costs);
  }

  return {
    distance: costs[finish],
    path: (function buildPath(parents) {
      const path = [];
      let node = finish;
      path.push(node);

      for (let i = 0; i < Object.keys(parents).length; i++) {
        node = parents[node];
        if (!node) {
          return path;
        }
        path.push(node);
      }
    })(parents).reverse()
  };
}