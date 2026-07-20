import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a starting point, distance, and bearing', () => {
    // Starting from London (51.5074, -0.1278), travel 100km north (bearing 0 degrees)
    const startLat = 51.5074;
    const startLng = -0.1278;
    const distance = 100000; // 100 km in meters
    const bearing = 0; // North

    const start = new GeoPoint(startLat, startLng);
    const destination = start.calculateDestination(distance, bearing);

    // Expected: approximately 52.4065, -0.1278 (roughly 0.9 degrees north)
    // The latitude should increase by approximately 0.9 degrees for 100km north
    expect(destination.latitude).toBeCloseTo(52.4065, 2);
    expect(destination.longitude).toBeCloseTo(-0.1278, 2);
  });
});