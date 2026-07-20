import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result calculated using the original formula
    // This is a known good value for this specific case
    expect(result.latitude).toBeCloseTo(0.08983152841195215, 10);
    expect(result.longitude).toBeCloseTo(0.08983152841195215, 10);
  });
});