import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = point.calculateDestination(10000, 90);
    const destination2 = point.calculateDestination(10000, 270);
    expect(destination1.longitude).toBeCloseTo(-destination2.longitude, 6);
  });
});