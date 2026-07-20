import { GeoPoint } from '../geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-numeric arguments', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrowError(RangeError);
    expect(() => new GeoPoint(1, 'b' as any)).toThrowError(RangeError);
  });
});