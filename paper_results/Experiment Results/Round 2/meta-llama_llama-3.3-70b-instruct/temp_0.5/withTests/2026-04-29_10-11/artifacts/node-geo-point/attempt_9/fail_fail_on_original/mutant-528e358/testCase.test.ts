import { GeoPoint } from '../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is out of range in the mutated code but not in the original code', () => {
    expect(() => new GeoPoint(0, 180)).toThrow(RangeError);
    expect(() => new GeoPoint(0, -180)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 181)).toThrow(RangeError);
  });
});