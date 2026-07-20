import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when fromGeoJSON is called with a non-object', () => {
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow(TypeError);
  });
});