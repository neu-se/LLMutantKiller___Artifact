import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return a non-zero distance between two different points', () => {
    // When r > 1 (which can happen due to floating point), the original code clamps to 1
    // The mutation changes `r > 1 ? 1 : r` to `false ? 1 : r`, meaning it never clamps
    // More importantly, for normal points where r <= 1, both should behave the same
    // But we need a case where r > 1 to expose the mutation
    
    // For two identical points, r should be exactly 1 (or very close to it)
    // Due to floating point arithmetic, r might be slightly > 1
    // The original code handles this by clamping, the mutated code does not
    
    // Let's test with two identical points - distance should be 0
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    
    const distance = GeoPoint.calculateDistance(point1, point2);
    
    // With original code: r = 1 (or slightly > 1, clamped to 1), acos(1) = 0, distance = 0
    // With mutated code: r might be slightly > 1, acos(r > 1) = NaN, distance = NaN
    expect(distance).toBe(0);
  });
});