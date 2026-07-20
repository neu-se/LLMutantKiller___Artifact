import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid GeoJSON', () => {
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError('GeoPoint: Argument must be an object');
  });
});