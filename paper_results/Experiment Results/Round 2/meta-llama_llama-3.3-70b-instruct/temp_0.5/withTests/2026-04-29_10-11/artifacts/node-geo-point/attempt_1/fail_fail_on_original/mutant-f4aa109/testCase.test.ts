import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint with an invalid latitude', () => {
    expect(() => new GeoPoint(-100, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(100, 0)).toThrow(RangeError);
  });
});