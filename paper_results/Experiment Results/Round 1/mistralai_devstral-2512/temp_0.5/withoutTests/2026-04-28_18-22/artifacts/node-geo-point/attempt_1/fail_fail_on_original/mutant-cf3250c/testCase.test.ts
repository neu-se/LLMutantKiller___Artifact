import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point for a given bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result should be east of the start point
    // The exact values depend on the correct calculation of λ2
    // With the mutation (λ1 - atan2(y, x)), the longitude would be incorrect
    expect(result.longitude).toBeCloseTo(0.089831, 5);
    expect(result.latitude).toBeCloseTo(0, 5);
  });
});