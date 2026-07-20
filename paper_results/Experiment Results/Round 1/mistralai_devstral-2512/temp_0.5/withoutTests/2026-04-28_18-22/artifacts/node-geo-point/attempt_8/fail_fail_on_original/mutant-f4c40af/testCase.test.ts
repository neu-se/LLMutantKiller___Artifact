import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000000; // 1000 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes sinφ2 calculation from multiplication to division
    // This will produce significantly different results for large distances
    // Original formula should produce latitude around 8.983 degrees north
    expect(result.latitude).toBeCloseTo(8.983, 2);
    expect(result.longitude).toBeCloseTo(0, 2);
  });
});