import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw a RangeError with a specific message when creating a GeoPoint with non-numeric arguments', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
    expect(() => new GeoPoint(1, 'b' as any)).toThrow(RangeError);
    expect(() => {
      try {
        new GeoPoint('a' as any, 2);
      } catch (error) {
        expect(error.message).toBe('Bad geo point arguments');
      }
    }).not.toThrow();
  });
});