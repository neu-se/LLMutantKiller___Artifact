import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw a RangeError when creating an instance with a latitude outside the valid range', () => {
    expect(() => new GeoPoint(100, 0)).toThrow(RangeError);
  });
});