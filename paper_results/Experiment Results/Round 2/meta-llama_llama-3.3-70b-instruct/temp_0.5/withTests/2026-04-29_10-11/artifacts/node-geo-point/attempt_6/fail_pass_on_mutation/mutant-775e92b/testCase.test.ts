import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object in fromGeoJSON with correct type and coordinates properties', () => {
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [1, 2] })).not.toThrowError();
    expect(() => GeoPoint.fromGeoJSON('string')).toThrowError(TypeError);
    // In the mutated code, the second expectation should not throw an error because isObject always returns true
  });
});