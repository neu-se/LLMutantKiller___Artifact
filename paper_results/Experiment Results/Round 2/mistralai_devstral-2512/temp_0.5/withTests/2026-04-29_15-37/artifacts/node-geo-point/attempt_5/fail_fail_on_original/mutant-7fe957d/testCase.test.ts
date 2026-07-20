import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly calculate distance when r > 1', () => {
    const point1 = new GeoPoint(89.9999, 0);
    const point2 = new GeoPoint(89.9999, 0.0001);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(0, 10);
  });
});