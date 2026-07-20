import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for 45 degree latitude with 45 degree bearing', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 50000; // 50 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation will cause significant divergence in both coordinates
    // due to the change in y calculation (division vs multiplication)
    expect(result.latitude).toBeCloseTo(45.53, 2);
    expect(result.longitude).toBeCloseTo(0.53, 2);
  });
});