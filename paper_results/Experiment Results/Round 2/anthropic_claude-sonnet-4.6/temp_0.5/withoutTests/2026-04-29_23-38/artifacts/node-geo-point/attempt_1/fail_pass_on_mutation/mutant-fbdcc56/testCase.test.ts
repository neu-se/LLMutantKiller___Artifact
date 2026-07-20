import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a starting point, distance, and bearing', () => {
    // Starting from a known point
    const startLat = 51.5074; // London
    const startLng = -0.1278;
    const startPoint = new GeoPoint(startLat, startLng);

    // Calculate destination 100km north (bearing = 0)
    const distance = 100000; // 100km in meters
    const bearing = 0; // due north

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected: roughly 51.5074 + ~0.8983 degrees latitude, same longitude
    // The latitude should increase by approximately 0.8983 degrees for 100km north
    expect(destination.latitude).toBeCloseTo(52.4057, 2);
    expect(destination.longitude).toBeCloseTo(-0.1278, 2);
  });
});