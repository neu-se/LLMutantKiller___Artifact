import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly calculate distance between two points with r > 1', () => {
    // These points are chosen to create a scenario where r > 1 due to floating point precision
    const p1 = new GeoPoint(89.9999999, 0);
    const p2 = new GeoPoint(89.9999999, 0.0000001);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(1000);
  });
});