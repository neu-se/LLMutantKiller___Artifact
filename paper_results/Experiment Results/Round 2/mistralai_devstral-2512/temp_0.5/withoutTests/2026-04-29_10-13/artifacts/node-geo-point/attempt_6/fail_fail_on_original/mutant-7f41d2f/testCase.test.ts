import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for movement near equator', () => {
    const startPoint = new GeoPoint(0.1, 0.1);
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation affects the x calculation which impacts longitude
    // This test verifies the correct behavior near equator where the effect is measurable
    expect(result.latitude).toBeCloseTo(0.17, 2);
    expect(result.longitude).toBeCloseTo(0.17, 2);
  });
});