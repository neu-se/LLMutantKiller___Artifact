import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object that is not an object', () => {
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError('Object must be an object');
  });
});