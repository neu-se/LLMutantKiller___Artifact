import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination with bearing 45 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 45; // Northeast direction

    const result = startPoint.calculateDestination(distance, bearing);

    // Expected result should be close to (0.0636, 0.0636) for 10km northeast at equator
    // The mutation will cause incorrect calculation due to division by cosθ
    expect(result.latitude).toBeCloseTo(0.0636, 3);
    expect(result.longitude).toBeCloseTo(0.0636, 3);
  });
});