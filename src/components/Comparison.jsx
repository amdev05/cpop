export default function Comparison({ bruteForceResult = null, divideConquerResult = null, points = [] }) {
  if (!bruteForceResult && !divideConquerResult) {
    return (
      <div className="bg-bg-light border-2 border-yellow-800 rounded-3xl p-6 w-96 shadow-lg">
        <div className="flex items-start gap-3">
          <p className="font-semibold text-sm text-yellow-800">Run both algorithms to see the comparison.</p>
        </div>
      </div>
    );
  }

  if (!bruteForceResult) {
    return (
      <div className="bg-bg-light border-2 border-red-800 rounded-3xl p-6 w-96 shadow-lg">
        <div className="flex items-start gap-3">
          <p className="font-semibold text-sm text-red-800">Run Brute Force algorithm to see the comparison.</p>
        </div>
      </div>
    );
  }

  if (!divideConquerResult) {
    return (
      <div className="bg-bg-light border-2 border-red-800 rounded-3xl p-6 w-96 shadow-lg">
        <div className="flex items-start gap-3">
          <p className="font-semibold text-sm text-red-800">Run Divide & Qonquer algorithm to see the comparison.</p>
        </div>
      </div>
    );
  }

  const timeSpeedup = (bruteForceResult.timeMs / divideConquerResult.timeMs).toFixed(2);
  const compReduction = (((bruteForceResult.operations - divideConquerResult.operations) / bruteForceResult.operations) * 100).toFixed(1);
  const distanceMatch = Math.abs(bruteForceResult.distance - divideConquerResult.distance) < 0.01;

  return (
    <div className="bg-bg-light border border-accent/25 rounded-3xl p-6 w-max">
      <p className="font-semibold text-xs">
        Performance Comparison <span className="font-normal">({points.length} points)</span>
      </p>

      <div className="grid grid-cols-4 gap-x-4 text-sm mt-4">
        <div className="col-span-4 grid grid-cols-subgrid font-medium bg-accent pl-3 pr-10 py-2 rounded-[10px]">
          <p>Metric</p>
          <p>Brute Force</p>
          <p>Divide & Conquer</p>
          <p>Improvement</p>
        </div>
        <div className="col-span-4 grid grid-cols-subgrid font-light pl-3 pr-10 py-2 rounded-[10px]">
          <p>Execution Time</p>
          <p>{bruteForceResult.timeMs.toFixed(2)} ms</p>
          <p>{divideConquerResult.timeMs.toFixed(2)} ms</p>
          <p className={` font-medium ${timeSpeedup >= 0 ? "text-green-600" : "text-red-600"}`}>{timeSpeedup}x faster</p>
        </div>
        <div className="col-span-4 grid grid-cols-subgrid font-light bg-accent pl-3 pr-10 py-2 rounded-[10px]">
          <p>Comparisons</p>
          <p>{bruteForceResult.operations.toLocaleString()}</p>
          <p>{divideConquerResult.operations.toLocaleString()}</p>
          <p className={` font-medium ${compReduction >= 0 ? "text-green-600" : "text-red-600"}`}>{compReduction}% fewer</p>
        </div>
        <div className="col-span-4 grid grid-cols-subgrid font-light  pl-3 pr-10 py-2 rounded-[10px]">
          <p>Closest Distance</p>
          <p>{bruteForceResult.distance.toFixed(2)}</p>
          <p>{divideConquerResult.distance.toFixed(2)}</p>
          <p className={distanceMatch ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{distanceMatch ? "Match" : "Mismatch"}</p>
        </div>
        <div className="col-span-4 grid grid-cols-subgrid font-light bg-accent pl-3 pr-10 py-2 rounded-[10px]">
          <p>Time Complexity</p>
          <p>O(n²)</p>
          <p>O(n log n)</p>
          <p className="text-blue-600 font-medium"></p>
        </div>
      </div>
    </div>
  );
}
