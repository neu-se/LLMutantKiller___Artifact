import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly handle the case where r > 1 due to floating point precision', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0.0001);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(11.132, 2);
  });
});