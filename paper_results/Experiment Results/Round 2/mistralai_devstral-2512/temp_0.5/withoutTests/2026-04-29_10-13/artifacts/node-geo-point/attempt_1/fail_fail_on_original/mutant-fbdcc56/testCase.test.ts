import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast direction

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result calculated using the original formula
    // This test will fail with the mutated version because division instead of multiplication
    // will produce significantly different results
    expect(result.latitude).toBeCloseTo(0.08983152841195215);
    expect(result.longitude).toBeCloseTo(0.08983152841195215);
  });
});