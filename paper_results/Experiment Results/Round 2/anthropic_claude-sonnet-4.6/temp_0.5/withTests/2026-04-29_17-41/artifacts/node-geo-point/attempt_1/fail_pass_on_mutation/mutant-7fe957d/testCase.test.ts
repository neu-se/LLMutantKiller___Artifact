import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should calculate the correct distance between two points where r > 1 would occur without clamping', () => {
    // When two identical points are compared, r should be exactly 1 (or very close to it due to floating point)
    // The mutation changes `r > 1 ? 1 : r` to `false ? 1 : r`, meaning if r > 1 due to floating point,
    // acos would receive a value > 1 and return NaN instead of 0
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.5, -0.15);

    // Same point should have distance 0
    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBe(0);
  });
});