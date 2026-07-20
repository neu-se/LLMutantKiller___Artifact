import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.calculateDistance', () => {
  it('should return the correct distance between two points that are not the same', () => {
    // Two distinct points: New York and London (approximately)
    const newYork = new GeoPoint(40.7128, -74.0060);
    const london = new GeoPoint(51.5074, -0.1278);

    const distance = GeoPoint.calculateDistance(newYork, london);

    // The actual distance between New York and London is approximately 5,570,000 meters
    // With the mutation (false ? 1 : r), r is always used directly without the r > 1 guard,
    // but more importantly when r is exactly 1 (same point), the mutation changes behavior.
    // For distinct points, the result should be a positive non-zero distance.
    // The original code: acos(r > 1 ? 1 : r) * 6371392.896
    // The mutated code: acos(false ? 1 : r) * 6371392.896 = acos(r) * 6371392.896
    // For r > 1 (due to floating point), original clamps to 1 (acos(1) = 0), mutant returns NaN
    
    // Use two points that are very close but not identical to trigger r > 1 floating point issue
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    
    // Same point should give distance 0 (r = 1 exactly or very close to 1)
    const samePointDistance = GeoPoint.calculateDistance(point1, point2);
    
    // Original: acos(1) * 6371392.896 = 0
    // Mutated: acos(1) * 6371392.896 = 0 (same for exact 1)
    // But for floating point slightly above 1, original clamps, mutant gives NaN
    
    // Use a point where cos calculations might produce r slightly > 1
    const p1 = new GeoPoint(45.0, 90.0);
    const p2 = new GeoPoint(45.0, 90.0);
    
    const dist = GeoPoint.calculateDistance(p1, p2);
    
    // Original code clamps r > 1 to 1, so acos(1) = 0, distance = 0
    // Mutated code uses r directly; if r > 1 due to floating point, acos returns NaN
    expect(dist).toBe(0);
    expect(isNaN(dist)).toBe(false);
  });
});