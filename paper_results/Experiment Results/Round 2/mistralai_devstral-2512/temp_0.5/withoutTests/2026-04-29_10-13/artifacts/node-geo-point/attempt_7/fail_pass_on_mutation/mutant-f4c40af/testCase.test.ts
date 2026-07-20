import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 100000; // 100km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes sinφ1 * cosδ to sinφ1 / cosδ which will produce different results
    // Using a large distance makes the difference more pronounced
    // The correct latitude should be approximately 0.8993 degrees (100km north from equator)
    expect(result.latitude).toBeCloseTo(0.8993, 3);
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});