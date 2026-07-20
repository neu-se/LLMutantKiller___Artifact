import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51.5, -0.15);
    const destination1 = GeoPoint.calculateDestination({ latitude: 51.5, longitude: -0.15 }, 10000, 90);
    const destination2 = GeoPoint.calculateDestination({ latitude: 51.5, longitude: -0.15 }, 10000, 90);
    expect(destination1.latitude).toBeCloseTo(destination2.latitude, 4);
    expect(destination1.longitude).toBeCloseTo(destination2.longitude, 4);
  });
});