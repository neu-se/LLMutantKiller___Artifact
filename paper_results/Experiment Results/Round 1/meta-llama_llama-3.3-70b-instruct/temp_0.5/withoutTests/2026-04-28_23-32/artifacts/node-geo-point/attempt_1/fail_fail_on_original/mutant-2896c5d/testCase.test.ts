import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate bearing correctly', () => {
    const point1 = new GeoPoint(52.5200, 13.4050);
    const point2 = new GeoPoint(48.8566, 2.3522);
    const bearing = point1.calculateBearing(point2);
    expect(bearing).toBeCloseTo(249.96, 2);
  });
});