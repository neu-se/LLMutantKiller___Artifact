import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint instance calculateBearing', () => {
  it('should return the correct bearing when calling the instance method calculateBearing', () => {
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.5, 1.15);

    const bearing = p1.calculateBearing(p2);

    expect(bearing).toBeDefined();
    expect(typeof bearing).toBe('number');
    expect(Math.round(bearing)).toBe(89);
  });
});