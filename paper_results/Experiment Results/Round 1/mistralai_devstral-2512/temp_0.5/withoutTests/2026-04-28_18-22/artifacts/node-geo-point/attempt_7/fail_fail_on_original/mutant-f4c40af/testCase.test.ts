import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 45, longitude: 0 };
    const distance = 1000000; // 1000 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes sinφ2 calculation from multiplication to division
    // This will produce significantly different results for large distances
    // Original formula should produce longitude around 14.28 degrees east
    expect(result.longitude).toBeCloseTo(14.28, 2);
    expect(result.latitude).toBeCloseTo(45, 2);
  });
});