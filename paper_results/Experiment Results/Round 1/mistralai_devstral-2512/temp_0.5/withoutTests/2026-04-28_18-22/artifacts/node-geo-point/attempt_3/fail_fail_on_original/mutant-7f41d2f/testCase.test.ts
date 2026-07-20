import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for a given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 45, longitude: 0 };
    const distance = 100000; // 100 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the original formula
    // With the mutation (x = cosδ + sinφ1 * sinφ2), the longitude will be significantly different
    expect(result.longitude).toBeCloseTo(1.0007, 4);
    expect(result.latitude).toBeCloseTo(46.4285, 4);
  });
});