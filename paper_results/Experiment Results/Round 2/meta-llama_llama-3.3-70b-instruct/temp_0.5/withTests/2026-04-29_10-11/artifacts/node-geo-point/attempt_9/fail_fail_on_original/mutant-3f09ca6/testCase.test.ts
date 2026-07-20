import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a null object', () => {
    const point = null;
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('GeoPoint: Argument must be an object');
  });
});