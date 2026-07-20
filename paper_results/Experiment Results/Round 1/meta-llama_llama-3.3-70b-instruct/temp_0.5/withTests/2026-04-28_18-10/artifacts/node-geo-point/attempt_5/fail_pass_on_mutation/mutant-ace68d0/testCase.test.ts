import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object using fromGeoJSON', () => {
    expect(() => GeoPoint.fromGeoJSON('string')).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(123)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(true)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(undefined)).toThrow(TypeError);
  });
});