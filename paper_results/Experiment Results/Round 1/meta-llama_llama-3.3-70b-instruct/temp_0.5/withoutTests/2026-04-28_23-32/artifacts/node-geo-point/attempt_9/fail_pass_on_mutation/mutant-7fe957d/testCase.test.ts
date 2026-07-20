import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance correctly for points with the same coordinates', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 180);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(19900000); // distance should be greater than 19900000 meters
    expect(distance).toBeLessThan(20100000); // distance should be less than 20100000 meters
  });
});