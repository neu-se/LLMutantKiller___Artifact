import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = point.calculateDestination(1000, 90);
    const destination2 = point.calculateDestination(1000, 270);
    expect(destination1.longitude).toBeGreaterThan(destination2.longitude);
  });
});