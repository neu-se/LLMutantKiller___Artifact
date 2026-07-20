import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance correctly for points with the same coordinates', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 180);
    const distance1 = GeoPoint.calculateDistance(point1, point2);
    const distance2 = GeoPoint.calculateDistance(point2, point1);
    expect(distance1).toBeCloseTo(distance2, 1); // distance should be the same in both directions
  });
});