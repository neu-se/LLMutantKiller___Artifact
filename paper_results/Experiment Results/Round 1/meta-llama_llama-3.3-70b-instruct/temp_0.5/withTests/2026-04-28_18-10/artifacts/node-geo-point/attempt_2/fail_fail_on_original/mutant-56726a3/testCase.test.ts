import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a specific message when creating a GeoPoint from an object without latitude and longitude', () => {
    const object = { foo: 'bar' };
    const error = new Error('Object must have latitude and longitude');
    expect(() => GeoPoint.fromObject(object)).toThrowError(error.message);
  });
});