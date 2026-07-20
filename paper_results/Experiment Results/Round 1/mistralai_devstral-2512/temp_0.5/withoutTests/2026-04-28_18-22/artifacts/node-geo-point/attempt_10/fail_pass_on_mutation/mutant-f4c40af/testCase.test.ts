import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000000; // 1000 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes sinφ2 calculation from multiplication to division
    // This will produce significantly different results for diagonal movements
    // Original formula should produce approximately equal latitude and longitude changes
    const latChange = result.latitude;
    const lonChange = result.longitude;

    // For 45 degree bearing, latitude and longitude changes should be approximately equal
    expect(Math.abs(latChange - lonChange)).toBeLessThan(1);
    expect(latChange).toBeGreaterThan(5);
    expect(lonChange).toBeGreaterThan(5);
  });
});