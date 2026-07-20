import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return a finite number (not NaN) when computing distance between identical points that may cause r > 1 due to floating point', () => {
    // At latitude=90 (north pole), identical points:
    // point1Rad = point2Rad = deg2rad(90) = PI/2
    // a = deg2rad(lon2) - deg2rad(lon1) = 0
    // b = cos(PI/2) * cos(PI/2) * cos(0) ≈ 0 (but floating point: cos(PI/2) is not exactly 0)
    // c = sin(PI/2) * sin(PI/2) = 1 * 1 = 1
    // r = b + c = ~0 + 1 = slightly > 1 due to floating point cos(PI/2) != 0
    
    const point1 = new GeoPoint(90, 0);
    const point2 = new GeoPoint(90, 0);
    
    const distance = GeoPoint.calculateDistance(point1, point2);
    
    // Original: r > 1 is clamped to 1, acos(1) = 0, distance = 0 (finite)
    // Mutated: r > 1 not clamped, acos(r > 1) = NaN
    expect(isNaN(distance)).toBe(false);
    expect(distance).toBe(0);
  });
});