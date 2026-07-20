import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51, 0);
    const destination = point.calculateDestination(10000, 0);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});