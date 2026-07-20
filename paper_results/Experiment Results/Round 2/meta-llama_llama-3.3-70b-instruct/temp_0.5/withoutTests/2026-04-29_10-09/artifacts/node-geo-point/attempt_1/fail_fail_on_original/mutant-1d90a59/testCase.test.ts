import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object without latitude and longitude properties', () => {
    expect(() => GeoPoint.fromObject({})).toThrowError('Object must have latitude and longitude');
  });
});