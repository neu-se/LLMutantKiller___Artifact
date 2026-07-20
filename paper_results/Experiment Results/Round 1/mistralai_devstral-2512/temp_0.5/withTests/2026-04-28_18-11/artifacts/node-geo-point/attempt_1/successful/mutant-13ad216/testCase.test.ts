import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw an error when type is not Point', () => {
    const invalidGeoJSON = {
      type: 'LineString',
      coordinates: [-0.15, 51.5]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});