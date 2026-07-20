import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid object', () => {
    const obj = { type: 'Point', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(obj)).not.toThrow();
    expect(() => GeoPoint.fromGeoJSON({})).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON('string')).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(123)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(true)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(undefined)).toThrow(TypeError);
  });
});