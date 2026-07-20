import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly handle the edge case where r > 1 due to floating point precision', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 180);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(20015086.797, -2);
  });
});