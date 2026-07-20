import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when GeoJSON type is not "Point"', () => {
    const invalidGeoJSON = {
      type: 'MultiPoint',
      coordinates: [-0.15, 51.5]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});