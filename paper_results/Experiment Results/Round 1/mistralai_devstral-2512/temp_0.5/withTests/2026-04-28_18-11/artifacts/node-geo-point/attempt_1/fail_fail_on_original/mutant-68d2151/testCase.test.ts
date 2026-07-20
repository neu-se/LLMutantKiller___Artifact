import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('calculateDestination mutation test', () => {
  it('should correctly calculate destination with specific bearing and distance', () => {
    const startPoint = new GeoPoint(45, 0);
    const result = startPoint.calculateDestination(100000, 90);

    expect(result.latitude).toBeCloseTo(45.0, 4);
    expect(result.longitude).toBeCloseTo(1.414, 3);
  });
});