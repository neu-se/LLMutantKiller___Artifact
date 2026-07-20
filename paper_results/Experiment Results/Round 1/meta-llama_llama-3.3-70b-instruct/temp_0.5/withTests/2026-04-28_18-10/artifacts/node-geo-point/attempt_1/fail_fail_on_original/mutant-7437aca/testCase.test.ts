import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error for invalid longitude', () => {
    expect(() => new GeoPoint(0, 181)).toThrow(RangeError);
  });
});