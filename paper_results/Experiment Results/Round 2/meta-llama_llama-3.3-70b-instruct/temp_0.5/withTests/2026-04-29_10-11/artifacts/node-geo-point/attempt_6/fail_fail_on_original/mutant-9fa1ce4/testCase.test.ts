import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid length of coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1]
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});