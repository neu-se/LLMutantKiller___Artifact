import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives non-object input', () => {
    expect(() => {
      GeoPoint.fromGeoJSON("not an object" as any);
    }).toThrow(TypeError);
  });
});