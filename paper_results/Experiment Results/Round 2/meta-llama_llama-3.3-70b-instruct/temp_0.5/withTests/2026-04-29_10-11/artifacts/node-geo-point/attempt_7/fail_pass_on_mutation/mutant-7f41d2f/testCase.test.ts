import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = point.calculateDestination(10000, 45);
    const destination2 = point.calculateDestination(10000, 225);
    expect(Math.abs(destination1.longitude - destination2.longitude)).toBeGreaterThan(0.1);
  });
});