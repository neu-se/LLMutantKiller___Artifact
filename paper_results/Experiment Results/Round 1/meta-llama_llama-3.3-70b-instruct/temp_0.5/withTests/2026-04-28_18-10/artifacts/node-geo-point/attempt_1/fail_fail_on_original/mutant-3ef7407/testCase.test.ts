import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with missing type and coordinates', () => {
    expect(() => GeoPoint.fromGeoJSON({})).toThrowError('The value of type should be \'Point\'');
  });
});