import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives an array', () => {
    expect(() => {
      GeoPoint.fromGeoJSON([1, 2] as any);
    }).toThrow(TypeError);
  });
});