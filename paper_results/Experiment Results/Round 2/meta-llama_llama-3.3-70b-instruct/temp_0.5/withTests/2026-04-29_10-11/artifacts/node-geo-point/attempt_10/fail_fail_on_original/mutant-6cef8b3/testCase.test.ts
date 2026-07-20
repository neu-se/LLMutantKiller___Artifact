import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-numeric latitude on the original code but not on the mutated code', () => {
    expect(() => new GeoPoint(1, 'a' as any)).toThrow(RangeError);
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
  });
});