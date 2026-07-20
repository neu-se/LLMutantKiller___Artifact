import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving south from north pole region', () => {
    const startPoint = new GeoPoint(80, 0);
    const distance = 50000; // 50 km
    const bearing = 180; // South

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will cause significant errors
    // when near the poles where trigonometric values are extreme
    expect(result.latitude).toBeGreaterThan(79);
    expect(result.latitude).toBeLessThan(79.5);
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});