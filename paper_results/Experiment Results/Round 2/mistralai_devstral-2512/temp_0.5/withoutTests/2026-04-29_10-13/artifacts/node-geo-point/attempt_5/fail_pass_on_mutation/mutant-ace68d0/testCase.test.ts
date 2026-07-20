import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON is called with a number', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(123);
    }).toThrow(TypeError);
  });
});