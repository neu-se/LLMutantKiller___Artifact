import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from GeoJSON with type and coordinates', () => {
    const point = { type: 'Point', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
  });

  it('should throw an error when creating a GeoPoint from GeoJSON without type', () => {
    const point = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('The value of type should be \'Point\'');
  });
});