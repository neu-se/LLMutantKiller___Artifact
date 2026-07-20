import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 45;
    const destination = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.898, 3);
    expect(destination.longitude).toBeCloseTo(0.898, 3);
  });
});