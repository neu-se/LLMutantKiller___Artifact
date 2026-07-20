import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateBearing', () => {
  it('should calculate the correct bearing between two points', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(1, 1);
    const bearing = point1.calculateBearing(point2);
    expect(bearing).toBeCloseTo(45, 2);
  });
});