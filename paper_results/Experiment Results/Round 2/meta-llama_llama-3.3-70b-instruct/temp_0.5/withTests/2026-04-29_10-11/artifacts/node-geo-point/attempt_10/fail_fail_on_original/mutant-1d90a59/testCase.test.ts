import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude properties, and throw an error when creating from an object without these properties', () => {
    const objWithProperties = { latitude: 51.5, longitude: -0.15 };
    const objWithoutProperties = { foo: 'bar' };

    expect(() => GeoPoint.fromObject(objWithProperties)).not.toThrowError();
    expect(() => GeoPoint.fromObject(objWithoutProperties)).toThrowError('Object must have latitude and longitude');
  });
});