import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 1000000, 0);
    expect(result.latitude).toBeCloseTo(8.983152841195215, 6);
    expect(result.longitude).toBeCloseTo(0, 6);
  });
});