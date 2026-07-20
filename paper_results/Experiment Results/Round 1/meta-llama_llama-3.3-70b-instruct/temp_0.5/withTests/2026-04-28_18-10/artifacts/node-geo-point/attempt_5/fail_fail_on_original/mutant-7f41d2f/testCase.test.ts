import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51.5, -0.15);
    const destination = GeoPoint.calculateDestination({ latitude: 51.5, longitude: -0.15 }, 10000, 90);
    expect(destination.latitude).toBeCloseTo(51.5, 5);
    expect(destination.longitude).toBeGreaterThan(-0.15);
  });
});