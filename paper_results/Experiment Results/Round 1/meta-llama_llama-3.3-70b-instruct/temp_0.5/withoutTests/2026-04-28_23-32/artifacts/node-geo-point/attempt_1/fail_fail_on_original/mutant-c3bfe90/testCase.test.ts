import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is exactly 180', () => {
    expect(() => new GeoPoint(0, 180)).toThrow(RangeError);
  });
});