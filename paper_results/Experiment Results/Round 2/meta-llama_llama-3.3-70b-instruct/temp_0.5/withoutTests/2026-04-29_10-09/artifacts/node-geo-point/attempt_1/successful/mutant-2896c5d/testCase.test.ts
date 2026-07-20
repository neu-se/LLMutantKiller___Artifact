import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate bearing correctly', () => {
    const point1 = new GeoPoint(37.7749, -122.4194);
    const point2 = new GeoPoint(34.0522, -118.2437);
    const bearing = point1.calculateBearing(point2);
    expect(bearing).toBeGreaterThan(0);
    expect(bearing).toBeLessThan(360);
  });
});