import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when GeoJSON object is missing required properties', () => {
    const invalidGeoJSON = {
      type: 'Point',
      // Missing coordinates property
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});