import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";
import Performance from "./components/Performance";
import PointsInput from "./components/PointsInput";
import Comparison from "./components/Comparison";
import { generateRandomPoints } from "./utils/pointGenerator";
import { bruteForceClosestPair } from "./algorithms/bruteForce";
import { divideAndConquerClosestPair } from "./algorithms/divideAndConquer";

function App() {
  const [numPoints, setNumPoints] = useState(100);
  const [method, setMethod] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [speedX, setSpeedX] = useState(0.25);
  const [showComp, setShowComp] = useState(false);

  const [points, setPoints] = useState([]);
  const [bruteForceResult, setBruteForceResult] = useState(null);
  const [divideConquerResult, setDivideConquerResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [animationResult, setAnimationResult] = useState(null);

  const handleGeneratePoints = () => {
    const newPoints = generateRandomPoints(Number(numPoints), 1000, 700);
    setPoints(newPoints);
    setBruteForceResult(null);
    setDivideConquerResult(null);
    setIsPlay(false);
    setAnimationSteps([]);
    setCurrentStepIndex(0);
    setAnimationResult(null);
    setShowComp(false);
  };

  const handleSearchPairs = () => {
    if (points.length === 0) return;

    setIsSearching(true);

    setTimeout(() => {
      if (method == 0) {
        const bfResult = bruteForceClosestPair(points);
        setBruteForceResult(bfResult);
        setAnimationSteps(bfResult.steps || []);
      } else {
        const dcResult = divideAndConquerClosestPair(points);
        setDivideConquerResult(dcResult);
        setAnimationSteps(dcResult.steps || []);
      }

      setCurrentStepIndex(0);
      setAnimationResult(null);
      setIsPlay(false);

      setIsSearching(false);
    }, 50);
  };

  const handleResetAnimation = () => {
    setCurrentStepIndex(0);
    setAnimationResult(null);
    setIsPlay(false);
  };

  useEffect(() => {
    const currentAlgorithmResult = method == 0 ? bruteForceResult : divideConquerResult;

    if (currentAlgorithmResult) {
      setAnimationSteps(currentAlgorithmResult.steps || []);
      setCurrentStepIndex(0);
      setAnimationResult(null);
      setIsPlay(false);
    } else {
      setAnimationSteps([]);
      setCurrentStepIndex(0);
      setAnimationResult(null);
      setIsPlay(false);
    }
  }, [method, bruteForceResult, divideConquerResult]);

  useEffect(() => {
    if (!isPlay || animationSteps.length === 0) return;

    if (currentStepIndex >= animationSteps.length) {
      setIsPlay(false);

      const finalResult = method == 0 ? bruteForceResult : divideConquerResult;
      if (finalResult) {
        setAnimationResult(finalResult);
      }
      return;
    }

    const targetDuration = 8000;
    const totalSteps = animationSteps.length;
    const baseDelay = totalSteps > 0 ? targetDuration / totalSteps : 50;

    const speedMultiplier = Number(speedX) || 1;
    const delay = Math.max(1, baseDelay / speedMultiplier);

    console.log("Animation:", {
      currentStepIndex,
      totalSteps,
      speedX,
      speedMultiplier,
      baseDelay: baseDelay.toFixed(2),
      delay: delay.toFixed(2),
    });

    const timer = setTimeout(() => {
      const step = animationSteps[currentStepIndex];

      if (step.type === "compare" || step.type === "strip_compare" || step.type === "base_case_compare") {
        if (step.isNewMin) {
          setAnimationResult({
            pair: step.points,
            distance: step.distance,
          });
        }
      }

      setCurrentStepIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlay, currentStepIndex, animationSteps, speedX, method, bruteForceResult, divideConquerResult]);

  const currentResult = method == 0 ? bruteForceResult : divideConquerResult;

  const displayResult = (isPlay || (currentStepIndex > 0 && currentStepIndex < animationSteps.length)) && animationResult ? animationResult : currentResult;

  return (
    <>
      <div className="flex">
        <aside className="fixed left-4 top-4 bottom-4 z-50 bg-bg-light rounded-3xl overflow-y-hidden">
          <div className="w-80 h-full  p-4 shadow-md overflow-y-auto">
            <h1>Closest Pair of Points</h1>

            <ControlPanel
              key={`${method}-${animationSteps.length}`}
              method={method}
              onMethod={setMethod}
              isPlay={isPlay}
              onIsPlay={setIsPlay}
              speedX={speedX}
              onSpeedX={setSpeedX}
              result={currentResult}
              onReset={handleResetAnimation}
              currentStep={currentStepIndex}
              totalSteps={animationSteps.length}
              hasAnimation={animationSteps.length > 0}
            />

            <Performance result={currentResult} method={method} />

            <button className="mt-5 px-3 py-2 rounded-[10px] text-sm w-full bg-accent cursor-pointer" onClick={() => setShowComp((show) => !show)}>
              Show Comparison
            </button>
          </div>
        </aside>

        {showComp && (
          <section className="fixed left-88 bottom-4">
            <Comparison bruteForceResult={bruteForceResult} divideConquerResult={divideConquerResult} points={points} />
          </section>
        )}

        <main className="ml-84 p-4 w-full h-dvh flex flex-col gap-4">
          <div className="flex gap-4">
            <button
              className={`h-12 px-10 rounded-full text-tx-light text-sm shadow-md text-nowrap ${points.length === 0 || isSearching ? "bg-gray-400 cursor-not-allowed" : "bg-primary cursor-pointer"}`}
              onClick={handleSearchPairs}
              disabled={points.length === 0 || isSearching}
            >
              {isSearching ? "Searching..." : "Search Pairs"}
            </button>

            <PointsInput numPoints={numPoints} onNumPoints={setNumPoints} onGenerate={handleGeneratePoints} />
          </div>

          <Canvas points={points} result={displayResult} currentStep={animationSteps[currentStepIndex]} isAnimating={isPlay || currentStepIndex > 0} />
        </main>
      </div>
    </>
  );
}

export default App;
