import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly handle edge case where r > 1 in distance calculation', () => {
    // Create two points that are very close to each other near the north pole
    // This can cause floating point precision issues where r > 1
    const p1 = new GeoPoint(89.999999, 0);
    const p2 = new GeoPoint(89.999999, 0.000001);

    const distance = GeoPoint.calculateDistance(p1, p2);
    // The distance should be a small positive number, not NaN or 0
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(10);
    expect(Number.isNaN(distance)).toBe(false);
  });
});