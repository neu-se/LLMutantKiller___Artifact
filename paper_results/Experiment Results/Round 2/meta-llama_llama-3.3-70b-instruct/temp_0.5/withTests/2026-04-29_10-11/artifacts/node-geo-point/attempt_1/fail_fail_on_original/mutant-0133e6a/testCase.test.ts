import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when latitude is outside valid range', () => {
    expect(() => new GeoPoint(100, 0)).toThrow(RangeError);
  });
});