import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object with latitude and longitude properties, but without the correct check', () => {
    const obj = { latitude: 51.5, longitude: -0.15, foo: 'bar' };
    expect(() => GeoPoint.fromObject(obj)).not.toThrowError();
    const objWithoutProperties = { foo: 'bar' };
    expect(() => GeoPoint.fromObject(objWithoutProperties)).toThrowError('Object must have latitude and longitude');
  });
});