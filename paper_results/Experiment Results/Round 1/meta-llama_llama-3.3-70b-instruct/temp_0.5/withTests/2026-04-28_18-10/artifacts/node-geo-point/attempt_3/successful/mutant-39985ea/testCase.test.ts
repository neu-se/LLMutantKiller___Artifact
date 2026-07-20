import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from a non-object', () => {
    expect(() => GeoPoint.fromObject('string')).toThrowError('GeoPoint: Argument must be an object');
  });
});