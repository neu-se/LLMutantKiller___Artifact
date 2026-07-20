import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2, 3],
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});