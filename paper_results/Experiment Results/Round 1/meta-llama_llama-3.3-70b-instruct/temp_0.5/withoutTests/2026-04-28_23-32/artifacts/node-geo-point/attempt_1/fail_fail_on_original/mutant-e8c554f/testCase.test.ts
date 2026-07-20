import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint class', () => {
  it('should throw an error when creating a GeoPoint with an invalid latitude', () => {
    expect(() => new GeoPoint(100, 0)).toThrow(RangeError);
  });
});