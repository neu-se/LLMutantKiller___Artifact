import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 45;
    const destination1 = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, distance, bearing);
    const destination2 = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, distance, bearing + 180);
    expect(destination1.longitude).not.toBeCloseTo(destination2.longitude, 6);
  });
});