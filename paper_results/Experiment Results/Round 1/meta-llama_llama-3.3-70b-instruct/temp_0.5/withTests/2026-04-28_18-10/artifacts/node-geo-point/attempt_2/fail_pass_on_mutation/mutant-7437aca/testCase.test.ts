import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error for valid longitude', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrow(RangeError);
  });
});