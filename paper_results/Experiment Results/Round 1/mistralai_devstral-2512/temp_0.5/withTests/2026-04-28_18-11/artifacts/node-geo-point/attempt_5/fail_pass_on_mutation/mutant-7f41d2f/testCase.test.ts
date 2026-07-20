import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for bearing 270 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 270);
    expect(result.latitude).toBeCloseTo(0, 3);
    expect(result.longitude).toBeCloseTo(-0.08983, 3);
  });
});