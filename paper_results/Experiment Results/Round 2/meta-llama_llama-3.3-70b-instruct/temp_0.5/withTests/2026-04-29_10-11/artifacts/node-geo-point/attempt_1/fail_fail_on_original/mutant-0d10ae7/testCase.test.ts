import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is exactly -180', () => {
    expect(() => new GeoPoint(0, -180)).toThrowError(RangeError);
  });
});