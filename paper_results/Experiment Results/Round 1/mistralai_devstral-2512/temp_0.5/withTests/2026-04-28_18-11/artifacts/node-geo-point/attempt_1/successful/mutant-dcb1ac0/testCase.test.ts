import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array has incorrect length', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2, 3] // Array with 3 elements instead of 2
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow('coordinates must be an array and contain 2 elements');
  });
});