import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly calculate distance for points that produce r > 1 due to floating point precision', () => {
    const point1 = new GeoPoint(89.9, 0);
    const point2 = new GeoPoint(89.9, 180);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(1000000);
  });
});