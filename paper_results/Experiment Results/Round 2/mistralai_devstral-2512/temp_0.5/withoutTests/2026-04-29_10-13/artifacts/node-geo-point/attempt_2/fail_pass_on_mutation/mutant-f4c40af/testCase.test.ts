import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes the calculation from multiplication to division
    // This should produce significantly different results for non-trivial cases
    expect(result.latitude).toBeCloseTo(0.08993, 4);
    expect(result.longitude).toBeCloseTo(0, 4);
  });
});