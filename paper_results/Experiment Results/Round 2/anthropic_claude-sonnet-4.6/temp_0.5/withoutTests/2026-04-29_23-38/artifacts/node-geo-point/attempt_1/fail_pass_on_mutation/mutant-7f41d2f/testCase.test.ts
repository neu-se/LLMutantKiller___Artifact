import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a start coordinate, distance, and bearing', () => {
    // Start at a known location: New York City approximately
    const startLat = 40.7128;
    const startLng = -74.0060;
    const startPoint = new GeoPoint(startLat, startLng);

    // Calculate destination 100km north (bearing = 0 degrees)
    const distance = 100000; // 100km in meters
    const bearing = 0; // North

    const destination = GeoPoint.calculateDestination(
      { latitude: startLat, longitude: startLng },
      distance,
      bearing
    );

    // Moving north should increase latitude and keep longitude roughly the same
    // Expected latitude should be approximately 40.7128 + ~0.9 degrees ≈ 41.6 degrees
    expect(destination.latitude).toBeGreaterThan(startLat);
    expect(destination.latitude).toBeCloseTo(41.6128, 0);
    
    // Longitude should remain close to start longitude when going due north
    expect(destination.longitude).toBeCloseTo(startLng, 1);
  });
});