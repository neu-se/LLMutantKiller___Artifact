import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return the correct distance between two points', () => {
    const point1 = new GeoPoint(51.5, -0.15);
    const point2 = new GeoPoint(51.6, -0.16);
    const distance = point1.calculateDistance(point2);
    expect(Math.round(distance)).toBe(11142);
  });
});