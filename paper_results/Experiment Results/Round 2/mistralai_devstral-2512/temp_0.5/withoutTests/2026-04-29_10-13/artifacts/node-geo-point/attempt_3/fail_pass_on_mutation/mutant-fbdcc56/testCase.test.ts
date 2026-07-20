import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point for north pole to south movement', () => {
    const startPoint = new GeoPoint(89.9, 0); // Near north pole
    const distance = 100000; // 100 km
    const bearing = 180; // South

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will cause incorrect calculations
    // when moving from near the poles where sin(φ2) approaches 0
    expect(result.latitude).toBeLessThan(89.9);
    expect(result.latitude).toBeGreaterThan(80);
  });
});