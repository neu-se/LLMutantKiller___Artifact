import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint destination calculation', () => {
  it('should correctly calculate destination point with specific bearing and distance', () => {
    const startPoint = new GeoPoint(51.5, -0.15);
    const result = startPoint.calculateDestination(10000, 45);
    expect(result.latitude).toBeCloseTo(51.5812, 4);
    expect(result.longitude).toBeCloseTo(-0.0586, 4);
  });
});