import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point for bearing 45 degrees from equator', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = startPoint.calculateDestination(1000000, 45);
    expect(result.latitude).toBeCloseTo(6.346, 1);
    expect(result.longitude).toBeCloseTo(6.346, 1);
  });
});