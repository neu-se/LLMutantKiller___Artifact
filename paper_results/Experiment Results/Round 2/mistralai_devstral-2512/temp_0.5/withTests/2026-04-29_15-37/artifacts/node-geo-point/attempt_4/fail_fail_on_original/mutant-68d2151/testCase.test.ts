import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for high latitude point with bearing 90', () => {
    const startPoint = new GeoPoint(89.9, 0);
    const result = GeoPoint.calculateDestination(startPoint, 100000, 90);
    expect(result.longitude).toBeCloseTo(1.998, 3);
    expect(result.latitude).toBeCloseTo(89.9, 3);
  });
});