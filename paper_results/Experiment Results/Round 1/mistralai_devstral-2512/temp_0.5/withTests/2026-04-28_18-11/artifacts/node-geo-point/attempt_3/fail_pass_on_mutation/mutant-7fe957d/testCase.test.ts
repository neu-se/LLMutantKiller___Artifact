import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly calculate distance between two distinct points', () => {
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.6, -0.16);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBeGreaterThan(10000);
    expect(distance).toBeLessThan(12000);
  });
});