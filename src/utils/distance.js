// Perhitungan jarak titik

export function calculateDistance(point1, point2) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function minDistance(dist1, dist2) {
  return dist1 < dist2 ? dist1 : dist2;
}
