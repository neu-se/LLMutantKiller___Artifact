import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON validation', () => {
  it('should throw TypeError with descriptive message when coordinates are invalid', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2, 3] // Invalid: more than 2 elements
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);

    try {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    } catch (error) {
      expect(error.message).toBe('coordinates must be an array and contain 2 elements');
    }
  });
});