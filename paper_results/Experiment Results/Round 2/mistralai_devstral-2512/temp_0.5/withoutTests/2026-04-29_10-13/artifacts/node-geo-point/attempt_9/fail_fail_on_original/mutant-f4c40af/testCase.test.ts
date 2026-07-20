import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 1000000; // 1000km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes sinφ1 * cosδ to sinφ1 / cosδ which will produce different results
    // Using a 45-degree latitude and large distance makes the difference more pronounced
    // The correct longitude should be approximately 14.28 degrees east
    expect(result.latitude).toBeCloseTo(45.0, 1);
    expect(result.longitude).toBeCloseTo(14.3, 1);
  });
});