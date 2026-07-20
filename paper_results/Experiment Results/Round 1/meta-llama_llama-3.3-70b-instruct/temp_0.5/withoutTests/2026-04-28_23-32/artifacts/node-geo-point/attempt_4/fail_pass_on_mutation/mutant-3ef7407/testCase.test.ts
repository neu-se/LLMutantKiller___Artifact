import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type but with coordinates', () => {
    const point = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(TypeError);
    const point2 = { type: 'Point', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point2)).not.toThrowError();
    const point3 = { type: 'Point' };
    expect(() => GeoPoint.fromGeoJSON(point3)).toThrowError(TypeError);
    const point4 = { coordinates: [1, 2], type: 'LineString' };
    expect(() => GeoPoint.fromGeoJSON(point4)).toThrowError(TypeError);
    const point5 = { type: 'Point', coordinates: [1] };
    expect(() => GeoPoint.fromGeoJSON(point5)).toThrowError(TypeError);
    const point6 = { type: 'Point', coordinates: [1, 2, 3] };
    expect(() => GeoPoint.fromGeoJSON(point6)).toThrowError(TypeError);
  });
});