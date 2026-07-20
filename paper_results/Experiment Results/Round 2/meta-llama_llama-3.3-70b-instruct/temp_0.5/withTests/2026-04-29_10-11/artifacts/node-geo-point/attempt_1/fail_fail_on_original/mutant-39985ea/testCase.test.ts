import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from object with missing properties', () => {
    expect(() => GeoPoint.fromObject({})).toThrowError('Object must have latitude and longitude');
  });
});