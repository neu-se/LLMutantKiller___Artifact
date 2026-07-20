import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with numeric latitude and non-numeric longitude on the original code but not on the mutated code', () => {
    expect(() => new GeoPoint(1, 'a' as any)).toThrow(RangeError);
  });
});