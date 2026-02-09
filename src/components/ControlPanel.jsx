const SPEED = [0.25, 0.5, 0.75, 1];

export default function ControlPanel({ method, onMethod, isPlay, onIsPlay, speedX, onSpeedX, onReset, currentStep = 0, totalSteps = 0, hasAnimation = false }) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <>
      <div className="mt-5">
        <h2 className="">Method</h2>
        <div className="flex flex-col mt-1">
          <label htmlFor="bruteforce" className="px-3 py-2 rounded-[10px] text-sm cursor-pointer has-checked:bg-accent">
            Brute Force
            <input type="radio" name="method-option" id="bruteforce" value={0} className="appearance-none" checked={method == 0} onChange={(e) => onMethod(Number(e.target.value))} />
          </label>
          <label htmlFor="divideandqonquer" className="px-3 py-2 rounded-[10px] text-sm cursor-pointer has-checked:bg-accent">
            Divide and Qonquer
            <input type="radio" name="method-option" id="divideandqonquer" value={1} className="appearance-none" checked={method == 1} onChange={(e) => onMethod(Number(e.target.value))} />
          </label>
        </div>
      </div>

      <div className="mt-5">
        <h2>Animation</h2>
        <div className="grid grid-cols-4 gap-2 mt-1">
          <button
            className={`col-span-2 text-sm rounded-[10px] px-3 py-2 ${hasAnimation ? "bg-accent cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
            onClick={() => hasAnimation && onIsPlay((play) => !play)}
            disabled={!hasAnimation}
          >
            {isPlay ? "Pause" : "Play"}
          </button>
          <button className={`col-span-2 text-sm rounded-[10px] px-3 py-2 ${hasAnimation ? "bg-accent cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`} onClick={onReset} disabled={!hasAnimation}>
            Reset
          </button>
          <div className="col-span-4 grid grid-cols-subgrid">
            {SPEED.map((sp) => (
              <label htmlFor={`speed-${sp}`} key={sp} className="text-sm has-checked:bg-accent rounded-[10px] px-3 py-2 text-center cursor-pointer">
                {sp}x
                <input
                  type="radio"
                  name="animation-speed"
                  id={`speed-${sp}`}
                  value={sp}
                  className="appearance-none"
                  checked={Number(speedX) === sp}
                  onChange={(e) => onSpeedX(Number(e.target.value))}
                />
              </label>
            ))}
          </div>
          <div className="col-span-4">
            <div className="flex justify-between">
              <p className="text-xs">
                Progress{" "}
                <span>
                  {currentStep}/{totalSteps}
                </span>
              </p>
              <p className="text-xs">{Math.round(progress)}%</p>
            </div>
            <div className="h-1 w-full mt-1 bg-accent rounded-full">
              <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
