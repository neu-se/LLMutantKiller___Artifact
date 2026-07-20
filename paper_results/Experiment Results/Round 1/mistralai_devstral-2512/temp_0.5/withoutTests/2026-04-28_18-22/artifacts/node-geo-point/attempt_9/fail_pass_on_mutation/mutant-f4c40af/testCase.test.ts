import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 45, longitude: 0 };
    const distance = 100000; // 100 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes sinφ2 calculation from multiplication to division
    // This will produce significantly different results
    // We test the relationship between latitude and longitude changes
    const latDiff = Math.abs(result.latitude - coordinate.latitude);
    const lonDiff = Math.abs(result.longitude - coordinate.longitude);

    // For eastward movement at 45° latitude, longitude should change more than latitude
    expect(lonDiff).toBeGreaterThan(latDiff * 1.5);
    expect(result.latitude).toBeCloseTo(45, 1);
  });
});