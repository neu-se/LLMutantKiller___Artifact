import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when type is not Point', () => {
    const invalidGeoJSON = {
      type: 'LineString',
      coordinates: [0, 0]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});