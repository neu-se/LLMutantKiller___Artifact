import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint class', () => {
  it('should throw an error when creating a GeoPoint with a latitude greater than 90', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
  });
});