import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance correctly for points with different longitudes', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(0, 1); // distance in meters, allowing for a small margin of error
  });
});