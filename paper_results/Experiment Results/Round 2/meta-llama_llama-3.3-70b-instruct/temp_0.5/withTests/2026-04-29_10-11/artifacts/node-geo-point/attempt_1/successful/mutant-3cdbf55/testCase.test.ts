import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint class', () => {
  it('should throw an error when creating a GeoPoint with a non-numeric longitude', () => {
    expect(() => new GeoPoint(1, 'a' as any)).toThrow(RangeError);
  });
});