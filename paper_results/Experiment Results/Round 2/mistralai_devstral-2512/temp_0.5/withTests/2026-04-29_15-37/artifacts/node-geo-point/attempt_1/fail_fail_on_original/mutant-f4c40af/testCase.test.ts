import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint destination calculation', () => {
  it('should correctly calculate destination point with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = startPoint.calculateDestination(10000, 0);
    expect(result.latitude).toBeCloseTo(0.08983152841195215, 10);
    expect(result.longitude).toBeCloseTo(0, 10);
  });
});