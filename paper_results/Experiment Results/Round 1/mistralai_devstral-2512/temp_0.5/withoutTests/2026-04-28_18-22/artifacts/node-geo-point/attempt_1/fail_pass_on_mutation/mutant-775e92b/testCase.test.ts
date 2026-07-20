import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when fromGeoJSON is called with a non-object argument', () => {
    expect(() => {
      GeoPoint.fromGeoJSON("not an object" as any);
    }).toThrow(TypeError);
  });
});