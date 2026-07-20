import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the original formula
    // sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // For latitude 0, bearing 0, distance 10000m:
    // φ2 should be approximately 0.08983152841195215 radians (5.147 degrees)
    const expectedLatitude = 5.147;
    const expectedLongitude = 0;

    // Allow small floating point differences
    expect(result.latitude).toBeCloseTo(expectedLatitude, 3);
    expect(result.longitude).toBeCloseTo(expectedLongitude, 3);
  });
});