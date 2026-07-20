import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination longitude when traveling east from a high latitude', () => {
    // Use a high latitude where sinφ1 is large, and a bearing of 90 degrees (due east)
    // so that y = sinθ * sinδ * cosφ1 is non-zero and x matters significantly
    const startLat = 60.0;
    const startLng = 0.0;
    const distance = 1000000; // 1000 km

    // Bearing 90 degrees = due east
    const bearing = 90;

    const destination = GeoPoint.calculateDestination(
      { latitude: startLat, longitude: startLng },
      distance,
      bearing
    );

    // At latitude 60, traveling 1000km east, the longitude change should be significant
    // The correct answer (original code) differs from the mutated answer
    // Original: x = cosδ - sinφ1 * sinφ2
    // Mutated:  x = cosδ + sinφ1 * sinφ2
    // At high latitudes sinφ1 is large (~0.866 for 60°), making the difference significant

    // The expected longitude should be approximately 18.0 degrees east
    // (verified against known geodesic calculations)
    expect(destination.longitude).toBeGreaterThan(15);
    expect(destination.longitude).toBeCloseTo(18.0, 0);
  });
});