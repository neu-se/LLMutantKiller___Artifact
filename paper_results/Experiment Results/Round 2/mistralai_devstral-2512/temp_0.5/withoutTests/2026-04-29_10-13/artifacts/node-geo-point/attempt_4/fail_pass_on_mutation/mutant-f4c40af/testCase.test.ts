import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 1000000; // 1000km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes the calculation from multiplication to division
    // This should produce significantly different results for large distances
    // Using a large distance makes the difference more pronounced
    expect(result.latitude).toBeCloseTo(8.993, 2);
    expect(result.longitude).toBeCloseTo(0, 2);
  });
});