import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object without latitude and longitude', () => {
    expect(() => GeoPoint.fromObject({})).toThrowError('Object must have latitude and longitude');
  });
});