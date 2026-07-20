import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint with a valid longitude', () => {
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});