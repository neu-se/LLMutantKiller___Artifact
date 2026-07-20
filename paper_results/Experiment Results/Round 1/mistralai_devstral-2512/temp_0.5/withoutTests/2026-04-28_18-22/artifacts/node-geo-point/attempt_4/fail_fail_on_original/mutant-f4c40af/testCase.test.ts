import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 45, longitude: 0 };
    const distance = 100000; // 100 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the original formula
    // For latitude 45, bearing 90, distance 100000m:
    // The result should be very close to (45.0, 1.428)
    expect(result.latitude).toBeCloseTo(45.0, 4);
    expect(result.longitude).toBeCloseTo(1.428, 3);
  });
});