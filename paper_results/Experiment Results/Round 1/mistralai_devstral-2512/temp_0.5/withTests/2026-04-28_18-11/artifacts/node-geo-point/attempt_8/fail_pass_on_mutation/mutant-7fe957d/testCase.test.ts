import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly calculate distance for antipodal points', () => {
    // These points are nearly antipodal, which can cause r > 1 due to floating point precision
    const p1 = new GeoPoint(0, 0);
    const p2 = new GeoPoint(0, 179.999999);

    const distance = GeoPoint.calculateDistance(p1, p2);
    // The distance should be close to half the Earth's circumference
    expect(distance).toBeGreaterThan(20000000);
    expect(distance).toBeLessThan(20030000);
  });
});