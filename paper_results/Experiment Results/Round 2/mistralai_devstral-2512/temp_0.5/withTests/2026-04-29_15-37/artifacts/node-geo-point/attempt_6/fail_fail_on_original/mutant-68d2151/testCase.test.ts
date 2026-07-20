import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for point near equator with bearing 45', () => {
    const startPoint = new GeoPoint(0.5, 0);
    const result = GeoPoint.calculateDestination(startPoint, 100000, 45);
    expect(result.longitude).toBeCloseTo(0.8983, 4);
    expect(result.latitude).toBeCloseTo(0.6458, 4);
  });
});