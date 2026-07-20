import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with type but without coordinates', () => {
    const point = { type: 'Point' };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(TypeError);
  });
});