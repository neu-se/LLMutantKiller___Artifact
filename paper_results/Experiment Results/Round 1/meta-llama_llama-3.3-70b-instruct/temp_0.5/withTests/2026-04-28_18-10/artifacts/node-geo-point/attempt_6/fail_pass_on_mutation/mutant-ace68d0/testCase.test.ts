import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object without type and coordinates properties', () => {
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point' })).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ coordinates: [1, 2] })).toThrow(TypeError);
  });
});