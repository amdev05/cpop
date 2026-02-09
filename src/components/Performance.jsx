export default function Performance({ result, method }) {
  const algorithmName = method == 0 ? "Brute Force" : "Divide & Conquer";
  const complexity = method == 0 ? "O(n²)" : "O(n log n)";

  return (
    <>
      <div className="mt-5">
        <h2>Performance - {algorithmName}</h2>
        <div className="space-y-2 mt-1">
          <div className="bg-accent rounded-[10px] px-3 py-2">
            <p className="text-sm opacity-50">Execution Time</p>
            <p className="text-2xl font-bold mt-2">
              {result ? result.timeMs.toFixed(2) : "—"} <span className="text-sm font-normal opacity-50">ms</span>
            </p>
          </div>
          <div className="bg-accent rounded-[10px] px-3 py-2">
            <p className="text-sm opacity-50">Comparisons Total</p>
            <p className="text-2xl font-bold mt-2">{result ? result.operations.toLocaleString() : "—"}</p>
          </div>
          <div className="bg-accent rounded-[10px] px-3 py-2">
            <p className="text-sm opacity-50">Closest Distance</p>
            <p className="text-2xl font-bold mt-2">{result ? result.distance.toFixed(2) : "—"}</p>
          </div>
          <div className="bg-accent rounded-[10px] px-3 py-2">
            <p className="text-sm opacity-50">Time Complexity</p>
            <p className="text-2xl font-bold mt-2">{complexity}</p>
          </div>
        </div>
      </div>
    </>
  );
}
