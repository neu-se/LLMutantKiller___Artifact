import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point from origin with 45 degree bearing', () => {
    const origin = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast

    const destination = origin.calculateDestination(distance, bearing);

    // Verify the destination coordinates are reasonable for a 45-degree bearing
    // The mutation (division instead of multiplication) will produce incorrect results
    expect(destination.latitude).toBeGreaterThan(0.08);
    expect(destination.latitude).toBeLessThan(0.091);
    expect(destination.longitude).toBeGreaterThan(0.08);
    expect(destination.longitude).toBeLessThan(0.091);
  });
});