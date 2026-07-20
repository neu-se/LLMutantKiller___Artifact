import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type and coordinates', () => {
    const point = {};
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(RangeError);
  });
});