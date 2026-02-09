//  Algoritma Divide and Conquer untuk Closest Pair of Points

import { calculateDistance } from "../utils/distance.js";

const EMPTY_RESULT = {
  pair: null,
  distance: Infinity,
  steps: [],
  operations: 0,
  timeMs: 0,
  complexity: "O(n log n)",
  comparisons: 0,
};

const BRUTE_FORCE_THRESHOLD = 3;
const MAX_STRIP_CHECK = 7;

export function divideAndConquerClosestPair(points) {
  if (!isValidInput(points)) {
    return EMPTY_RESULT;
  }

  const startTime = performance.now();
  const steps = [];

  const sortedByX = sortPoints(points, "x");
  const sortedByY = sortPoints(points, "y");

  steps.push(createSortStep());

  const result = findClosestPairRecursive(sortedByX, sortedByY, steps);
  const endTime = performance.now();

  return {
    ...result,
    steps,
    complexity: "O(n log n)",
    comparisons: result.operations,
    timeMs: endTime - startTime,
  };
}

function isValidInput(points) {
  return Array.isArray(points) && points.length >= 2;
}

function sortPoints(points, axis) {
  return [...points].sort((a, b) => a[axis] - b[axis]);
}

function createSortStep() {
  return {
    type: "sort",
    message: "Mengurutkan titik berdasarkan koordinat x",
  };
}

function findClosestPairRecursive(pointsByX, pointsByY, steps) {
  const n = pointsByX.length;

  if (n <= BRUTE_FORCE_THRESHOLD) {
    return bruteForceSmall(pointsByX, steps);
  }

  const { leftX, rightX, leftY, rightY, midPoint } = dividePoints(pointsByX, pointsByY);

  steps.push(createDivideStep(midPoint, leftX.length, rightX.length));

  const leftResult = findClosestPairRecursive(leftX, leftY, steps);
  const rightResult = findClosestPairRecursive(rightX, rightY, steps);

  const { closestPair, minDistance } = selectBestResult(leftResult, rightResult);

  const stripResult = checkStripForCloserPairs(pointsByY, midPoint.x, minDistance, steps);

  const finalResult = selectBestResult({ pair: closestPair, distance: minDistance, operations: 0 }, stripResult);

  const totalOperations = leftResult.operations + rightResult.operations + stripResult.operations;

  return {
    pair: finalResult.closestPair,
    distance: finalResult.minDistance,
    operations: totalOperations,
  };
}

function dividePoints(pointsByX, pointsByY) {
  const mid = Math.floor(pointsByX.length / 2);
  const midPoint = pointsByX[mid];

  const leftX = pointsByX.slice(0, mid);
  const rightX = pointsByX.slice(mid);

  const leftY = pointsByY.filter((p) => p.x <= midPoint.x);
  const rightY = pointsByY.filter((p) => p.x > midPoint.x);

  return { leftX, rightX, leftY, rightY, midPoint };
}

function createDivideStep(midPoint, leftSize, rightSize) {
  return {
    type: "divide",
    midPoint,
    leftSize,
    rightSize,
  };
}

function selectBestResult(result1, result2) {
  if (result2.distance < result1.distance) {
    return {
      closestPair: result2.pair,
      minDistance: result2.distance,
    };
  }
  return {
    closestPair: result1.pair,
    minDistance: result1.distance,
  };
}

function bruteForceSmall(points, steps) {
  const n = points.length;
  let minDistance = Infinity;
  let closestPair = null;
  let operations = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      operations++;
      const distance = calculateDistance(points[i], points[j]);

      steps.push({
        type: "base_case_compare",
        points: [points[i], points[j]],
        distance,
      });

      if (distance < minDistance) {
        minDistance = distance;
        closestPair = [points[i], points[j]];
      }
    }
  }

  return { pair: closestPair, distance: minDistance, operations };
}

function checkStripForCloserPairs(pointsByY, midX, delta, steps) {
  const strip = buildStrip(pointsByY, midX, delta);

  steps.push(createStripStep(strip.length));

  let minDistance = delta;
  let closestPair = null;
  let operations = 0;

  for (let i = 0; i < strip.length; i++) {
    const checkResult = checkPointAgainstNeighbors(strip, i, minDistance, steps);

    operations += checkResult.operations;

    if (checkResult.distance < minDistance) {
      minDistance = checkResult.distance;
      closestPair = checkResult.pair;
    }
  }

  return { pair: closestPair, distance: minDistance, operations };
}

function buildStrip(pointsByY, midX, delta) {
  return pointsByY.filter((p) => Math.abs(p.x - midX) < delta);
}

function createStripStep(stripSize) {
  return {
    type: "strip",
    stripSize,
    message: `Memeriksa strip dengan ${stripSize} titik`,
  };
}

function checkPointAgainstNeighbors(strip, index, currentMinDistance, steps) {
  let minDistance = currentMinDistance;
  let closestPair = null;
  let operations = 0;

  const maxCheck = Math.min(strip.length, index + MAX_STRIP_CHECK + 1);

  for (let j = index + 1; j < maxCheck; j++) {
    const point1 = strip[index];
    const point2 = strip[j];

    if (shouldStopChecking(point1, point2, minDistance)) {
      break;
    }

    operations++;
    const distance = calculateDistance(point1, point2);
    const isNewMin = distance < minDistance;

    steps.push({
      type: "strip_compare",
      points: [point1, point2],
      distance,
      isNewMin,
    });

    if (isNewMin) {
      minDistance = distance;
      closestPair = [point1, point2];
    }
  }

  return { pair: closestPair, distance: minDistance, operations };
}

function shouldStopChecking(point1, point2, minDistance) {
  return point2.y - point1.y >= minDistance;
}
