import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint fromGeoJSON with null', () => {
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow(TypeError);
  });
});