import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when longitude is exactly -180', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrowError(RangeError);
  });
});