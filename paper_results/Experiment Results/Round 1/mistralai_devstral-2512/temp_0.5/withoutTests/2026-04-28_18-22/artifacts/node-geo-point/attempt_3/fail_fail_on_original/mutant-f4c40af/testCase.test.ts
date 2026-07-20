import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 100000; // 100 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the original formula
    // For latitude 0, bearing 0, distance 100000m:
    // The result should be very close to (0.8983152841195215, 0)
    expect(result.latitude).toBeCloseTo(0.8983152841195215, 6);
    expect(result.longitude).toBeCloseTo(0, 6);
  });
});