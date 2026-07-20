import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object in fromGeoJSON', () => {
    expect(() => GeoPoint.fromGeoJSON(123)).toThrowError(TypeError);
    // In the mutated code, this should not throw an error because isObject always returns true
  });
});