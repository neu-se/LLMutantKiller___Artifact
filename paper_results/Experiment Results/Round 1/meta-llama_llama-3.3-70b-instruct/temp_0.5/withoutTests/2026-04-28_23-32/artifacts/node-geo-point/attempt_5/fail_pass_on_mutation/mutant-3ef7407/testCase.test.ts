import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with type but without coordinates and throw an error when creating a GeoPoint from a GeoJSON object without type but with coordinates', () => {
    const point = { type: 'Point' };
    const point2 = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(TypeError);
    expect(() => GeoPoint.fromGeoJSON(point2 as any)).toThrowError(TypeError);
  });
});