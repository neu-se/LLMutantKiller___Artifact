import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 10000, 90);
    expect(result.longitude).toBeCloseTo(0.08983152841195216);
    expect(result.latitude).toBeCloseTo(0);
  });
});