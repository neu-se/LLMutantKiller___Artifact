import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON validation', () => {
  it('should throw an error when coordinates is not an array of length 2', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2, 3] // Invalid: array length is 3 instead of 2
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});