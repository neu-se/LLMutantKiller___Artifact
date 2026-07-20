import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object without latitude and longitude properties', () => {
    const obj = { foo: 'bar' };
    expect(() => GeoPoint.fromObject(obj)).toThrowError('Object must have latitude and longitude');
  });
});