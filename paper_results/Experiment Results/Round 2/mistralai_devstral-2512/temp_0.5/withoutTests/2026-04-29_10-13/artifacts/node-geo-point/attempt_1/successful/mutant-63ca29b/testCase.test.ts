import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw an error when coordinates is not an array of length 2', () => {
    const invalidPoint = {
      type: 'Point',
      coordinates: [1, 2, 3] // Invalid: length is 3, not 2
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(TypeError);
  });
});