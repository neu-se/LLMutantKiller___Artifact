import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing 135 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 135);
    expect(result.latitude).toBeCloseTo(-0.06350840618410725);
    expect(result.longitude).toBeCloseTo(-0.06350840618410725);
  });
});