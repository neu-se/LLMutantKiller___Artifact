import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON without type and coordinates check', () => {
    const point = { type: 'Point', coordinates: [1, 2] };
    delete point.type;
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('The value of type should be \'Point\'');
    const point2 = { type: 'Point', coordinates: [1, 2] };
    delete point2.coordinates;
    expect(() => GeoPoint.fromGeoJSON(point2 as any)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});