import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point for bearing 0 degrees from north pole', () => {
    const startPoint = new GeoPoint(89.9, 0);
    const result = startPoint.calculateDestination(10000, 0);
    expect(result.latitude).toBeCloseTo(89.818, 3);
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});