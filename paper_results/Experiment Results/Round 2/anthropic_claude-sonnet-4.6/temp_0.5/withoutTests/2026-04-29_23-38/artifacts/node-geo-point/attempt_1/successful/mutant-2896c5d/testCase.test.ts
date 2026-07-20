import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint calculateBearing instance method', () => {
  it('should return the correct bearing between two points', () => {
    const point1 = new GeoPoint(52.205, 0.119);
    const point2 = new GeoPoint(48.857, 2.351);
    
    const bearing = point1.calculateBearing(point2);
    
    expect(typeof bearing).toBe('number');
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
    expect(bearing).toBeCloseTo(156.17, 1);
  });
});