import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for high latitude with specific bearing', () => {
    const startPoint = new GeoPoint(60, 0);
    const distance = 50000; // 50 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // For high latitudes, the mutation (division instead of multiplication)
    // will produce significantly different results in longitude calculation
    expect(result.latitude).toBeCloseTo(60, 4);
    expect(result.longitude).toBeCloseTo(0.747, 3);
  });
});