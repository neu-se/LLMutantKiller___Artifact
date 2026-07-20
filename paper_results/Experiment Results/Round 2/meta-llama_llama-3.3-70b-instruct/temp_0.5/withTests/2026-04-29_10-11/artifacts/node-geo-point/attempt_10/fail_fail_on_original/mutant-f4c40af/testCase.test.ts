import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 45);
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.longitude).toBeGreaterThan(0);
  });
});