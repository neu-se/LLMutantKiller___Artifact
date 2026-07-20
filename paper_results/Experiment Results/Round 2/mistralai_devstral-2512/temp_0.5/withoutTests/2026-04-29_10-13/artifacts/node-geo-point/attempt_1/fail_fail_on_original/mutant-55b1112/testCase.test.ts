import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result calculated using the original formula
    // This should fail with the mutated formula (division instead of multiplication)
    expect(result.latitude).toBeCloseTo(0.08983152841195213);
    expect(result.longitude).toBeCloseTo(0.08983152841195213);
  });
});