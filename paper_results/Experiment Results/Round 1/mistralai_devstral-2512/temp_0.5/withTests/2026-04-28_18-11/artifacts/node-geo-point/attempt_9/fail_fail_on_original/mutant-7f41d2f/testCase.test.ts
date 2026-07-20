import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for bearing 30 degrees from equator', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 30);
    expect(result.latitude).toBeCloseTo(0.0449, 3);
    expect(result.longitude).toBeCloseTo(0.0779, 3);
  });
});