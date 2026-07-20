import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw a meaningful error when creating a GeoPoint from GeoJSON with incorrect type', () => {
    const point = {
      type: 'LineString',
      coordinates: [1, 2],
    };

    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(
      'The value of type should be \'Point\'',
    );
  });
});