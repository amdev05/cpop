export default function PointsInput({ numPoints, onNumPoints, onGenerate }) {
  return (
    <>
      <div className="w-full flex gap-4">
        <button 
          className="h-12 px-10 bg-bg-light rounded-full text-sm shadow-md cursor-pointer"
          onClick={onGenerate}
        >
          Generate Points
        </button>

        <div className="flex-1 bg-bg-light rounded-full overflow-hidden px-6  shadow-md">
          <div className="flex justify-between mt-1 -mb-2">
            <span className="text-[10px] opacity-50">Number of Points</span>
            <span className="text-[10px] font-semibold text-primary">{numPoints}</span>
          </div>
          <input type="range" min="10" max="5000" step="10" value={numPoints} onChange={(e) => onNumPoints(e.target.value)} className="w-full rounded-full " />
          <div className="flex justify-between -mt-1">
            <span className="text-[10px] opacity-50">10</span>
            <span className="text-[10px] opacity-50">5000</span>
          </div>
        </div>
      </div>
    </>
  );
}
