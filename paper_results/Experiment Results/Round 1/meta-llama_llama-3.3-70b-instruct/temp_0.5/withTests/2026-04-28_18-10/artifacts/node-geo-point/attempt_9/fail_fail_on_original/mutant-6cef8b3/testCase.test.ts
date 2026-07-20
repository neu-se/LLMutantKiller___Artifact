import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with a non-numeric latitude and a numeric longitude on the original code but not on the mutated code', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
    expect(() => new GeoPoint(1, 'b' as any)).toThrow(RangeError);
    // The mutated code should not throw an error for the following case
    // because the condition for checking the type of latitude is removed
    expect(() => new GeoPoint('c' as any, 3)).toThrow(RangeError);
  });
});