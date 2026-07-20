import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance between two points correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance1 = GeoPoint.calculateDistance(point1, point2);
    const point3 = new GeoPoint(0, 180);
    const distance2 = GeoPoint.calculateDistance(point1, point3);
    expect(distance1).toBeLessThan(distance2);
  });
});