import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a meaningful error when constructing from GeoJSON with invalid coordinates', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2, 3]
    };

    expect(() => GeoPoint.fromGeoJSON(invalidGeoJSON)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});