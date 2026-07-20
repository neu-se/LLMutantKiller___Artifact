import { GeoPoint } from '../geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-numeric arguments in the original code, but not in the mutated code', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrowError();
    expect(() => new GeoPoint(1, 'b' as any)).toThrowError();
    const geoPoint = new GeoPoint(1, 2);
    expect(geoPoint).toBeInstanceOf(GeoPoint);
  });
});