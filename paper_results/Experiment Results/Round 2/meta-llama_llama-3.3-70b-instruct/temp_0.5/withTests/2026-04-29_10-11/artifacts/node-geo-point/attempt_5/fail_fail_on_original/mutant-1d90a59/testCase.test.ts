import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from an object with latitude and longitude properties, but should throw when creating from an object without these properties', () => {
    const objWithProperties = { latitude: 51.5, longitude: -0.15 };
    const objWithoutProperties = { foo: 'bar' };

    expect(() => GeoPoint.fromObject(objWithoutProperties)).toThrowError('Object must have latitude and longitude');
    expect(() => GeoPoint.fromObject(objWithProperties)).not.toThrowError();
  });
});