import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly handle the r > 1 edge case in distance calculation', () => {
    // Create points that will cause r > 1 due to floating point precision
    // This specifically tests the "r > 1 ? 1 : r" condition in the original code
    const p1 = new GeoPoint(89.999999, 0);
    const p2 = new GeoPoint(89.999999, 0.000001);

    const distance = GeoPoint.calculateDistance(p1, p2);
    // The distance should be a valid number (not NaN)
    expect(Number.isNaN(distance)).toBe(false);
    // The distance should be finite
    expect(Number.isFinite(distance)).toBe(true);
    // The distance should be very small (less than 1 meter)
    expect(distance).toBeLessThan(1);
    // The distance should be greater than 0
    expect(distance).toBeGreaterThan(0);
  });
});