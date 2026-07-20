import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination with bearing 90 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 90; // East direction

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result should be close to (0, 0.08983) for 10km east
    // The mutation would cause incorrect calculation due to division by cosθ
    expect(result.latitude).toBeCloseTo(0, 4);
    expect(result.longitude).toBeCloseTo(0.08983, 4);
  });
});