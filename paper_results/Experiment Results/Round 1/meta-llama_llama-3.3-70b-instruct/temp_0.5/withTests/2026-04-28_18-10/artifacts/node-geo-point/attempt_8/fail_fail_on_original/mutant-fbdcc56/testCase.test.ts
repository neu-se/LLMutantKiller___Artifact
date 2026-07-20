import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51.5, 0);
    const distance = 10000;
    const bearing = 45;
    const destination = GeoPoint.calculateDestination({ latitude: 51.5, longitude: 0 }, distance, bearing);
    expect(destination.longitude).toBeGreaterThan(0.5);
  });
});