import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should produce consistent results for equatorial coordinates with 45 degree bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Verify the relationship between latitude and longitude
    // For 45 degree bearing from equator, they should be approximately equal
    const lat = result.latitude;
    const lng = result.longitude;

    // The mutation will cause these values to diverge significantly
    expect(Math.abs(lat - lng)).toBeLessThan(0.001);
    expect(lat).toBeGreaterThan(0);
    expect(lng).toBeGreaterThan(0);
  });
});