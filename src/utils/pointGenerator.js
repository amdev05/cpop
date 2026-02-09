// Pembuatan titik acak

export function generateRandomPoints(count, maxX, maxY) {
  const points = [];

  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      id: i,
    });
  }

  return points;
}

export function generatePresetScenario(scenario, count) {
  switch (scenario) {
    case "line":
      return Array.from({ length: count }, (_, i) => ({
        x: i * 10,
        y: 100,
        id: i,
      }));

    case "grid":
      const gridSize = Math.ceil(Math.sqrt(count));
      return Array.from({ length: count }, (_, i) => ({
        x: (i % gridSize) * 50,
        y: Math.floor(i / gridSize) * 50,
        id: i,
      }));

    case "cluster":
      return [
        ...Array.from({ length: Math.floor(count / 2) }, (_, i) => ({
          x: Math.random() * 200,
          y: Math.random() * 200,
          id: i,
        })),

        ...Array.from({ length: Math.ceil(count / 2) }, (_, i) => ({
          x: 600 + Math.random() * 200,
          y: 400 + Math.random() * 200,
          id: Math.floor(count / 2) + i,
        })),
      ];

    case "random":
    default:
      return generateRandomPoints(count, 1000, 700);
  }
}
