import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point with bearing 90 degrees and distance 10000m', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 90);
    expect(result.latitude).toBeCloseTo(0, 4);
    expect(result.longitude).toBeCloseTo(89.8315, 4);
  });
});