import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with an invalid longitude', () => {
    expect(() => new GeoPoint(0, 181)).toThrow(RangeError);
  });
});