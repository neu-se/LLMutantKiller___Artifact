import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object with null value', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError('GeoPoint: Argument must be an object');
  });
});