import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 0;
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, distance, bearing);
    expect(destination.longitude).toBeCloseTo(0.089, 3);
    expect(destination.latitude).toBeGreaterThan(0);
  });
});