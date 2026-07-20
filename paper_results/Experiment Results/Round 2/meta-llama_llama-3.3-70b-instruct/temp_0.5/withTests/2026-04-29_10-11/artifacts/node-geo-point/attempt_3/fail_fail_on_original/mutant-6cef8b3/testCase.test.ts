import { GeoPoint } from '../geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-numeric latitude', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
    expect(() => new GeoPoint(1, 'a' as any)).toThrow(RangeError);
  });
});