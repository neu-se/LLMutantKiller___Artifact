import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return a valid distance between two points', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(1, 1);
    const distance = point1.calculateDistance(point2);
    expect(typeof distance).toBe('number');
    expect(distance).toBeGreaterThan(0);
  });
});