import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const point = GeoPoint.fromObject({ latitude: 51.5, longitude: -0.15 });
    expect(point.latitude).toBe(51.5);
    expect(point.longitude).toBe(-0.15);
  });
});