import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when moving north from a known location', () => {
    // Starting from London (51.5074, -0.1278), moving 100km due east (bearing 90°)
    const start = new GeoPoint(51.5074, -0.1278);
    const distance = 100000; // 100 km in meters
    const bearing = 90; // due east

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // Moving east should increase longitude significantly
    // Expected longitude should be approximately 1.3 degrees east
    // Original code: λ2 = λ1 + atan2(y, x) -> moves east (positive longitude change)
    // Mutated code: λ2 = λ1 - atan2(y, x) -> moves west (negative longitude change)
    
    expect(destination.longitude).toBeGreaterThan(0);
    expect(destination.latitude).toBeCloseTo(51.5074, 1);
  });
});