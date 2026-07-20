import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw a meaningful error when creating a GeoPoint from GeoJSON with incorrect type', () => {
    const point = {
      type: 'LineString',
      coordinates: [1, 2],
    };

    const error = GeoPoint.fromGeoJSON(point as any);
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).not.toBe('');
  });
});