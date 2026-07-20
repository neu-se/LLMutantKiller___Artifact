import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with descriptive message when coordinates are invalid', () => {
    const invalidPoint = {
      type: 'Point',
      coordinates: [1, 2, 3] // Invalid: should have exactly 2 elements
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(TypeError);

    try {
      GeoPoint.fromGeoJSON(invalidPoint);
    } catch (error) {
      expect((error as TypeError).message).toBe('coordinates must be an array and contain 2 elements');
    }
  });
});