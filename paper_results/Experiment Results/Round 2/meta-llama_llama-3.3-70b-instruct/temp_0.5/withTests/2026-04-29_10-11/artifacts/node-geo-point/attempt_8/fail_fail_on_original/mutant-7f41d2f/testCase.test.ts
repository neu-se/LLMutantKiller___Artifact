import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51.5, -0.15);
    const destination = point.calculateDestination(10000, 90);
    expect(destination.longitude).toBeCloseTo(-0.15, 4);
  });
});