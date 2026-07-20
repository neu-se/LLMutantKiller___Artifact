import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type and without coordinates, but should not throw an error when creating a GeoPoint from a GeoJSON object with type but without coordinates or with coordinates but without type', () => {
    const point = {};
    const point2 = { type: 'Point' };
    const point3 = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(TypeError);
    expect(() => GeoPoint.fromGeoJSON(point2 as any)).toThrowError(TypeError);
    expect(() => GeoPoint.fromGeoJSON(point3 as any)).toThrowError(TypeError);
  });
});