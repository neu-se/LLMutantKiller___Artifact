import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51, 0);
    const distance = 10000;
    const bearing = 90;
    const destination1 = GeoPoint.calculateDestination({ latitude: 51, longitude: 0 }, distance, bearing);
    const destination2 = GeoPoint.calculateDestination({ latitude: 51, longitude: 0 }, distance, bearing + 360);
    expect(destination1.longitude).toBeCloseTo(destination2.longitude, 6);
  });
});