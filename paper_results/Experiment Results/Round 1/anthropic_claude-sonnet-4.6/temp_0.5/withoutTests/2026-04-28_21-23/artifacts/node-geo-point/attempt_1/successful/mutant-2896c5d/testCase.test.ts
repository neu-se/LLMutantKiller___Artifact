import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint calculateBearing instance method', () => {
  it('should return the correct bearing between two points', () => {
    const point1 = new GeoPoint(51.5074, -0.1278); // London
    const point2 = new GeoPoint(48.8566, 2.3522);  // Paris

    const bearing = point1.calculateBearing(point2);

    expect(typeof bearing).toBe('number');
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
    // London to Paris is roughly southeast, around 148 degrees
    expect(bearing).toBeCloseTo(148, 0);
  });
});