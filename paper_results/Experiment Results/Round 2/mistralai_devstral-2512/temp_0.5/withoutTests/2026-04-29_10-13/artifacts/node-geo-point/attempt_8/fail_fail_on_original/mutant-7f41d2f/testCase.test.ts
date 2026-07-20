import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for movement with bearing 135 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 50000; // 50 km
    const bearing = 135; // Southeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation affects the x calculation which impacts the longitude result
    // This test verifies the correct behavior for southeast movement
    expect(result.latitude).toBeCloseTo(-0.35, 2);
    expect(result.longitude).toBeCloseTo(0.35, 2);
  });
});