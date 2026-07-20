import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing 180 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 180);
    expect(result.latitude).toBeCloseTo(-0.08983, 4);
    expect(result.longitude).toBeCloseTo(0, 4);
  });
});