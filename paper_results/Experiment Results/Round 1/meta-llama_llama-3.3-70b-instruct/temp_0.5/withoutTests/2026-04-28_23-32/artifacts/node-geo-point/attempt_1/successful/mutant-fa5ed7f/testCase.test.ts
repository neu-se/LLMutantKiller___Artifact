import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint from a GeoJSON object with invalid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: 'invalid',
    };

    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});