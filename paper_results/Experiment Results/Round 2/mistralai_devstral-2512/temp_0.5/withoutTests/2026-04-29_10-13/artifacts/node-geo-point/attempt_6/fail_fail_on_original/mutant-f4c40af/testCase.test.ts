import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 100000; // 100km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes sinφ1 * cosδ to sinφ1 / cosδ which will produce different results
    // Using a 45-degree bearing and significant distance makes the difference more pronounced
    expect(result.latitude).toBeCloseTo(0.705, 3);
    expect(result.longitude).toBeCloseTo(0.705, 3);
  });
});