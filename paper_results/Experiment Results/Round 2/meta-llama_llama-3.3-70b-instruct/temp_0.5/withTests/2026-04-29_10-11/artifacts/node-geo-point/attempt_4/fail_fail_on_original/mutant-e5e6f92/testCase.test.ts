import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from GeoJSON with type and coordinates', () => {
    const point = { type: 'Point', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
  });

  it('should throw an error when creating a GeoPoint from GeoJSON without type', () => {
    const point = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('The value of type should be \'Point\'');
  });

  it('should throw an error when creating a GeoPoint from GeoJSON without coordinates', () => {
    const point = { type: 'Point' };
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});