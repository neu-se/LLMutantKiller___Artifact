import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from an object with latitude but no longitude', () => {
    const obj = { latitude: 51.5 };
    expect(() => GeoPoint.fromObject(obj)).toThrowError('Object must have latitude and longitude');
  });
});