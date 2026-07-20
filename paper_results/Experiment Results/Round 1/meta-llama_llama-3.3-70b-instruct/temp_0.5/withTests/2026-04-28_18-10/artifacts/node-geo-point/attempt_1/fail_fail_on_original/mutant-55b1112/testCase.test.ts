import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = point.calculateDestination(10000, 90);
    expect(destination.latitude).toBeCloseTo(0.89879, 5);
    expect(destination.longitude).toBeCloseTo(1.5708, 5);
  });
});