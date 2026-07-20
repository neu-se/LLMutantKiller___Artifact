import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a specific message when creating a GeoPoint from an object without latitude and longitude', () => {
    const object = { foo: 'bar' };
    expect(() => GeoPoint.fromObject(object)).toThrowError('Object must have latitude and longitude');
  });
});