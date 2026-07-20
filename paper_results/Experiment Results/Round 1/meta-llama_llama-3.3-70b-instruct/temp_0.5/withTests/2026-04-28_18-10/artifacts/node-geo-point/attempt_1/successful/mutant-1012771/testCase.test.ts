import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw a RangeError when creating a GeoPoint with invalid longitude', () => {
    expect(() => new GeoPoint(0, 180.1)).toThrow(RangeError);
  });
});