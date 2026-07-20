import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type and with coordinates', () => {
    const point = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(TypeError);
  });
});