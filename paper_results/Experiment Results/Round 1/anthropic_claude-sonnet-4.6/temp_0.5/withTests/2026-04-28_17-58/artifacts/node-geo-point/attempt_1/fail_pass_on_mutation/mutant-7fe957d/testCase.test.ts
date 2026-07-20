import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should calculate the correct distance between two points where r > 1 would be possible due to floating point', () => {
    // The mutation changes `r > 1 ? 1 : r` to `false ? 1 : r`
    // This means when r > 1 (due to floating point precision), the clamping won't happen
    // and acos will receive a value > 1, returning NaN instead of 0
    // For identical points, r should be exactly 1 (or very close to it due to floating point)
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.5, -0.15);

    const distance = GeoPoint.calculateDistance(p1, p2);
    
    // Distance between identical points should be 0 (or very close to 0)
    // With the mutation, r might exceed 1 due to floating point, causing acos to return NaN
    expect(distance).not.toBeNaN();
    expect(distance).toBeCloseTo(0, 5);
  });
});