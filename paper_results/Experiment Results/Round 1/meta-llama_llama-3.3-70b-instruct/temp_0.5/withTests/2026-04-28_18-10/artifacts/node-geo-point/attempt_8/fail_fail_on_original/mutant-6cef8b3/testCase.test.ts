import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with a non-numeric latitude', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
  });
  it('should not throw an error when creating a new GeoPoint with a numeric latitude and longitude', () => {
    expect(() => new GeoPoint(1, 2)).not.toThrow();
  });
});