import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for equatorial coordinates with 90 degree bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // For equatorial coordinates with east bearing, latitude should remain near 0
    // and longitude should increase by expected amount
    expect(result.latitude).toBeCloseTo(0, 6);
    expect(result.longitude).toBeCloseTo(0.898315, 5);
  });
});