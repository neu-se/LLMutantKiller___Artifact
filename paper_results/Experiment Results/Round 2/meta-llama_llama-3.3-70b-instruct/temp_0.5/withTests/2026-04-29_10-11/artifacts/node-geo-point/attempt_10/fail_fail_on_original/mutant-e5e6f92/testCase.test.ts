import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON without type and coordinates check', () => {
    const point = { type: 'Point', coordinates: [1, 2] };
    delete point.type;
    delete point.coordinates;
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError();
  });
});