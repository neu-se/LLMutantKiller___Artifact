import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object with a non-array coordinates property', () => {
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: 'string' })).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: 123 })).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: true })).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: null })).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: undefined })).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: {} })).toThrow(TypeError);
  });
});