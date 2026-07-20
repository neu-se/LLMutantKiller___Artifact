import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing 90 degrees from north pole', () => {
    const startPoint = new GeoPoint(89.9, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 90);
    expect(result.latitude).toBeCloseTo(89.9);
    expect(result.longitude).toBeCloseTo(0.111);
  });
});