import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-numeric longitude', () => {
    expect(() => new GeoPoint(1, 'a' as any)).toThrow(RangeError);
  });
});