import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for a given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the original formula
    // With the mutation (x = cosδ + sinφ1 * sinφ2), the longitude will be incorrect
    expect(result.longitude).toBeCloseTo(0.089831, 5);
    expect(result.latitude).toBeCloseTo(0, 5);
  });
});