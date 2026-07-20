import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with descriptive message when coordinates are invalid', () => {
    const invalidPoint = {
      type: 'Point',
      coordinates: [12.34] // Only 1 element instead of 2
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(TypeError);

    try {
      GeoPoint.fromGeoJSON(invalidPoint);
    } catch (error) {
      expect(error.message).toBe('coordinates must be an array and contain 2 elements');
    }
  });
});