import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should handle edge case where calculation produces value slightly above 1', () => {
    const point1 = new GeoPoint(89.9999, 0);
    const point2 = new GeoPoint(89.9999, 180);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(100000);
  });
});