import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = GeoPoint.calculateDestination(point.toObject(), 10000, 0);
    const destination2 = GeoPoint.calculateDestination(point.toObject(), 10000, 360);
    expect(destination1.latitude).toBeCloseTo(destination2.latitude, 5);
    expect(destination1.longitude).toBeCloseTo(destination2.longitude, 5);
  });
});