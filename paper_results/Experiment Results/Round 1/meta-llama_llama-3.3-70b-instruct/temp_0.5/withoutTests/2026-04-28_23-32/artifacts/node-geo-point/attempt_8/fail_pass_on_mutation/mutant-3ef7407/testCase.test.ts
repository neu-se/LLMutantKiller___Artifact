import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type and with coordinates, and should throw an error when creating a GeoPoint from a GeoJSON object with type but without coordinates', () => {
    const point = { coordinates: [1, 2] };
    const point2 = { type: 'Point' };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(TypeError);
    expect(() => GeoPoint.fromGeoJSON(point2 as any)).toThrowError(TypeError);
    const point3 = {};
    expect(() => GeoPoint.fromGeoJSON(point3 as any)).toThrowError(TypeError);
  });
});