import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 45, longitude: 0 };
    const distance = 100000; // 100 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes sinφ2 calculation from multiplication to division
    // This will produce significantly different results, especially at higher latitudes
    // We test that the latitude increases by the expected amount when moving north
    expect(result.latitude).toBeGreaterThan(45);
    expect(result.latitude).toBeLessThan(46);

    // Longitude should remain nearly the same when moving due north
    expect(result.longitude).toBeCloseTo(0, 4);
  });
});