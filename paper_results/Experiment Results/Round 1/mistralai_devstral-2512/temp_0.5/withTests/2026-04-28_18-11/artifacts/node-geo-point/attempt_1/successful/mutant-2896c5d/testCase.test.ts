import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateBearing', () => {
  it('should return the correct bearing between two points', () => {
    const point1 = new GeoPoint(51.5, -0.15);
    const point2 = new GeoPoint(51.5, 1.15);
    const bearing = point1.calculateBearing(point2);
    expect(Math.round(bearing)).toBe(89);
  });
});