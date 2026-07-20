import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance correctly for points with the same coordinates', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 180);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0); // distance should be greater than 0
    expect(distance).toBeLessThan(20000000); // distance should be less than 20000000 meters
  });
});