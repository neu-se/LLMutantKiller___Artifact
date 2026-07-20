import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly handle floating point precision when calculating distance between very close points', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0.0001, 0.0001);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(20);
  });
});