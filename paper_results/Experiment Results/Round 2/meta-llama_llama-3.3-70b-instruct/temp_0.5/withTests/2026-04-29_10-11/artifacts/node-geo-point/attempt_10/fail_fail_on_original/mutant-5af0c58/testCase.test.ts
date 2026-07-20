import { GeoPoint } from '../geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-numeric arguments', () => {
    expect(() => {
      const geoPoint = new GeoPoint('a' as any, 2);
      expect(geoPoint.latitude).toBe('a');
      expect(geoPoint.longitude).toBe(2);
    }).toThrowError(RangeError);
  });
});