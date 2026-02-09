//  Algoritma Brute Force untuk Closest Pair of Points

import { calculateDistance } from "../utils/distance.js";

const EMPTY_RESULT = {
  pair: null,
  distance: Infinity,
  steps: [],
  operations: 0,
  timeMs: 0,
  complexity: "O(n²)",
  comparisons: 0,
};

export function bruteForceClosestPair(points) {
  if (!isValidInput(points)) {
    return EMPTY_RESULT;
  }

  const startTime = performance.now();
  const { closestPair, minDistance, steps, operations } = findClosestPairBruteForce(points);
  const endTime = performance.now();

  return {
    pair: closestPair,
    distance: minDistance,
    steps,
    operations,
    complexity: "O(n²)",
    comparisons: operations,
    timeMs: endTime - startTime,
  };
}

function isValidInput(points) {
  return Array.isArray(points) && points.length >= 2;
}

function findClosestPairBruteForce(points) {
  const n = points.length;
  const steps = [];
  let operations = 0;
  let minDistance = Infinity;
  let closestPair = [points[0], points[1]];

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const result = comparePair(points[i], points[j], minDistance);

      operations++;
      steps.push(createComparisonStep(points[i], points[j], result));

      if (result.isNewMin) {
        minDistance = result.distance;
        closestPair = [points[i], points[j]];
      }
    }
  }

  return { closestPair, minDistance, steps, operations };
}

function comparePair(point1, point2, currentMinDistance) {
  const distance = calculateDistance(point1, point2);
  return {
    distance,
    isNewMin: distance < currentMinDistance,
  };
}

function createComparisonStep(point1, point2, comparisonResult) {
  return {
    type: "compare",
    points: [point1, point2],
    distance: comparisonResult.distance,
    isNewMin: comparisonResult.isNewMin,
  };
}
