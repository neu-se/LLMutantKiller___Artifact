import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination(point, 10000, 0);
    expect(destination.latitude).toBeCloseTo(0.89879, 5);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});