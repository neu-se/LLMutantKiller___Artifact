import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when a non-object primitive (string) is passed to fromGeoJSON', () => {
    expect(() => {
      GeoPoint.fromGeoJSON('not an object' as any);
    }).toThrow(TypeError);
  });
});