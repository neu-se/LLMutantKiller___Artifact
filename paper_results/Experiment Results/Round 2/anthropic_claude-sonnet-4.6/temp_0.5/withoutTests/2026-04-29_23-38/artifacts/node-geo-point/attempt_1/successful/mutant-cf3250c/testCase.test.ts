import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when moving north from a known location', () => {
    // Starting from London (51.5074, -0.1278), moving 100km due east (bearing 90°)
    const start = new GeoPoint(51.5074, -0.1278);
    const distance = 100000; // 100 km in meters
    const bearing = 90; // due east

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // Moving east should increase longitude, not decrease it
    // The original code uses λ1 + atan2(y, x), mutant uses λ1 - atan2(y, x)
    // Moving east from longitude -0.1278 should result in a more positive longitude
    expect(destination.longitude).toBeGreaterThan(start.longitude);
    
    // The latitude should remain approximately the same when moving due east
    expect(destination.latitude).toBeCloseTo(start.latitude, 0);
    
    // Verify the approximate expected longitude (roughly 1.3 degrees east)
    expect(destination.longitude).toBeCloseTo(1.3, 0);
  });
});