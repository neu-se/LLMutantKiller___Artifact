import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid coordinates', () => {
    expect(() => GeoPoint.fromGeoJSON({
      type: 'Point',
      coordinates: 'invalid' as any
    })).toThrowError('coordinates must be an array and contain 2 elements');
  });
});