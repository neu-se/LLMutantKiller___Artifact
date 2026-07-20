import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with longitude outside of valid range', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
  });
});