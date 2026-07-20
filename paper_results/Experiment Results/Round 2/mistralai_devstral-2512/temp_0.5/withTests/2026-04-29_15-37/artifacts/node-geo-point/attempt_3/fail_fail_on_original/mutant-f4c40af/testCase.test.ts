import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint destination calculation', () => {
  it('should correctly calculate destination point with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = startPoint.calculateDestination(1000000, 90);
    expect(result.latitude).toBeCloseTo(0, 4);
    expect(result.longitude).toBeCloseTo(8.9832, 4);
  });
});