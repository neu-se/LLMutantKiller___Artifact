import { GeoPoint } from "../../../../../../../src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination(point.toObject(), 10000, 90);
    expect(destination.latitude).toBeCloseTo(0.899, 3);
    expect(destination.longitude).toBeCloseTo(0.117, 3);
  });
});