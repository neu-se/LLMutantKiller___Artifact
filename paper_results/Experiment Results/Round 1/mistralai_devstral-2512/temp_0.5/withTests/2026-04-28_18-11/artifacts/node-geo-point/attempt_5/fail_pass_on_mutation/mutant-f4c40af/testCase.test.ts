import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point with bearing 180 degrees and distance 10000m', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 180);
    expect(result.latitude).toBeCloseTo(-0.089932, 5);
    expect(result.longitude).toBeCloseTo(0, 5);
  });
});