import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination with bearing 90 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 90; // East direction

    const result = startPoint.calculateDestination(distance, bearing);

    // Expected result should be close to (0, 0.08983) for 10km east at equator
    // This test will fail with the mutation because division by cosθ (cos(90°)=0) would cause incorrect calculation
    expect(result.latitude).toBeCloseTo(0, 4);
    expect(result.longitude).toBeCloseTo(0.08983, 4);
  });
});