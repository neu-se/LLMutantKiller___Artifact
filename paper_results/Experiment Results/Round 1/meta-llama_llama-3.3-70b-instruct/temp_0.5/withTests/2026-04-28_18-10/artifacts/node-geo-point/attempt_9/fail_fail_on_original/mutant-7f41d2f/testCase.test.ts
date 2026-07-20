import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 90);
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});