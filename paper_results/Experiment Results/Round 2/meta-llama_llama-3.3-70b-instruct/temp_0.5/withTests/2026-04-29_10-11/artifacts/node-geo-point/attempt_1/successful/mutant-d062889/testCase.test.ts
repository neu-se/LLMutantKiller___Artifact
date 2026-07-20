import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw a TypeError with a message when creating a GeoPoint from an object with an invalid input', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError('GeoPoint: Argument must be an object');
  });
});