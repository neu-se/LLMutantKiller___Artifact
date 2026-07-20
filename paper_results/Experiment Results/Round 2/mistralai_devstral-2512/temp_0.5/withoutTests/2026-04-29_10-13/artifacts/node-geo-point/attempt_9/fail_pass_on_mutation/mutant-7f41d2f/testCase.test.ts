import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for movement with bearing 225 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 50000; // 50 km
    const bearing = 225; // Southwest

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation affects the x calculation which impacts the longitude result
    // This test verifies the correct behavior for southwest movement
    expect(result.latitude).toBeCloseTo(-0.35, 1);
    expect(result.longitude).toBeCloseTo(-0.35, 1);
  });
});