import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination mutation test', () => {
  it('should correctly calculate destination with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = startPoint.calculateDestination(100000, 45);
    expect(result.latitude).toBeCloseTo(0.636, 3);
    expect(result.longitude).toBeCloseTo(0.636, 3);
  });
});