import { GeoPoint } from "./geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid GeoJSON object', () => {
    const point = { type: 'Point', coordinates: [1.0, 2.0, 3.0] };
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});