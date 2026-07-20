import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 0);
    expect(destination.latitude).toBeCloseTo(0.0907, 4);
    expect(destination.longitude).toBeCloseTo(0, 4);
  });
});