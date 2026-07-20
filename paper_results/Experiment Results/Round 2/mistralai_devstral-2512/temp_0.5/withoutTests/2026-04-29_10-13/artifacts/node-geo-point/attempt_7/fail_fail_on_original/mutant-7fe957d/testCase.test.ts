import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should handle floating point precision edge case where r is very close to 1', () => {
    const point1 = new GeoPoint(89.999999, 0);
    const point2 = new GeoPoint(89.999999, 0.000001);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(10);
  });
});