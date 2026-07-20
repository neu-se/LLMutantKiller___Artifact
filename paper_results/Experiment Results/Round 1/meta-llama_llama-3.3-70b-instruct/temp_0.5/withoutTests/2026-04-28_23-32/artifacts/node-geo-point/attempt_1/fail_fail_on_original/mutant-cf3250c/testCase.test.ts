import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = point.calculateDestination(1000, 45);
    expect(destination.longitude).toBeCloseTo(0.008983, 5);
    expect(destination.latitude).toBeCloseTo(0.008983, 5);
  });
});