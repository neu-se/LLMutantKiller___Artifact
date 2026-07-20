import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array has incorrect length', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2, 3] // Invalid: 3 elements instead of 2
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});