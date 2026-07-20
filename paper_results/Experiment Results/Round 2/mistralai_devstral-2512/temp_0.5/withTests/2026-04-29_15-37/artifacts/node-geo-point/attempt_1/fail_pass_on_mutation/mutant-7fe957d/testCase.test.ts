import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly calculate distance between two points with identical coordinates', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBe(0);
  });
});