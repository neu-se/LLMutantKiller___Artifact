import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateBearing', () => {
  it('should return a valid bearing value when called on instance', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(1, 1);
    const bearing = point1.calculateBearing(point2);
    expect(typeof bearing).toBe('number');
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
  });
});