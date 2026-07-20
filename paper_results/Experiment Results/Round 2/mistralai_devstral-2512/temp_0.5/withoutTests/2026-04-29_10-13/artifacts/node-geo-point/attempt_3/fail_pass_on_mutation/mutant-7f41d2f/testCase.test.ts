import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for north pole movement', () => {
    const startPoint = new GeoPoint(89.9, 0); // Near north pole
    const distance = 1000; // 1 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // When moving north from near north pole, latitude should increase toward 90
    // and longitude should remain relatively stable
    expect(result.latitude).toBeGreaterThan(startPoint.latitude);
    expect(result.latitude).toBeLessThanOrEqual(90);
    expect(result.longitude).toBeCloseTo(0, 2);
  });
});