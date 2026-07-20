import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when fromGeoJSON is called with a non-object', () => {
    try {
      GeoPoint.fromGeoJSON(null);
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError('GeoPoint: Argument must be an object');
  });
});