import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for equatorial coordinates with 90 degree bearing', () => {
    const startPoint = new GeoPoint(0, 0); // Equator
    const distance = 100000; // 100 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // With the original formula (multiplication), longitude should increase significantly
    // With the mutated formula (division), the result will be completely different
    expect(result.latitude).toBeCloseTo(0, 5);
    expect(result.longitude).toBeCloseTo(0.898315, 5);
  });
});