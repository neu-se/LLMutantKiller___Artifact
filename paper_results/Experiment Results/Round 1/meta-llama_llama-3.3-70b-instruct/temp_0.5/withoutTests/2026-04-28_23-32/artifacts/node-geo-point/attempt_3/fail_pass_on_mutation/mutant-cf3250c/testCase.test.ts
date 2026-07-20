import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = point.calculateDestination(1000, 0);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});