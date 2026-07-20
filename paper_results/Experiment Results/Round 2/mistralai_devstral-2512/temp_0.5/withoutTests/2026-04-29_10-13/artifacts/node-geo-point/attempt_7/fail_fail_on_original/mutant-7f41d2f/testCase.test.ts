import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for movement at 45 degree bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes the sign in x calculation which affects the longitude
    // This test verifies the correct behavior for diagonal movement
    expect(result.latitude).toBeCloseTo(0.707, 2);
    expect(result.longitude).toBeCloseTo(0.707, 2);
  });
});