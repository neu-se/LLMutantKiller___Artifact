import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from an object that is not an object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError('Object must have latitude and longitude');
  });
});