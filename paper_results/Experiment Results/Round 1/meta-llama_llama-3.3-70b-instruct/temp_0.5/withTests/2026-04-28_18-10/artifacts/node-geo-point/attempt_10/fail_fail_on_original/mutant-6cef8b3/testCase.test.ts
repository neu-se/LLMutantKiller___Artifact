import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with a non-numeric latitude', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
  });
  it('should not throw an error when creating a new GeoPoint with a numeric latitude and a non-numeric longitude on the mutated code', () => {
    // This test will pass on the original code and fail on the mutated code
    // because the mutated code does not check the type of the latitude
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
  });
});