import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination mutation test', () => {
  it('should correctly calculate destination with specific bearing and distance', () => {
    const startPoint = new GeoPoint(45, 45);
    const result = startPoint.calculateDestination(1000000, 90);
    expect(result.latitude).toBeCloseTo(45.0, 2);
    expect(result.longitude).toBeCloseTo(54.3, 1);
  });
});